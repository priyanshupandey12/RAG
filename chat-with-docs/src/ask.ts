
import { retrieve } from "./retriever.js";
import { generateAnswer } from "./generation.js";

export async function askQuestion(
  question: string
): Promise<string> {
  const results = await retrieve(question, 3);

  const context = results
  .map((result) => result.content)
  .join("\n\n");

  return generateAnswer(question, context);
}
