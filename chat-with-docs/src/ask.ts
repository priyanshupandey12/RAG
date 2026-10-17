
import { hybridSearch } from "./retrieval/hybrid-search.js";
import { generateAnswer } from "./generation.js";

export async function askQuestion(
  question: string,
  documentId: string
): Promise<string> {
  const results = await hybridSearch(question, documentId, 3);

  if (results.length === 0) {
    return "No relevant document content found.";
  }

  const context = results
    .map((result) => result.content)
    .join("\n\n");

  return generateAnswer(question, context);
}
