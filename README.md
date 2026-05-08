# Velvet Studio — React App

A high-octane, manga-inspired portfolio by Vignesh Shankar.

## 🚀 Run Locally

**Prerequisites:** Node.js (v18+)

### Steps:

1. **Unzip** this folder
2. **Open terminal** inside the `velvet-studio` folder
3. **Install dependencies:**
   ```
   npm install
   ```
4. **Add your Gemini API key** — open `.env.local` and replace the placeholder:
   ```
   GEMINI_API_KEY=your_actual_key_here
   ```
5. **Start the app:**
   ```
   npm run dev
   ```
6. **Open in browser:** http://localhost:3000

## 🔑 Get a Gemini API Key
Go to https://aistudio.google.com/app/apikey and create a free key.

## 📁 Project Structure
```
velvet-studio/
├── src/
│   ├── App.tsx       ← Main app component
│   ├── main.tsx      ← React entry point
│   └── index.css     ← Tailwind + custom styles
├── index.html
├── vite.config.ts
├── package.json
└── .env.local        ← Your API key goes here
```
