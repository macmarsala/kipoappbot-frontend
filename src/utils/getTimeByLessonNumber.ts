export function getTimeByLessonNumber(number: number): string {
  const times: Record<number, string> = {
    1: "08:00 09:20",
    2: "09:40 11:00",
    3: "11:20 12:40",
    4: "13:00 14:20",
    5: "14:40 16:00",
    6: "16:20 17:40",
  };
  return times[number] || "—";
}