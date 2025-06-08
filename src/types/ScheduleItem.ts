// src/types/ScheduleItem.ts
export interface ScheduleItem {
  id: number;
  subject: string;
  teacher: string;
  classroom: string;
  lesson_number: number;
  lesson_date: string; // ISO-строка
  lesson_type: string;
}
