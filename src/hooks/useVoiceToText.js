import { useState, useRef } from "react";

// --- CONFIGURATION ---
const API_KEY = import.meta.env.VITE_DEEPGRAM_API_KEY; 
// ---------------------

const useVoiceToText = () => {
  const [transcription, setTranscription] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState("Ready");
  
  const socketRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const startRecording = async () => {
    if (isRecording) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const socket = new WebSocket("wss://api.deepgram.com/v1/listen?model=nova-2&smart_format=true", [
        "token",
        API_KEY,
      ]);

      socket.onopen = () => {
        console.log("Deepgram connected");
        setStatus("Listening...");
        setIsRecording(true);

        const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.addEventListener("dataavailable", (event) => {
          if (event.data.size > 0 && socket.readyState === 1) {
            socket.send(event.data);
          }
        });

        mediaRecorder.start(250);
      };

      socket.onmessage = (message) => {
        const received = JSON.parse(message.data);
        const transcript = received.channel?.alternatives[0]?.transcript;
        if (transcript && received.is_final) {
          // Append new text to existing text
          setTranscription((prev) => prev + " " + transcript);
        }
      };

      socket.onclose = () => {
        setStatus("Ready");
        setIsRecording(false);
      };

      socket.onerror = (error) => {
        console.error("Socket error", error);
        setStatus("Error connecting");
        setIsRecording(false);
      };

      socketRef.current = socket;

    } catch (error) {
      console.error("Microphone error:", error);
      setStatus("Microphone Error");
    }
  };

  const stopRecording = () => {
    if (!isRecording) return;

    setStatus("Processing...");

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }

    if (socketRef.current) {
      if (socketRef.current.readyState === 1) {
        setTimeout(() => {
          if (socketRef.current) socketRef.current.close();
        }, 1000);
      } else {
        socketRef.current = null;
        setIsRecording(false);
        setStatus("Ready");
      }
    }
  };
  const resetTranscript = () => {
    setTranscription("");
  };

  return {
    transcription,
    setTranscription,
    resetTranscript, // <--- Add this new function here
    isRecording,
    status,
    startRecording,
    stopRecording,
  };
};

export default useVoiceToText;