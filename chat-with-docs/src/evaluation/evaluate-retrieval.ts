
import { retrieve } from "../retriever.js";
import { retrievalTestCases } from "./test-case.js";

async function evaluateRetrieval() {
    let totalF1 = 0;
let totalQuestions = 0;
  for (const testCase of retrievalTestCases) {
    
    const results = await retrieve(
      testCase.question,
      testCase.documentId,
      3
    );

    const retrievedIds = results.map((result) => result.id);

    const relevantIds = new Set(testCase.relevantChunkIds);

    const relevantRetrieved = retrievedIds.filter((id) =>
      relevantIds.has(id)
    ).length;

    const precision =
      retrievedIds.length === 0
        ? 0
        : relevantRetrieved / retrievedIds.length;

    const recall =
      relevantIds.size === 0
        ? 0
        : relevantRetrieved / relevantIds.size;

        const f1 =
  precision + recall === 0
    ? 0
    : (2 * precision * recall) / (precision + recall);



    console.log("Question:", testCase.question);
    console.log("Expected IDs:", [...relevantIds]);
    console.log("Retrieved IDs:", retrievedIds);
    console.log("Precision:", (precision * 100).toFixed(2) + "%");
    console.log("Recall:", (recall * 100).toFixed(2) + "%");
    console.log("F1 Score:", (f1 * 100).toFixed(2) + "%");
      totalF1 += f1;
    totalQuestions++;

  
  }
  console.log("Average F1 Score:", (totalF1 / totalQuestions * 100).toFixed(2) + "%");
}

evaluateRetrieval().catch(console.error);

