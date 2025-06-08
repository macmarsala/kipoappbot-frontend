import { api } from "./base";

export const getWeekSchedule = () => api.get("/student/schedule/week");

export const getTodaySchedule = () => api.get("/student/schedule/today");