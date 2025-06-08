import { api } from "./base";

export const getGrades = () => api.get("/student/grades");