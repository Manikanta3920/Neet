import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task';
import { Subject } from '../../../models/task.model';

@Component({
  selector: 'app-progress-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-tracker.html',
  styleUrls: ['./progress-tracker.css']
})
export class ProgressTracker {
  private taskService = inject(TaskService);
  
  subjects = Object.values(Subject);
  
  getSubjectStats() {
    const tasks = this.taskService.tasks();
    
    return this.subjects.map(subject => {
      const subjectTasks = tasks.filter(task => task.subject === subject);
      const total = subjectTasks.length;
      const completed = subjectTasks.filter(t => t.completed).length;
      const pending = total - completed;
      const revision = subjectTasks.filter(t => t.toRevise).length;
      const totalTime = subjectTasks.reduce((sum, task) => sum + task.duration, 0) / 60; // hours
      
      return {
        subject,
        total,
        completed,
        pending,
        revision,
        totalTime,
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
        color: this.getSubjectColor(subject)
      };
    });
  }
  
  getOverallStats() {
    const tasks = this.taskService.tasks();
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const totalTime = tasks.reduce((sum, task) => sum + task.duration, 0) / 60; // hours
    const avgTimePerTask = total > 0 ? totalTime / total : 0;
    
    // Study streak (simplified - counts consecutive days with completed tasks)
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const todayTasks = tasks.filter(t => 
      t.completed && new Date(t.createdAt).toDateString() === today.toDateString()
    );
    const yesterdayTasks = tasks.filter(t => 
      t.completed && new Date(t.createdAt).toDateString() === yesterday.toDateString()
    );
    
    const streak = (todayTasks.length > 0 ? 1 : 0) + (yesterdayTasks.length > 0 ? 1 : 0);
    
    return { 
      total, 
      completed, 
      pending, 
      totalTime: Math.round(totalTime * 10) / 10,
      avgTimePerTask: Math.round(avgTimePerTask * 10) / 10,
      streak 
    };
  }
  
  getPriorityStats() {
    const tasks = this.taskService.tasks();
    const high = tasks.filter(t => t.priority === 'High').length;
    const medium = tasks.filter(t => t.priority === 'Medium').length;
    const low = tasks.filter(t => t.priority === 'Low').length;
    
    return { high, medium, low };
  }
  
  private getSubjectColor(subject: Subject): string {
    const colors: Record<Subject, string> = {
      [Subject.PHYSICS]: '#FF6B6B',
      [Subject.CHEMISTRY]: '#4ECDC4',
      [Subject.BOTANY]: '#45B7D1',
      [Subject.ZOOLOGY]: '#96CEB4',
      [Subject.GENERAL]: '#FFEAA7'
    };
    return colors[subject];
  }
  
  exportData() {
    const data = {
      tasks: this.taskService.tasks(),
      exportedAt: new Date().toISOString(),
      app: 'For-Her NEET Planner'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neet-study-plan-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
  // Add this method to your existing ProgressTracker class
importData(event: Event): void {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target?.result as string);
      
      // Validate the imported data
      if (data.app === 'For-Her NEET Planner' && Array.isArray(data.tasks)) {
        if (confirm('Importing will replace your current tasks. Continue?')) {
          // Clear existing tasks
          const taskService = inject(TaskService);
          const currentTasks = taskService.tasks();
          currentTasks.forEach(task => taskService.deleteTask(task.id));
          
          // Add imported tasks
          data.tasks.forEach((task: any) => {
            taskService.addTask({
              title: task.title,
              subject: task.subject,
              priority: task.priority,
              duration: task.duration,
              dueDate: task.dueDate,
              completed: task.completed,
              notes: task.notes,
              toRevise: task.toRevise
            });
          });
          
          alert(`Successfully imported ${data.tasks.length} tasks!`);
        }
      } else {
        alert('Invalid file format. Please import a valid For-Her study plan file.');
      }
    } catch (error) {
      alert('Error reading file. Please make sure it\'s a valid JSON file.');
    }
    
    // Reset file input
    input.value = '';
  };
  
  reader.readAsText(file);
}

}