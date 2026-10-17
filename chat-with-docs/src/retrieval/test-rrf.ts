import { reciprocalRankFusion } from "./rrf.js";

const semanticResults = [
  { id: "A", content: "Chunk A" },
  { id: "B", content: "Chunk B" },
];

const keywordResults = [
  { id: "B", content: "Chunk B" },
  { id: "C", content: "Chunk C" },
];

const results = reciprocalRankFusion(
  semanticResults,
  keywordResults
);

console.table(results);