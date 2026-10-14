
import { chunkBySentences } from "./sentence-chunker.js";

// const document = `
// Our backend uses JWT authentication.
// When a user logs in, the server validates their credentials.
// The access token expires after 15 minutes.
// Redis is used for caching.
// `;

// const chunks = chunkBySentences(document, 100);

// chunks.forEach((chunk, index) => {
//   console.log(`Chunk ${index + 1}:`);
//   console.log(chunk);
//   console.log("Length:", chunk.length);
//   console.log("----------------");
// });



const longSentence =
  "This is a very long sentence about our backend architecture " +
  "that explains authentication, authorization, token validation, " +
  "database connections, caching strategies, and several other " +
  "important implementation details without ending the sentence.";

const longChunks = chunkBySentences(longSentence, 100);

console.log("Long sentence test:");

longChunks.forEach((chunk, index) => {
  console.log(`Chunk ${index + 1}:`, chunk.length);
});
