
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function generateAnswer(
  question: string,
  context: string
): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: `
Answer the user's question using only the
provided document context.

If the answer is not present in the context,
say "Information not available in the document."

Document Context:
${context}

User Question:
${question}
    `,
  });

  return response.text ?? "No answer generated.";
}
