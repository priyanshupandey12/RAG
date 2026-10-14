import { keywordSearch } from "./keyword-search.js";

async function main() {
  const results = await keywordSearch(
    "JWT authentication",
    "backend-document",
    3
  );

  console.log("Keyword Search Results:");

  for (const chunk of results) {
    console.log({
      id: chunk.id,
      content: chunk.content,
      keywordScore: chunk.keyword_score,
    });
  }
}

main().catch(console.error);