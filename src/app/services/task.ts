import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Task, Subject, Priority } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSignal = signal<Task[]>([]);
  tasks = this.tasksSignal.asReadonly();

  private readonly STORAGE_KEY = 'for-her-tasks';
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    this.loadTasks();
  }

  private loadTasks(): void {
    if (this.isBrowser) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        try {
          const tasks = JSON.parse(stored);
          const parsedTasks = tasks.map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt),
            dueDate: task.dueDate ? new Date(task.dueDate) : undefined
          }));
          this.tasksSignal.set(parsedTasks);
          return;
        } catch (error) {
          console.error('Error loading tasks:', error);
        }
      }
    }
    // Default tasks if no localStorage or SSR
    this.tasksSignal.set(this.getDefaultTasks());
  }

  private saveTasks(): void {
    if (this.isBrowser) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasksSignal()));
    }
  }

  private getDefaultTasks(): Task[] {
    return [
      {
        id: this.generateId(),
        title: 'Revise Organic Chemistry - Name Reactions',
        subject: Subject.CHEMISTRY,
        priority: Priority.HIGH,
        duration: 120,
        dueDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
        completed: false,
        createdAt: new Date(),
        notes: 'Focus on mechanisms',
        toRevise: true
      },
      {
        id: this.generateId(),
        title: 'Solve Physics Optics PYQs',
        subject: Subject.PHYSICS,
        priority: Priority.HIGH,
        duration: 90,
        dueDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        completed: true,
        createdAt: new Date(Date.now() - 86400000),
        notes: 'Last 5 years',
        toRevise: false
      },
      {
        id: this.generateId(),
        title: 'Study Human Physiology - Circulatory System',
        subject: Subject.ZOOLOGY,
        priority: Priority.MEDIUM,
        duration: 60,
        completed: false,
        createdAt: new Date(),
        notes: 'Important for NEET',
        toRevise: false
      }
    ];
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  // CRUD Operations
  addTask(task: Omit<Task, 'id' | 'createdAt'>): void {
    const newTask: Task = {
      ...task,
      id: this.generateId(),
      createdAt: new Date()
    };
    this.tasksSignal.update(tasks => [...tasks, newTask]);
    this.saveTasks();
  }

  updateTask(id: string, updates: Partial<Task>): void {
    this.tasksSignal.update(tasks =>
      tasks.map(task => task.id === id ? { ...task, ...updates } : task)
    );
    this.saveTasks();
  }

  deleteTask(id: string): void {
    this.tasksSignal.update(tasks => tasks.filter(task => task.id !== id));
    this.saveTasks();
  }

  toggleComplete(id: string): void {
    this.tasksSignal.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    this.saveTasks();
  }

  toggleRevise(id: string): void {
    this.tasksSignal.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, toRevise: !task.toRevise } : task
      )
    );
    this.saveTasks();
  }

  // Filter methods
  getTasksBySubject(subject: Subject): Task[] {
    return this.tasksSignal().filter(task => task.subject === subject);
  }

  getHighPriorityTasks(): Task[] {
    return this.tasksSignal().filter(task => task.priority === Priority.HIGH);
  }

  getTasksDueToday(): Task[] {
    const today = new Date().toDateString();
    return this.tasksSignal().filter(task => 
      task.dueDate && new Date(task.dueDate).toDateString() === today
    );
  }
}