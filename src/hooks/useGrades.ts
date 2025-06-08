import { useState, useEffect, useCallback } from "react";
import { getGrades } from "@/api/grades";
import type { GradeItem } from "@/types/GradeItem";

export const useGrades = () => {
  const [grades, setGrades] = useState<GradeItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGrades = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getGrades();
      setGrades(response.data.grades ?? []);
    } catch {
      setError("Ошибка при загрузке оценок.");
      setGrades([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGrades();
  }, [fetchGrades]);

  return {
    grades,
    loading,
    error,
    refresh: fetchGrades,
  };
};
