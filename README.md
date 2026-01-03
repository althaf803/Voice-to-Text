# Voice-to-Text Desktop App (Tauri + Deepgram)

A high-performance, cross-platform desktop application that provides **real-time voice transcription** using the **Deepgram API** and the **Tauri framework**. This project demonstrates clean architecture, native desktop integration, and low-latency audio streaming.

---

## 🚀 Features

- **Real-time Transcription**  
  Streams microphone audio to Deepgram’s **Nova-2** model via WebSocket for instant transcription.

- **Chat-Style Workflow**  
  A **Start / Stop** toggle saves completed transcriptions into a history log for organized dictation sessions.

- **Editable Output**  
  Transcribed text appears in an editable text area for immediate corrections.

- **Visual Feedback**  
  Status indicators for Listening, Processing, and Error states.

- **Cross-Platform Desktop App**  
  Built with **Tauri**, supporting Windows, macOS, and Linux.

---

## 🛠 Tech Stack

- **Framework:** Tauri (Rust + WebView)
- **Frontend:** React + Vite
- **Speech-to-Text:** Deepgram API (WebSocket, Nova-2 model)

---

## 🏗 Architecture & Design Decisions

### Separation of Concerns

- **useVoiceToText.js**
  - Microphone access
  - WebSocket lifecycle
  - Audio streaming
  - Transcription handling

- **App.jsx**
  - UI rendering
  - Status display
  - History management
  - No business logic

This ensures better **maintainability, readability, and scalability**.

---

### Native WebSocket Usage

- Avoids heavy SDKs
- Smaller bundle size
- Full control over connection states

---

### Security

- API keys stored in environment variables
- No secrets hardcoded
- `.env` excluded from version control

---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js v18+
- Rust (latest stable)
- Tauri system dependencies  
  - Windows: Visual Studio C++ Build Tools

---

## ⚙️ Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/althaf803/Voice-to-Text.git
cd voice-text-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Deepgram API Key

Create a `.env` file in the project root and add:

```env
VITE_DEEPGRAM_API_KEY=your_deepgram_api_key_here
```

### 4. Run the Application (Development Mode)

```bash
npm run tauri dev
```

---

## 🧪 Usage Flow

1. Click **Start Recording**
2. Speak into the microphone
3. Watch live transcription appear in real time
4. Click **Stop Recording**
5. Transcription is saved to history
6. Edit the text if required

---

## 📄 License

This project was created for a **technical assessment** and is provided for **evaluation and demonstration purposes only**.
