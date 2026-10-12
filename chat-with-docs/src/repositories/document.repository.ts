
import { pool } from "../db.js";

interface DocumentRecord {
  id: string;
  content_hash: string;
}

// 1. Find an existing document
export async function findDocumentById(
  documentId: string
): Promise<DocumentRecord | null> {
  const result = await pool.query<DocumentRecord>(
    `SELECT id, content_hash
     FROM documents
     WHERE id = $1`,
    [documentId]
  );

  return result.rows[0] ?? null;
}

// 2. Define the chunk data we want to store
export interface ChunkToSave {
  content: string;
  embedding: number[];
}

// 3. Replace old chunks and update the document hash
export async function replaceDocumentChunks(
  documentId: string,
  contentHash: string,
  chunks: ChunkToSave[]
): Promise<void> {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Delete old chunks belonging to this document
    await client.query(
      "DELETE FROM document_chunks WHERE document_id = $1",
      [documentId]
    );

    // Insert new chunks
    for (const chunk of chunks) {
      await client.query(
        `INSERT INTO document_chunks
          (document_id, content, embedding)
         VALUES ($1, $2, $3::vector)`,
        [
          documentId,
          chunk.content,
          JSON.stringify(chunk.embedding),
        ]
      );
    }

    // Insert document hash or update it if it exists
    await client.query(
      `INSERT INTO documents (id, content_hash)
       VALUES ($1, $2)
       ON CONFLICT (id)
       DO UPDATE SET
         content_hash = EXCLUDED.content_hash,
         indexed_at = NOW()`,
      [documentId, contentHash]
    );

    await client.query("COMMIT");

  } catch (error) {
    await client.query("ROLLBACK");
    throw error;

  } finally {
    client.release();
  }
}
