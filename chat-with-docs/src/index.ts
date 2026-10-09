import { readFile } from "node:fs/promises";
import {chunkText} from "./chunking.js";


const readingFile = async (filePath: string) => {
    try {
        const documentContent= await readFile(filePath, "utf-8");
        console.log("File content:", documentContent);
        
        const chunks = chunkText(documentContent, 100, 20);

         chunks.forEach((chunk, index) => {
          console.log(`\n--- Chunk ${index + 1} ---`);
          console.log(chunk);
            });

          console.log(`\nTotal chunks: ${chunks.length}`);
    } catch (error) {
        console.error("Error reading file:", error);
        throw error;
    }
}

readingFile("C:/rag/chat-with-docs/src/document/document.txt").then((content) => {
    console.log("Retrieved content:", content);
}).catch((error) => {
    console.error("Failed to retrieve file content:", error);
});