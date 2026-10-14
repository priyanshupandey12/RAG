
import { askQuestion } from "./ask.js";
import { pool } from "./db.js";

async function main() {
  try {
    const answer = await askQuestion(
      "who is John Doe?",
      "backend-document"
    );

    console.log("Gemini Answer:", answer);
  } finally {
    await pool.end();
  }
}

main().catch(console.error);
