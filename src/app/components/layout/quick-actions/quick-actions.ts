import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-actions.html',
  styleUrls: ['./quick-actions.css']
})
export class QuickActions {
  actions = [
    { 
      icon: '⚡', 
      label: 'Quick Task', 
      color: '#FF6B6B',
      action: () => this.addQuickTask()
    },
    { 
      icon: '⏰', 
      label: 'Start Timer', 
      color: '#4ECDC4',
      action: () => this.router.navigate(['/timer'])
    },
    { 
      icon: '📊', 
      label: 'Today\'s Stats', 
      color: '#45B7D1',
      action: () => this.showTodayStats()
    },
    { 
      icon: '🔔', 
      label: 'Set Reminder', 
      color: '#FFD166',
      action: () => this.setReminder()
    },
    { 
      icon: '🎯', 
      label: 'Daily Goal', 
      color: '#8a2be2',
      action: () => this.setDailyGoal()
    }
  ];

  constructor(private router: Router) {}

  addQuickTask(): void {
    // Quick task modal or redirect
    this.router.navigate(['/tasks'], { queryParams: { quickAdd: 'true' } });
  }

  showTodayStats(): void {
    // Show today's statistics
    const tasksCompleted = 5; // Example - get from service
    const studyTime = 3.5; // Example
    alert(`📊 Today's Progress:\n✅ ${tasksCompleted} tasks completed\n⏰ ${studyTime} hours studied\n🔥 Keep up the good work!`);
  }

  setReminder(): void {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        this.scheduleReminder();
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            this.scheduleReminder();
          }
        });
      }
    }
  }

  private scheduleReminder(): void {
    // Schedule a study reminder for 1 hour from now
    setTimeout(() => {
      new Notification('⏰ Study Reminder', {
        body: 'Time for another study session! Take a quick 25-minute Pomodoro.',
        icon: '/assets/icon.png'
      });
    }, 60 * 60 * 1000); // 1 hour
    
    alert('⏰ Reminder set for 1 hour from now!');
  }

  setDailyGoal(): void {
    const goal = prompt('Set your daily study goal (in hours):', '4');
    if (goal && !isNaN(Number(goal))) {
      localStorage.setItem('dailyGoal', goal);
      alert(`🎯 Daily goal set to ${goal} hours! You've got this!`);
    }
  }
}