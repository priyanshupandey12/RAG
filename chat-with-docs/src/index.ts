import { readFile } from "node:fs/promises";
import {chunkText} from "./chunking.js";
import { generateEmbedding } from "./embedding.js";
import { vectorStore } from "./vector-store.js";
import { retrieve } from "./retriever.js";
import { generateAnswer } from "./generation.js";


const readingFile = async (filePath: string) => {
    try {
        const documentContent= await readFile(filePath, "utf-8");
       
        
        const chunks = chunkText(documentContent, 100, 20);

        for (const [index, chunk] of chunks.entries()) {
    const embedding = await generateEmbedding(chunk);

    vectorStore.push({
      id: index + 1,
      text: chunk,
      embedding,
    });
  }



    const question = "How does JWT authentication work?";

const results = await retrieve(question, 3);

const context = results
  .map((result) => result.text)
  .join("\n\n");

const answer = await generateAnswer(question, context);

console.log("\nGemini Answer:");
console.log(answer);
  
          
    } catch (error) {
        console.error("Error reading file:", error);
        throw error;
    }
}

readingFile("C:/rag/chat-with-docs/src/document/document.txt").catch((error) => {
    console.error("Failed to retrieve file content:", error);
});