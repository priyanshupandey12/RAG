
export interface RetrievalTestCase {
  question: string;
  documentId: string;
  relevantChunkIds: string[];
}


export const retrievalTestCases: RetrievalTestCase[] = [
  {
    question: "How long does our access token remain valid?",
    documentId: "backend-document",
    relevantChunkIds: ["6"],
  },
  {
    question:
      "Explain how our backend handles authentication, token expiration, and caching.",
    documentId: "backend-document",
    relevantChunkIds: ["5", "6", "7"],
  },
];

