# Voice-to-Text Desktop App (Tauri + Deepgram)

A high-performance, cross-platform desktop application that provides real-time voice transcription using the Deepgram API and Tauri framework.

## 🚀 Features
- **Real-time Transcription:** Streams audio to Deepgram's Nova-2 model for instant text generation.
- **Toggle Recording:** Simple Start/Stop control for ease of use.
- **Editable Output:** Transcribed text appears in an interactive editor for immediate corrections.
- **Visual Feedback:** Clear status indicators (Listening, Processing, Error) and visual cues when recording.

## 🛠 Tech Stack
- **Framework:** [Tauri](https://tauri.app/) (Rust + WebView) for a lightweight, native desktop experience.
- **Frontend:** React (Vite) for a responsive component-based UI.
- **Speech Engine:** [Deepgram API](https://deepgram.com/) via WebSocket for low-latency streaming.

## 🏗 Architecture & Design Decisions

### 1. Separation of Concerns (Logic vs. UI)
To ensure clean and maintainable code, the application logic is separated from the visual layer:
- **`useVoiceToText.js` (Custom Hook):** Handles the "dirty work" — microphone permissions, WebSocket connections, and stream management.
- **`App.jsx` (UI Layer):** Handles only the display and user interactions.
*Why?* This makes the code easier to test and allows the speech engine to be swapped out in the future without breaking the UI.

### 2. WebSocket Implementation
Instead of using the heavy Deepgram SDK for the frontend, I utilized native browser `WebSocket` API.
*Why?* This reduces the bundle size significantly and offers finer control over the connection state (Open/Close/Error) directly within the React lifecycle.

### 3. Toggle vs. Push-to-Talk
While Push-to-Talk was the initial prompt, I implemented a **Toggle (Start/Stop)** mechanism.
*Why?* For longer dictations, holding a button is physically straining. A toggle allows the user to speak freely and edit text simultaneously, improving the workflow.

## ⚙️ Setup & Installation

**Prerequisites:**
- Node.js (v18+)
- Rust (latest stable)
- Visual Studio C++ Build Tools (Windows)

**Steps:**
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd voice-text-app

2. Install dependencies:

   npm install

3. Configure API Key:

   Open src/hooks/useVoiceToText.js.

   Replace YOUR_DEEPGRAM_KEY_HERE with your valid Deepgram API Key.

4. Run the development app:

   npm run tauri dev

⚠️ Known Limitations & Assumptions
Security: For this demonstration, the API Key is stored client-side. In a production environment, an ephemeral key server or backend proxy would be required to secure credentials.

Network: The application assumes a stable internet connection for WebSocket streaming. Offline support is not currently implemented.

Audio Format: The app defaults to audio/webm, which is widely supported by modern browsers and Deepgram.

📄 License
This project is created for a technical assessment and is available for evaluation purposes.