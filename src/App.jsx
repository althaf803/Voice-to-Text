import { useState } from "react";
import "./App.css";
import useVoiceToText from "./hooks/useVoiceToText";

function App() {
  const { 
    transcription, 
    setTranscription,
    resetTranscript,
    isRecording, 
    status, 
    startRecording, 
    stopRecording 
  } = useVoiceToText();

  const [history, setHistory] = useState([]);

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      // If there is text in the box from a previous session, save it to history first
      if (transcription.trim()) {
        setHistory((prev) => [...prev, transcription]);
        resetTranscript(); // Clear the box for the new session
      }
      startRecording();
    }
  };

  return (
    <div className="container">
      <h1>Voice Chat</h1>
      
      {/* HISTORY AREA (Previous Dialogs) */}
      <div className="history-container">
        {history.map((text, index) => (
          <div key={index} className="chat-bubble history-bubble">
            {text}
          </div>
        ))}
      </div>

      {/* CURRENT ACTIVE AREA (Editable) */}
      <div className="current-session">
        <div className="status-indicator">Status: {status}</div>
        
        <textarea
          className="transcription-box"
          value={transcription}
          onChange={(e) => setTranscription(e.target.value)}
          placeholder={isRecording ? "Listening..." : "Click Start to speak..."}
        />
      </div>

      <div className="controls">
        <button 
          onClick={handleToggleRecording}
          className={isRecording ? "recording" : ""}
        >
          {isRecording ? "Stop Recording" : "Start New Recording"}
        </button>
      </div>
    </div>
  );
}

export default App;