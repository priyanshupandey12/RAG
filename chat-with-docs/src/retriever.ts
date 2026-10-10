
import { vectorStore } from "./vector-store.js";
import { generateEmbedding } from "./embedding.js";
import { cosineSimilarity } from "./similarity.js";

export async function retrieve(
  question: string,
  topK: number = 3
) {
  const queryEmbedding =
    await generateEmbedding(question);

  const results = vectorStore.map((chunk) => ({
    ...chunk,
    score: cosineSimilarity(
      queryEmbedding,
      chunk.embedding
    ),
  }));

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(0, topK));
}
