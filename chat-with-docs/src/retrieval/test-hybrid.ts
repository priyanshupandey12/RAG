import { hybridSearch } from "./hybrid-search.js";

async function main() {
  const results = await hybridSearch(
    "JWT authentication",
    "backend-document",
    3
  );

  console.table(
    results.map((chunk) => ({
      id: chunk.id,
      content: chunk.content,
      rrfScore: chunk.rrfScore,
    }))
  );
}

main().catch(console.error);