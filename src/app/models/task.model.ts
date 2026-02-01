export enum Subject {
  PHYSICS = 'Physics',
  CHEMISTRY = 'Chemistry',
  BOTANY = 'Botany',
  ZOOLOGY = 'Zoology',
  GENERAL = 'General'
}

export enum Priority {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

export interface Task {
  id: string;
  title: string;
  subject: Subject;
  priority: Priority;
  duration: number; // in minutes
  dueDate?: string; // optional deadline
  completed: boolean;
  createdAt: Date;
  notes?: string;
  toRevise: boolean;
}