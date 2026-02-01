export interface SubjectProgress {
  subject: string;
  completed: number;
  total: number;
}

export interface DailyStats {
  date: string;
  totalStudyTime: number; // in minutes
  tasksCompleted: number;
}