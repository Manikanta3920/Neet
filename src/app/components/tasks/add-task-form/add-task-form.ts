import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task, Subject, Priority } from '../../../models/task.model';

@Component({
  selector: 'app-add-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task-form.html',
  styleUrls: ['./add-task-form.css']
})
export class AddTaskForm {
  @Output() taskAdded = new EventEmitter<Omit<Task, 'id' | 'createdAt'>>();
  @Output() cancel = new EventEmitter<void>();

  subjects = Object.values(Subject);
  priorities = Object.values(Priority);

  newTask: Omit<Task, 'id' | 'createdAt'> = {
    title: '',
    subject: Subject.PHYSICS,
    priority: Priority.MEDIUM,
    duration: 60,
    dueDate: '',
    completed: false,
    notes: '',
    toRevise: false
  };

  onSubmit(): void {
    if (this.newTask.title.trim()) {
      this.taskAdded.emit({
        ...this.newTask,
        dueDate: this.newTask.dueDate || undefined
      });
      this.resetForm();
    }
  }

  resetForm(): void {
    this.newTask = {
      title: '',
      subject: Subject.PHYSICS,
      priority: Priority.MEDIUM,
      duration: 60,
      dueDate: '',
      completed: false,
      notes: '',
      toRevise: false
    };
  }

  getSubjectColor(subject: Subject): string {
    const colors: Record<Subject, string> = {
      [Subject.PHYSICS]: '#FF6B6B',
      [Subject.CHEMISTRY]: '#4ECDC4',
      [Subject.BOTANY]: '#45B7D1',
      [Subject.ZOOLOGY]: '#96CEB4',
      [Subject.GENERAL]: '#FFEAA7'
    };
    return colors[subject];
  }
}