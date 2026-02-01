import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, Subject, Priority } from '../../../models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.html',
  styleUrls: ['./task-item.css']
})
export class TaskItem {
  @Input() task!: Task;
  @Output() toggleComplete = new EventEmitter<string>();
  @Output() toggleRevise = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Task>();

  Subject = Subject;
  Priority = Priority;

  getSubjectColor(subject: Subject): string {
    const colors: Record<Subject, string> = {
      [Subject.PHYSICS]: '#FF6B6B',
      [Subject.CHEMISTRY]: '#4ECDC4',
      [Subject.BOTANY]: '#45B7D1',
      [Subject.ZOOLOGY]: '#96CEB4',
      [Subject.GENERAL]: '#FFEAA7'
    };
    return colors[subject] || '#CCCCCC';
  }

  getPriorityIcon(priority: Priority): string {
    const icons = {
      [Priority.HIGH]: '🔥',
      [Priority.MEDIUM]: '⚡',
      [Priority.LOW]: '🌱'
    };
    return icons[priority];
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  }

  formatDate(dateString?: string): string {
    if (!dateString) return 'No deadline';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short' 
    });
  }
}