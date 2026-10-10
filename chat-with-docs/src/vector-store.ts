
export interface DocumentChunk {
  id: number;
  text: string;
  embedding: number[];
}

export const vectorStore: DocumentChunk[] = [];