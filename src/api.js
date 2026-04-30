// ============================================================
// api.js — Gemini API wrapper
// ============================================================
// Uses the @google/generative-ai SDK.
// API key is read from the VITE_GEMINI_API_KEY env variable.
// Never hardcode keys here.
// ============================================================

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn(
    "⚠️  VITE_GEMINI_API_KEY is not set. Add it to your .env file."
  );
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

/**
 * Send a message to Gemini using a given persona system prompt.
 *
 * @param {string} systemPrompt - The persona's full system instruction
 * @param {Array}  history      - Prior turns: [{role, parts: [{text}]}]
 * @param {string} userMessage  - The current user message
 * @returns {Promise<string>}   - The model's text response
 */
export async function sendMessage(systemPrompt, history, userMessage) {
  if (!API_KEY) {
    throw new Error(
      "API key is missing. Please add VITE_GEMINI_API_KEY to your .env file."
    );
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
    systemInstruction: systemPrompt,
  });

  // Build history in Gemini format (exclude the last user message — that's sent separately)
  const chat = model.startChat({
    history: history,
    generationConfig: {
      maxOutputTokens: 4000,
      temperature: 0.85,
    },
  });

  const result = await chat.sendMessage(userMessage);
  const response = await result.response;
  return response.text();
}
