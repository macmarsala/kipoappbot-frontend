import { api } from "./base";

export const getDocuments = () => api.get("/student/documents");

export const sendDocumentToChat = (documentId: number) =>
  api.post(`/student/documents/${documentId}/send-to-chat`);