import { retrieve } from "../retriever.js";
import { keywordSearch } from "./keyword-search.js";
import { reciprocalRankFusion, type FusedChunk } from "./rrf.js";

export async function hybridSearch(
  question: string,
  documentId: string,
  topK: number = 3
): Promise<FusedChunk[]> {
  const candidateK = Math.max(topK * 2, 10);

  const [semanticResults, keywordResults] = await Promise.all([
    retrieve(question, documentId, candidateK),
    keywordSearch(question, documentId, candidateK),
  ]);

  const fusedResults = reciprocalRankFusion(
    semanticResults,
    keywordResults
  );

  return fusedResults.slice(0, topK);
}
