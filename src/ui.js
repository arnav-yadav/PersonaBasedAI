// ============================================================
// ui.js — DOM manipulation helpers
// ============================================================

/**
 * Append a message bubble to the chat window.
 * @param {HTMLElement} chatEl  - The scrollable chat container
 * @param {'user'|'model'} role
 * @param {string} text
 * @param {object} persona      - Persona metadata for avatar/color
 */
export function appendMessage(chatEl, role, text, persona) {
  const wrap = document.createElement("div");
  wrap.className = `message-row ${role}`;

  if (role === "model") {
    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.style.background = persona.gradient;
    avatar.innerHTML = `<img src="${persona.image}" alt="${persona.name}" onerror="this.style.display='none'; this.parentElement.textContent='${persona.avatar}'" />`;
    wrap.appendChild(avatar);
  }

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  // Safely render text preserving newlines
  bubble.textContent = text;

  wrap.appendChild(bubble);
  chatEl.appendChild(wrap);

  // Animate in
  requestAnimationFrame(() => wrap.classList.add("visible"));

  scrollToBottom(chatEl);
}

/**
 * Show the animated typing indicator (3-dot pulse).
 * Returns the element so caller can remove it.
 */
export function showTyping(chatEl, persona) {
  const wrap = document.createElement("div");
  wrap.className = "message-row model typing-row";
  wrap.id = "typing-indicator";

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.style.background = persona.gradient;
  avatar.innerHTML = `<img src="${persona.image}" alt="${persona.name}" onerror="this.style.display='none'; this.parentElement.textContent='${persona.avatar}'" />`;

  const bubble = document.createElement("div");
  bubble.className = "bubble typing-bubble";
  bubble.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`;

  wrap.appendChild(avatar);
  wrap.appendChild(bubble);
  chatEl.appendChild(wrap);

  requestAnimationFrame(() => wrap.classList.add("visible"));
  scrollToBottom(chatEl);

  return wrap;
}

/** Remove the typing indicator */
export function hideTyping() {
  const el = document.getElementById("typing-indicator");
  if (el) el.remove();
}

/** Scroll chat to the bottom */
export function scrollToBottom(chatEl) {
  chatEl.scrollTop = chatEl.scrollHeight;
}

/**
 * Show an error toast notification.
 * @param {string} message
 */
export function showErrorToast(message) {
  const existing = document.getElementById("error-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "error-toast";
  toast.className = "error-toast";
  toast.innerHTML = `<span class="toast-icon">⚠️</span><span>${message}</span>`;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("visible"));

  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/**
 * Render suggestion chips for the active persona.
 * Returns early (hiding chips section) if chat already has messages.
 */
export function renderChips(chipsEl, persona, onChipClick) {
  chipsEl.innerHTML = "";
  persona.chips.forEach((text) => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.textContent = text;
    chip.addEventListener("click", () => onChipClick(text));
    chipsEl.appendChild(chip);
  });
}

/** Show or hide the chips wrapper based on message count */
export function toggleChips(chipsWrapper, hasMessages) {
  chipsWrapper.style.display = hasMessages ? "none" : "flex";
}
