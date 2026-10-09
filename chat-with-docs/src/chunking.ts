

export function chunkText(text: string, chunkSize: number, chunkOverlap: number): string[] {
    if (
    chunkSize <= 0 ||
    chunkOverlap < 0 ||
    chunkOverlap >= chunkSize
  ) {
    throw new Error("Invalid chunk settings");
  }

  const chunks: string[] = [];
  const step = chunkSize - chunkOverlap;
   for (let i = 0; i < text.length; i += step) {
    const chunk = text.slice(i, i + chunkSize);

    if (chunk.trim()) {
      chunks.push(chunk);
    }

    if (i + chunkSize >= text.length) {
      break;
    }
  }

  return chunks;
}
