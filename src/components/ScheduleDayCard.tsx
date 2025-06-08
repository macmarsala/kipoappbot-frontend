import { Card, CardContent } from "@/components/ui/card";
import { getTimeByLessonNumber } from "@/utils/getTimeByLessonNumber";
import type { ScheduleItem } from "@/types/ScheduleItem";

interface ScheduleDayCardProps {
  date: string;
  lessons: ScheduleItem[];
}

export const ScheduleDayCard = ({ date, lessons }: ScheduleDayCardProps) => {
  const scheduledate = new Date(date);
  const formattedDate = isNaN(scheduledate.getTime()) 
  ? "Неверная дата" 
  : scheduledate.toLocaleDateString("ru-RU", {
      weekday: 'long',   // день недели полностью, например "среда"
      day: '2-digit',    // день с ведущим нулём, например "15"
      month: '2-digit',  // месяц с ведущим нулём, например "05"
      year: '2-digit'    // год, например "2025"
    });

  return (
    <Card>
      <CardContent className="space-y-2">
        <h3 className="text-base font-semibold capitalize">{formattedDate}</h3>

        <div className="grid grid-cols-8 gap-x-4 text-sm font-medium text-gray-600 pb-1">
          <span className="col-span-1">№</span>
          <span className="col-span-2">Время</span>
          <span className="col-span-5">Занятие</span>
        </div>

        {lessons
          .sort((a, b) => a.lesson_number - b.lesson_number)
          .map((lesson) => (
            <div
              key={lesson.id}
              className="grid grid-cols-8 gap-x-4 py-2 border-t text-sm text-gray-800"
            >
              <span className="col-span-1">{lesson.lesson_number}</span>
              <span className="col-span-2">
                {getTimeByLessonNumber(lesson.lesson_number)}
              </span>
              <div className="col-span-5 space-y-0.5">
                <p className="font-medium">
                  {lesson.subject}{" "}
                  <span className="text-gray-500 text-sm">
                    ({lesson.lesson_type})
                  </span>
                </p>
                <p className="text-sm">{lesson.teacher}</p>
                <p className="text-sm">{lesson.classroom}</p>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
};
