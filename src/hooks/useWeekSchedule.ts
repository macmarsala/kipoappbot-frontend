import { useState, useEffect, useCallback } from "react";
import { getWeekSchedule } from "@/api/schedule";
import type { ScheduleItem } from "@/types/ScheduleItem";

export const useWeekSchedule = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedule = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getWeekSchedule();
      setSchedule(response.data.schedule);
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
