import { GoogleGenAI } from "@google/genai";

// Initialize Gemini AI
const ai = new GoogleGenAI({
  apiKey: "AIzaSyAwpYL1yTj6BsDXT8pxb96tNtsYV_qHHZk", // store your key securely
});

async function getVideoAutomatedContent(videoDesc) {
  // Create chat instance with Gemini
  const chat = await ai.chats.create({ model: "gemini-2.0-flash" });

  // Prompt for AI

  const videoAutomatedPrompt = `

 System Prompt: You are a video content classifier. 
 Your goal is to analyze a video description and categorize it into exactly ONE of 
 the following tags: [Education, Music, Comedy, Gaming, Tech, Vlog].

 Instructions:
  1.Output only the category name.
  2. Do not include explanations or punctuation.
  3.If the description fits multiple, choose the most dominant one.
 
Video Description: "${videoDesc}"`;

  // Send message to Gemini
  const response = await chat.sendMessage({ message: videoAutomatedPrompt });

  // Parse AI response as JSON
  try {
    return JSON.parse(response.text);
  } catch (err) {
    console.error("Failed to parse AI response:", response.text);
    return [];
  }
}

export default getVideoAutomatedContent;
