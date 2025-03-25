import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini AI client
export const initGemini = (apiKey: string) => {
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
}; 