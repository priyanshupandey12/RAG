
export function splitIntoSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0);
}


export function chunkBySentences(
  text: string,
  maxChunkSize: number = 100
): string[] {
  const sentences = splitIntoSentences(text).flatMap((sentence) =>
  sentence.length > maxChunkSize
    ? splitLongSentence(sentence, maxChunkSize)
    : [sentence]
);

  const chunks: string[] = [];
  let currentChunk = "";

  for (const sentence of sentences) {
    const combined = currentChunk
      ? `${currentChunk} ${sentence}`
      : sentence;

    if (combined.length <= maxChunkSize) {
      currentChunk = combined;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk);
      }

      currentChunk = sentence;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}



function splitLongSentence(
  sentence: string,
  maxChunkSize: number
): string[] {
  const pieces: string[] = [];
  let remaining = sentence.trim();

  while (remaining.length > maxChunkSize) {
    const spaceIndex = remaining.lastIndexOf(" ", maxChunkSize);

    if (spaceIndex <= 0) {
      pieces.push(remaining.slice(0, maxChunkSize));
      remaining = remaining.slice(maxChunkSize);
    } else {
      pieces.push(remaining.slice(0, spaceIndex));
      remaining = remaining.slice(spaceIndex + 1);
    }
  }

  if (remaining.length > 0) {
    pieces.push(remaining);
  }

  return pieces;
}
