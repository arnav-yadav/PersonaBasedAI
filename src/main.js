// ============================================================
// main.js — App entry point: state management + event wiring
// ============================================================

import "./style.css";
import { personas, personaIds } from "./personas.js";
import { sendMessage } from "./api.js";
import {
  appendMessage,
  showTyping,
  hideTyping,
  showErrorToast,
  renderChips,
  toggleChips,
} from "./ui.js";

// ── State ────────────────────────────────────────────────────
let activePersonaId = "anshuman";
let conversationHistory = []; // [{role: 'user'|'model', parts: [{text}]}]
let isLoading = false;

// ── DOM refs ─────────────────────────────────────────────────
const chatEl = document.getElementById("chat-messages");
const inputEl = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const chipsWrapper = document.getElementById("chips-wrapper");
const personaNameEl = document.getElementById("persona-name");
const personaTitleEl = document.getElementById("persona-title");
const personaSubtitleEl = document.getElementById("persona-subtitle");
const personaAvatarEl = document.getElementById("persona-avatar");
const personaAccentEl = document.getElementById("persona-accent-bar");

// ── Boot ─────────────────────────────────────────────────────
function init() {
  buildTabs();
  switchPersona(activePersonaId);
}

// ── Tab builder ──────────────────────────────────────────────
function buildTabs() {
  const tabBar = document.getElementById("persona-tabs");
  personaIds.forEach((id) => {
    const p = personas[id];
    const btn = document.createElement("button");
    btn.className = "tab-btn";
    btn.id = `tab-${id}`;
    btn.dataset.id = id;
    btn.innerHTML = `<span class="tab-avatar" style="background:${p.gradient}">${p.avatar}</span><span class="tab-name">${p.name.split(" ")[0]}</span>`;
    btn.addEventListener("click", () => switchPersona(id));
    tabBar.appendChild(btn);
  });
}

// ── Persona switch ───────────────────────────────────────────
function switchPersona(id) {
  activePersonaId = id;
  conversationHistory = [];

  const p = personas[id];

  // Update tabs
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.id === id);
  });

  // Update identity bar
  personaNameEl.textContent = p.name;
  personaTitleEl.textContent = p.title;
  personaSubtitleEl.textContent = p.subtitle;
  personaAvatarEl.textContent = p.avatar;
  personaAvatarEl.style.background = p.gradient;
  personaAccentEl.style.background = p.gradient;

  // Update CSS accent variable for dynamic theming
  document.documentElement.style.setProperty("--persona-color", p.color);
  document.documentElement.style.setProperty("--persona-gradient", p.gradient);

  // Clear chat
  chatEl.innerHTML = "";

  // Render chips
  renderChips(chipsWrapper, p, handleChipClick);
  toggleChips(chipsWrapper, false);

  // Focus input
  inputEl.focus();
}

// ── Send a message ───────────────────────────────────────────
async function handleSend(text) {
  const message = (text || inputEl.value).trim();
  if (!message || isLoading) return;

  inputEl.value = "";
  isLoading = true;
  sendBtn.disabled = true;

  const persona = personas[activePersonaId];

  // Hide chips after first message
  toggleChips(chipsWrapper, true);

  // Show user message
  appendMessage(chatEl, "user", message, persona);

  // Add to history
  conversationHistory.push({ role: "user", parts: [{ text: message }] });

  // Show typing indicator
  showTyping(chatEl, persona);

  try {
    // Build history to send = all EXCEPT the last user message (sent separately)
    const historyToSend = conversationHistory.slice(0, -1);

    const reply = await sendMessage(
      persona.systemPrompt,
      historyToSend,
      message
    );

    hideTyping();
    appendMessage(chatEl, "model", reply, persona);

    // Add model response to history
    conversationHistory.push({ role: "model", parts: [{ text: reply }] });
  } catch (err) {
    hideTyping();
    console.error("API error:", err);

    let userMsg = "Something went wrong. Please try again.";
    if (err.message?.includes("API key")) {
      userMsg = "API key missing or invalid. Check your .env file.";
    } else if (err.message?.includes("quota") || err.message?.includes("429")) {
      userMsg = "Rate limit reached. Please wait a moment before sending again.";
    } else if (err.message?.includes("network") || err.name === "TypeError") {
      userMsg = "Network error. Check your internet connection.";
    }

    showErrorToast(userMsg);
  } finally {
    isLoading = false;
    sendBtn.disabled = false;
    inputEl.focus();
  }
}

// ── Chip click ───────────────────────────────────────────────
function handleChipClick(text) {
  handleSend(text);
}

// ── Event listeners ──────────────────────────────────────────
sendBtn.addEventListener("click", () => handleSend());

inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
});

// Auto-resize textarea
inputEl.addEventListener("input", () => {
  inputEl.style.height = "auto";
  inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + "px";
});

// ── Start ────────────────────────────────────────────────────
init();
