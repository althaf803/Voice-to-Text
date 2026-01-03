# Voice-to-Text Desktop App (Tauri + Deepgram)

A high-performance, cross-platform desktop application that provides **real-time voice transcription** using the **Deepgram API** and **Tauri framework**. This project demonstrates a clean separation of concerns, native desktop integration, and low-latency audio streaming.

---

## 🚀 Features

- **Real-time Transcription**  
  Streams microphone audio to Deepgram’s **Nova-2** speech model using a WebSocket connection for instant transcription.

- **Chat-Style Workflow**  
  A **Start / Stop** recording toggle saves completed transcriptions into a history log, enabling organized dictation sessions.

- **Editable Output**  
  Live transcription appears in an editable text area so users can correct or refine text immediately.

- **Visual Feedback**  
  Clear status indicators for:
  - Listening  
  - Processing  
  - Error  
  along with active-state UI styling.

- **Cross-Platform Desktop App**  
  Built with **Tauri**, producing a lightweight native application for **Windows, macOS, and Linux**.

---

## 🛠 Tech Stack

- **Framework:** [Tauri](https://tauri.app/)  
  Lightweight native desktop framework using Rust + WebView.

- **Frontend:** React + Vite  
  Fast development, component-based UI, and clean state handling.

- **Speech-to-Text Engine:** [Deepgram API](https://deepgram.com/)  
  Chosen for low latency, high accuracy, and real-time WebSocket streaming.

---

## 🏗 Architecture & Design Decisions

### 1. Separation of Concerns (Logic vs UI)

The application strictly separates **business logic** from **presentation**:

- **`useVoiceToText.js` (Custom React Hook)**  
  - Handles microphone access  
  - Manages WebSocket lifecycle  
  - Streams audio data  
  - Processes incoming transcription events  

- **`App.jsx` (UI Layer)**  
  - Renders buttons, text areas, and status indicators  
  - Consumes state exposed by the custom hook  
  - Contains no business logic  

This approach improves:
- Readability  
- Testability  
- Maintainability  

---

### 2. Native WebSocket Implementation

Instead of using the Deepgram frontend SDK, the app uses a **native WebSocket connection**:

- Reduces bundle size  
- Improves control over connection states  
- Avoids unnecessary abstractions  

---

### 3. Security & Configuration

- API keys are stored in **environment variables**
- No secrets are hardcoded
- `.env` file is excluded from version control

---

## ⚙️ Setup & Installation

### Prerequisites

- **Node.js** v18 or higher  
- **Rust** (latest stable)  
- **Tauri prerequisites**  
  - Windows: Visual Studio C++ Build Tools  

---

### Installation Steps

#### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd voice-text-app
2. Install Dependencies
bash
Copy code
npm install
3. Configure Deepgram API Key
Create a .env file in the project root:

env
Copy code
VITE_DEEPGRAM_API_KEY=your_deepgram_api_key_here
4. Run the Application (Development Mode)
bash
Copy code
npm run tauri dev
🧪 Usage Flow
Click Start Recording

Speak into the microphone

Watch live transcription appear in real time

Click Stop Recording

Transcription is saved to history

Edit the text if required

📄 License
This project was created for a technical assessment and is provided for evaluation and demonstration purposes only.