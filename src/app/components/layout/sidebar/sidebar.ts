import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TaskService } from '../../../services/task';
import { Subject } from '../../../models/task.model';

export interface SubjectProgress {
  name: string;
  color: string;
  icon: string;
  progress: number;
  total: number;
  completed: number;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {
  private taskService = inject(TaskService);
  
  navLinks = [
    { name: 'Tasks', icon: '📋', route: '/tasks' },
    { name: 'Progress', icon: '📊', route: '/progress' },
    { name: 'Study Timer', icon: '⏰', route: '/timer' }
  ];

  selectedSubject: string = 'All';
  selectedNav: string = 'Tasks';

  // Get real subject progress from tasks
  get subjects(): SubjectProgress[] {
    const tasks = this.taskService.tasks();
    
    // Define subject configurations
    const subjectConfigs = [
      { name: 'Physics', color: '#FF6B6B', icon: '⚛️' },
      { name: 'Chemistry', color: '#4ECDC4', icon: '🧪' },
      { name: 'Botany', color: '#45B7D1', icon: '🌿' },
      { name: 'Zoology', color: '#96CEB4', icon: '🐾' },
      { name: 'General', color: '#FFEAA7', icon: '📘' }
    ];
    
    return subjectConfigs.map(config => {
      const subjectTasks = tasks.filter(task => task.subject === config.name);
      const total = subjectTasks.length;
      const completed = subjectTasks.filter(t => t.completed).length;
      
      // Calculate progress percentage
      const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      return {
        ...config,
        progress,
        total,
        completed
      };
    });
  }

  // Get today's real stats
  get todayStats() {
    const tasks = this.taskService.tasks();
    const today = new Date().toDateString();
    
    const todayTasks = tasks.filter(task => {
      const taskDate = new Date(task.createdAt).toDateString();
      return taskDate === today;
    });
    
    const completedToday = todayTasks.filter(t => t.completed).length;
    const totalStudyTime = todayTasks.reduce((sum, task) => sum + task.duration, 0);
    
    return {
      tasksDone: completedToday,
      studyTime: this.formatStudyTime(totalStudyTime)
    };
  }

  selectSubject(subject: string): void {
    this.selectedSubject = subject;
    // Optional: Emit event or filter tasks by this subject
  }

  selectNav(navName: string): void {
    this.selectedNav = navName;
  }

  private formatStudyTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  }
}