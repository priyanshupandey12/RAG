interface RankedChunk {
  id: string | number;
  content: string;
}

export interface FusedChunk {
  id: string;
  content: string;
  rrfScore: number;
}

export function reciprocalRankFusion(
  semanticResults: RankedChunk[],
  keywordResults: RankedChunk[],
  k: number = 60
): FusedChunk[] {
  const scores = new Map<string, FusedChunk>();

  const addResults = (results: RankedChunk[]) => {
    results.forEach((chunk, index) => {
      const rank = index + 1;
      const id = String(chunk.id);

      const contribution = 1 / (k + rank);

      const existing = scores.get(id);

      if (existing) {
        existing.rrfScore += contribution;
      } else {
        scores.set(id, {
          id,
          content: chunk.content,
          rrfScore: contribution,
        });
      }
    });
  };

  addResults(semanticResults);
  addResults(keywordResults);

  return Array.from(scores.values()).sort(
    (a, b) => b.rrfScore - a.rrfScore
  );
}
