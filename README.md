# CalmStream | Autonomous Affective Computing Engine

**CalmStream** is an autonomous emotional intelligence interface designed to neutralize high-conflict human interactions through real-time vocal mirroring, affective orchestration, and AI-driven de-escalation strategies.

Built by **Team XNORDS** for **STELLARIS 2026** at **ABES Engineering College**.

## 🚀 Vision
In a world of increasing digital friction, CalmStream acts as a "neural interface for empathy," transforming high-stress communication into manageable dialogue using zero-shot modulation and contextual buffering.

## 🛠 Tech Stack
- **Frontend**: React.js, Three.js (@react-three/fiber), Framer Motion, Web Audio API
- **Backend**: Node.js, Express, WebSocket (ws)
- **AI/ML**: Emotion Detection Pipeline, ElevenLabs TTS (simulated), LLM-based Calm Responder

## 📂 Project Structure
```text
calmstream/
├── client/                 # React + Vite Frontend
│   └── src/
│       ├── components/     # UI/3D Components
│       ├── hooks/          # WS & Scroll Hooks
│       └── context/        # Escalation State
└── server/                 # Node.js + Express Backend
    ├── routes/             # API Endpoints
    ├── services/           # Emotion & De-escalation Logic
    └── websocket/          # Real-time Broadcast Server
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- npm

### 1. Start the Backend
```bash
cd server
npm install
npm run dev
```
Server runs on: [http://localhost:4000](http://localhost:4000)

### 2. Start the Frontend
```bash
cd client
npm install
npm run dev
```
Fronted runs on: [http://localhost:5173](http://localhost:5173)

## 🎨 Visual Direction
- **Theme**: Anti-gravity dark sci-fi / Neural Interface
- **Primary Colors**: Obsidian Black (#010409), Electric Cyan (#00f5ff), Hot Magenta (#ff2d78)
- **Fonts**: Orbitron, Rajdhani, Space Mono


