import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_GENAI_API_KEY);

export const getVideoAutomatedContent = async (title, description) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Updated prompt to request multiple SEO-friendly tags
    const prompt = `
      Act as a video metadata expert. Analyze the following:
      Title: ${title}
      Description: ${description}

      Based on this, generate 6 highly relevant, short, SEO-friendly tags or categories.
      Include at least one of these if applicable: [Education, Music, Comedy, Tech, Gaming, Vlog].
      
      Return ONLY the tags separated by commas. No numbering, no hashtags, no extra text.
      Example format: Tech, AI, Coding, Tutorial, Software, Education
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Clean and split the response into an array
    return responseText
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  } catch (error) {
    console.error("AI Error:", error);
    return ["Tech", "Nexus"]; // Fallback array
  }
};
