import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/tasks/task-list/task-list').then(m => m.TaskList),
  },
  {
    path: 'progress',
    loadComponent: () => import('./components/progress/progress-tracker/progress-tracker').then(m => m.ProgressTracker),
  },
  {
    path: 'timer',
    loadComponent: () => import('./components/motivation/countdown-timer/study-timer/study-timer').then(m => m.StudyTimer),
  },
  { path: '**', redirectTo: '' }
];