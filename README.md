# Persona-Based AI Chatbot — Scaler Academy Assignment 01

A production-grade AI chatbot that lets you have real, persona-authentic conversations with three Scaler/InterviewBit personalities — powered by Google Gemini.

![App Preview](./docs/preview.png)

---

## 🚀 Live Demo

**[→ Live on Vercel](https://persona-based-ai.vercel.app)** *(update after deployment)*

---

## 🎯 Features

- 🎭 **3 Deep AI Personas** — Anshuman Singh, Abhimanyu Saxena, Kshitij Mishra
- 💬 **Multi-turn Conversation** — context retained per session
- 🔄 **Persona Switching** — resets conversation, changes system prompt
- ⚡ **Suggestion Chips** — quick-start per persona
- ⌨️ **Typing Indicator** — animated 3-dot pulse while waiting
- 📱 **Fully Responsive** — works on mobile and desktop
- 🛡️ **Error Handling** — graceful toast messages for API failures
- 🎨 **Dark Glassmorphism UI** — per-persona accent colors

---

## 🛠 Tech Stack

| Layer       | Technology                  |
|-------------|-----------------------------|
| Framework   | Vite + Vanilla JS            |
| Styling     | Vanilla CSS (custom system) |
| LLM API     | Google Gemini 2.0 Flash      |
| Deployment  | Vercel                       |

---

## ⚙️ Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/PersonaBasedAI.git
cd PersonaBasedAI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your API key

```bash
cp .env.example .env
```

Open `.env` and add your Gemini API key:

```
VITE_GEMINI_API_KEY=your_actual_key_here
```

Get a free key at: [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
PersonaBasedAI/
├── index.html          ← App shell (semantic HTML, SEO meta)
├── vite.config.js
├── package.json
├── .env                ← Your API key (never committed)
├── .env.example        ← Template for env vars
├── .gitignore
├── README.md
├── prompts.md          ← Annotated system prompts
├── reflection.md       ← 400-word reflection
└── src/
    ├── main.js         ← App logic & event wiring
    ├── api.js          ← Gemini API wrapper
    ├── personas.js     ← All 3 system prompts + metadata
    ├── ui.js           ← DOM helpers
    └── style.css       ← Full design system
```

---

## 🧠 The Three Personas

| Persona | Role | Voice |
|---|---|---|
| **Anshuman Singh** | Co-founder, Scaler & InterviewBit | Candid, engineer-brained, fundamentals-obsessed |
| **Abhimanyu Saxena** | Co-founder & CEO, Scaler | Mission-driven, uses compass/map analogy, reflective |
| **Kshitij Mishra** | Head of Instructors, Scaler | Warm teacher energy, structured, celebrates small wins |

See [prompts.md](./prompts.md) for the full annotated system prompts.

---

## 🚢 Deployment (Vercel)

```bash
npm install -g vercel
vercel
```

Add `VITE_GEMINI_API_KEY` in your Vercel project's Environment Variables.

---

## 📄 Documentation

- [`prompts.md`](./prompts.md) — All 3 system prompts with inline design annotations
- [`reflection.md`](./reflection.md) — What worked, GIGO lessons, what to improve

---

## 🔒 Security

- API key stored in `.env` — never committed
- `.env` is in `.gitignore`
- `.env.example` provided as a safe template
