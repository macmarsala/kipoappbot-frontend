import { useState, useEffect, useCallback } from "react";
import { getTodaySchedule } from "@/api/schedule";
import type { ScheduleItem } from "@/types/ScheduleItem";

export const useTodaySchedule = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedule = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTodaySchedule();
      setSchedule(response.data);
    } catch {
      setError("Ошибка при загрузке расписания.");
      setSchedule([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  return {
    schedule,
    loading,
    error,
    refresh: fetchSchedule,
  };
};
