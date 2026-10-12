
import { readFile } from "node:fs/promises";
import { chunkText } from "./chunking.js";
import { generateEmbedding } from "./embedding.js";
import { generateHash } from "./utils/hash.js";
import {
  findDocumentById,
  replaceDocumentChunks,
  type ChunkToSave,
} from "./repositories/document.repository.js";

export async function indexDocument(
  filePath: string
): Promise<void> {
  const documentId = "backend-document";

  const document = await readFile(filePath, "utf-8");
  const contentHash = generateHash(document);

  const existingDocument = await findDocumentById(documentId);

  if (existingDocument?.content_hash === contentHash) {
    console.log("Document unchanged. Skipping indexing.");
    return;
  }

  console.log("New or modified document detected.");

  const chunks = chunkText(document, 100, 20);

  const preparedChunks: ChunkToSave[] = [];

  for (const chunk of chunks) {
    const embedding = await generateEmbedding(chunk);

    preparedChunks.push({
      content: chunk,
      embedding,
    });
  }

  await replaceDocumentChunks(
    documentId,
    contentHash,
    preparedChunks
  );

  console.log("Document indexed successfully!");
}
