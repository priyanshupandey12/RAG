import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing");
}

const ai = new GoogleGenAI({ apiKey });

export async function generateAIResponse(prompt: string) {
  const response = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: prompt,
  });

  return response.output_text;
}