
import { askQuestion } from "./ask.js";
import { pool } from "./db.js";
import { indexDocument } from "./indexer.js";
import { fileURLToPath } from "node:url";

async function main() {
  try {
    const documentPath = fileURLToPath(
      new URL("./document/document.txt", import.meta.url)
    );

    await indexDocument(documentPath);

    const answer = await askQuestion(
      "How does JWT authentication work?"
    );

    console.log("Gemini Answer:", answer);
  } finally {
    await pool.end();
  }
}

main().catch(console.error);
