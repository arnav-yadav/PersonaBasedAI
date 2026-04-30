# Assignment 01 — Persona-Based AI Chatbot 🤖

**Course:** Prompt Engineering | Scaler Academy  
**Live Deployment:** [https://persona-based-ai-two.vercel.app](https://persona-based-ai-two.vercel.app)  
**Tech Stack:** Vanilla JS, Vite, CSS3 (Glassmorphism design), Google Gemini Flash API

---

## 🎯 Project Overview
This project fulfills the requirements for Assignment 01: building a working, production-grade AI chatbot providing realistic conversations with three Scaler personalities:
1. **Anshuman Singh**
2. **Abhimanyu Saxena**
3. **Kshitij Mishra**

Every concept taught in the lecture regarding system prompting has been rigorously applied. This includes deep persona descriptions, few-shot examples, Chain-of-Thought (CoT) instructions, and strict output constraints.

---

## 🚀 Key Features

* **Three Unique Personas:** Seamlessly switch between the co-founders and instructors. Each possesses specifically engineered knowledge boundaries, communication styles, and constraints.
* **Annotated System Prompts:** Hand-engineered prompts tailored via online research of their public posts and interview styles. (Please see `prompts.md` for in-depth `// WHY:` annotations).
* **Premium UI/UX:** Built with a modern dark glassmorphism design system, dynamic styling based on the active persona, and responsive chat bubbles.
* **Robust Error Handling:** Designed with non-blocking asynchronous interactions, catching API errors gracefully and showing UI Toast notifications rather than crashing the client.
* **⭐ Additional Feature — Persistent Caching:** Custom functionality was integrated utilizing browser `localStorage` to cache conversation history. Switching between personas retains and isolated previous interactions seamlessly, allowing users to pause and resume multi-agent conversations without context leakage.

---

## 📂 Required Submissions & Code Structure

| File | Requirement Fulfilled |
|------|---------|
| `src/personas.js` | Contains the three heavily researched system prompts, constraints, and CoT logic in source code. |
| `src/api.js` | Wrapper for the Google Gemini SDK safely utilizing `.env` variables (no hardcoded keys). |
| `src/main.js` | Front-end controller handling DOM logic, active switching, and the **Caching Addition**. |
| `prompts.md` | Required assignment documentation explaining the exact prompt engineering rationale. |
| `reflection.md` | Final assignment reflection regarding what worked and lessons regarding the GIGO principle. |

---

## ⚙️ How to Review Locally

If you are evaluating this offline (instead of the Vercel link):

1. **Clone and Install:**
   ```bash
   git clone https://github.com/arnav-yadav/PersonaBasedAI.git
   cd PersonaBasedAI
   npm install
   ```

2. **Configure API Key:**
   Create a `.env` file in the root directory (using `.env.example` as a template) and add your free Google AI Studio key:
   ```plaintext
   VITE_GEMINI_API_KEY=your_actual_key_here
   ```

3. **Start the Web Server:**
   ```bash
   npm run dev
   ```
   *The server will typically become available instantly at `http://localhost:5173/`*
