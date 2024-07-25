"use client"
import React, { useState } from "react";
import { GeminiAPIService } from "@/Services/geminiAPI";

export default function SignIn() {
  const [response, setResponse] = useState("");
  const [message, setMessage] = useState(""); // State to hold the text field value

  const handleClick = async () => {
    const responseMessage = await GeminiAPIService(message); // Use the message state value
    setResponse(responseMessage);
  };

  return (
    <div>
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} // Update the message state on text field change
        placeholder="Enter your message"
      />
      <button onClick={handleClick}>Send</button>
      {response && <p>{response}</p>}
    </div>
  );
}