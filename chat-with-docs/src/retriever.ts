
import { generateEmbedding } from "./embedding.js";
import {
  searchSimilarChunks,
} from "./repositories/chunk.repository.js";

export async function retrieve(
  question: string,
  documentId: string,
  topK: number = 3
) {
  const queryEmbedding =
    await generateEmbedding(question);

  return searchSimilarChunks(
    queryEmbedding,
    documentId,
    topK
  );
}
