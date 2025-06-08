import { useEffect, useState } from "react";
import { useTodaySchedule } from "@/hooks/useTodaySchedule";
import { ScheduleDayCard } from "@/components/ScheduleDayCard";

export default function DashboardPage() {
  const { schedule, loading, error } = useTodaySchedule();

  const [name, setName] = useState("студент");

  useEffect(() => {
    try {
      const studentRaw = localStorage.getItem("student");
      if (!studentRaw) {
        setName("студент");
        return;
      }
      const student = JSON.parse(studentRaw);
      const fullName = student?.fullName;

      if (typeof fullName === "string") {
        const parts = fullName.trim().split(/\s+/);
        if (parts.length >= 2) {
          setName(parts[1]);
          return;
        }
      }
      setName("студент");
    } catch {
      setName("студент");
    }
  }, []);

  const todayDate = schedule[0]?.lesson_date?.split("T")[0];

  return (
    <div className="pt-8 pb-12 p-4 space-y-2">
      <h1 className="text-2xl font-semibold">Привет, {name}!</h1>

      <section className="space-y-2">
        <h2 className="py-4 text-lg font-medium mb-2">Расписание на сегодня</h2>

        {loading ? (
          <p className="text-gray-500">Загрузка...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : schedule.length > 0 && todayDate ? (
          <ScheduleDayCard date={todayDate} lessons={schedule} />
        ) : (
          <p className="text-gray-500">На сегодня пар нет 🎉</p>
        )}
      </section>
    </div>
  );
}
