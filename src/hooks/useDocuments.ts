import { useState, useEffect, useCallback } from "react";
import { getDocuments } from "@/api/documents";
import type { DocumentItem } from "@/types/DocumentItem";

export const useDocuments = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDocuments();
      setDocuments(response.data.documents);
    } catch {
      setError("Ошибка при загрузке документов.");
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return {
    documents,
    loading,
    error,
    refresh: fetchDocuments,
  };
};
