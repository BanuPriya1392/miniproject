import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function GeminiAssistant() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Initialize the SDK with your API Key
  const genAI = new GoogleGenerativeAI(
    "AIzaSyAWMO6uZq2A8_adGleLWlr0c79n-E_UWx8"
  );

  const handleAiRequest = async () => {
    if (!prompt) return;

    setLoading(true);
    try {
      // 2. Select the model (e.g., gemini-2.5-flash)
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // 3. Generate content
      const result = await model.generateContent(prompt);
      const output = await result.response.text();

      setResponse(output);
    } catch (error) {
      console.error("AI Error:", error);
      setResponse("Sorry, something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gemini AI Assistant</h2>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask me anything..."
      />
      <button onClick={handleAiRequest} disabled={loading}>
        {loading ? "Thinking..." : "Ask Gemini"}
      </button>

      <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default GeminiAssistant;
