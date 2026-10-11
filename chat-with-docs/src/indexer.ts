
import { readFile } from "node:fs/promises";
import { chunkText } from "./chunking.js";
import { generateEmbedding } from "./embedding.js";
import { vectorStore } from "./vector-store.js";
import { saveChunk } from "./repositories/chunk.repository.js";

export async function indexDocument(
  filePath: string
): Promise<void> {
  const document = await readFile(filePath, "utf-8");

  const chunks = chunkText(document, 100, 20);

  for (const [index, chunk] of chunks.entries()) {
    const embedding = await generateEmbedding(chunk);

  await saveChunk(
    "backend-document",
    chunk,
    embedding
  );
  }

  console.log(`Indexed ${chunks.length} chunks`);
}
