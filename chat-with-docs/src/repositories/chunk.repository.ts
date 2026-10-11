
import { pool } from "../db.js";

export async function saveChunk(
  documentId: string,
  content: string,
  embedding: number[]
): Promise<void> {
  const query = `
    INSERT INTO document_chunks
      (document_id, content, embedding)
    VALUES ($1, $2, $3::vector)
  `;

  await pool.query(query, [
    documentId,
    content,
    JSON.stringify(embedding),
  ]);
}


export interface SearchResult {
  id: string;
  document_id: string;
  content: string;
  similarity: number;
}

export async function searchSimilarChunks(
  queryEmbedding: number[],
  topK: number = 3
): Promise<SearchResult[]> {
  const query = `
    SELECT
      id,
      document_id,
      content,
      1 - (embedding <=> $1::vector) AS similarity
    FROM document_chunks
    ORDER BY embedding <=> $1::vector
    LIMIT $2
  `;

  const result = await pool.query<SearchResult>(query, [
    JSON.stringify(queryEmbedding),
    topK,
  ]);

  return result.rows;
}
