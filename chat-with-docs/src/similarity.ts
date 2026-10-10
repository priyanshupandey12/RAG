
export function cosineSimilarity(
  a: number[],
  b: number[]
): number {
  if (!a || !b || a.length !== b.length || a.length === 0) {
    throw new Error("Invalid vector dimensions");
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

 for (let i = 0; i < a.length; i++) {
  const aValue = a[i]!;
  const bValue = b[i]!;

  dotProduct += aValue * bValue;
  normA += aValue * aValue;
  normB += bValue * bValue;
}

  if (normA === 0 || normB === 0) {
    throw new Error("Cannot compare zero vectors");
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
