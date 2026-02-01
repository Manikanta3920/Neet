import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task';
import { TaskItem } from '../task-item/task-item';
import { AddTaskForm } from '../add-task-form/add-task-form';
import { Task, Subject } from '../../../models/task.model';
import { QuickActions } from '../../layout/quick-actions/quick-actions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItem, AddTaskForm , QuickActions,FormsModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskList {
  private taskService = inject(TaskService);
  
  showAddForm = false;
  selectedSubject: Subject | 'All' = 'All';
  filterType: 'all' | 'pending' | 'completed' | 'revision' = 'all';

  // Public wrapper methods for template
  toggleTaskComplete(id: string) {
    this.taskService.toggleComplete(id);
  }

  toggleTaskRevise(id: string) {
    this.taskService.toggleRevise(id);
  }

  // Getter for tasks
  get tasks() {
    return this.taskService.tasks();
  }

  addTask(taskData: Omit<Task, 'id' | 'createdAt'>): void {
    this.taskService.addTask(taskData);
    this.showAddForm = false;
  }

  deleteTask(id: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id);
    }
  }

  // Replace your existing getFilteredTasks() with this enhanced version
getFilteredTasks() {
  let filtered = this.tasks;
  
  // Basic filters
  if (this.selectedSubject !== 'All') {
    filtered = filtered.filter(task => task.subject === this.selectedSubject);
  }
  
  // Filter by type
  switch (this.filterType) {
    case 'pending':
      filtered = filtered.filter(task => !task.completed);
      break;
    case 'completed':
      filtered = filtered.filter(task => task.completed);
      break;
    case 'revision':
      filtered = filtered.filter(task => task.toRevise);
      break;
  }
  
  // Search query
  if (this.searchQuery.trim()) {
    const query = this.searchQuery.toLowerCase();
    filtered = filtered.filter(task => 
      task.title.toLowerCase().includes(query) ||
      task.notes?.toLowerCase().includes(query) ||
      task.subject.toLowerCase().includes(query)
    );
  }
  
  // Advanced filters (ADD THESE NEW PROPERTIES TO YOUR CLASS)
  if (this.selectedPriority !== 'All') {
    filtered = filtered.filter(task => task.priority === this.selectedPriority);
  }
  
  if (this.selectedDuration !== 'All') {
    switch (this.selectedDuration) {
      case 'short':
        filtered = filtered.filter(task => task.duration <= 30);
        break;
      case 'medium':
        filtered = filtered.filter(task => task.duration > 30 && task.duration <= 90);
        break;
      case 'long':
        filtered = filtered.filter(task => task.duration > 90);
        break;
    }
  }
  
  return filtered;
}

// Add these new properties to your TaskList class (if not already there)
searchQuery = '';
showAdvancedFilters = false;
selectedPriority: string = 'All';
selectedDuration: string = 'All';

// Add these helper methods
clearFilters(): void {
  this.selectedSubject = 'All';
  this.filterType = 'all';
  this.searchQuery = '';
  this.selectedPriority = 'All';
  this.selectedDuration = 'All';
  this.showAdvancedFilters = false;
}

applyFilters(): void {
  // Filters are already applied reactively, this is just for UI feedback
  this.showAdvancedFilters = false;
}

  getTaskStats() {
    const allTasks = this.tasks;
    return {
      total: allTasks.length,
      completed: allTasks.filter(t => t.completed).length,
      pending: allTasks.filter(t => !t.completed).length,
      revision: allTasks.filter(t => t.toRevise).length,
      totalStudyTime: allTasks.reduce((sum, task) => sum + task.duration, 0) / 60
    };
  }
  // Add this simpler version if you just need basic sorting
sortTasks(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const sortBy = selectElement.value;
  
  console.log('Sorting by:', sortBy);
  alert(`Sorting by ${sortBy} - This feature will be implemented in the next update!`);
  
  // Temporary: Just update the UI to show sorting is happening
  // You can implement actual sorting logic later
}
}