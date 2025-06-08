import { useWeekSchedule } from "@/hooks/useWeekSchedule";
import { ScheduleDayCard } from "@/components/ScheduleDayCard";
import type { ScheduleItem } from "@/types/ScheduleItem";

type ScheduleGrouped = {
  [date: string]: ScheduleItem[];
};

export default function SchedulePage() {
  const { schedule, loading, error } = useWeekSchedule();

  const groupedByDate: ScheduleGrouped = schedule.reduce((acc, item) => {
    const dateKey = item.lesson_date.split("T")[0]; // YYYY-MM-DD
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(item);
    return acc;
  }, {} as ScheduleGrouped);

  const sortedDates = Object.keys(groupedByDate).sort();

  return (
    <div className="p-4 pb-12 space-y-2">
      <h1 className="py-4 text-2xl font-semibold">Расписание на неделю</h1>

      {loading ? (
        <p className="text-gray-500">Загрузка...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : sortedDates.length === 0 ? (
        <p className="text-gray-500">На этой неделе пар нет 🎉</p>
      ) : (
        sortedDates.map((date) => (
          <ScheduleDayCard
            key={date}
            date={date}
            lessons={groupedByDate[date]}
          />
        ))
      )}
    </div>
  );
}
