import { useEffect, useState, useCallback } from "react";
import { getProfile } from "@/api/profile";
import type { StudentItem } from "@/types/StudentItem";

export function useStudent() {
  const [student, setStudent] = useState<StudentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStudent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getProfile();
      setStudent(res.data);
    } catch (err) {
      setError("Не удалось загрузить данные студента");
      setStudent(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudent();
  }, [loadStudent]);

  return {
    student,
    loading,
    error,
    refresh: loadStudent,
  };
}
