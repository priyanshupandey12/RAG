import { pool } from "../db.js";

export interface KeywordSearchResult {
  id: number;
  content: string;
  keyword_score: number;
}

export async function keywordSearch(
  question: string,
  documentId: string,
  topK: number = 3
): Promise<KeywordSearchResult[]> {
  const result = await pool.query<KeywordSearchResult>(
    `
    SELECT
      id,
      content,
      ts_rank(
        to_tsvector('english', content),
        plainto_tsquery('english', $1)
      ) AS keyword_score
    FROM document_chunks
    WHERE
      document_id = $2
      AND to_tsvector('english', content)
          @@ plainto_tsquery('english', $1)
    ORDER BY keyword_score DESC
    LIMIT $3
    `,
    [question, documentId, topK]
  );

  return result.rows;
}