export type GradeItem = {
  id: number;
  grade_type: string;
  grade: string; // было: grade_value
  date: string; // было: graded_at
  subject_name: string; // было: subject
};
