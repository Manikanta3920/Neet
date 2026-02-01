import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from '../../../../models/task.model';

@Component({
  selector: 'app-study-timer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './study-timer.html',
  styleUrls: ['./study-timer.css']
})
export class StudyTimer implements OnInit, OnDestroy {
  // Timer states
  readonly WORK_TIME = 25 * 60; // 25 minutes in seconds
  readonly SHORT_BREAK = 5 * 60; // 5 minutes
  readonly LONG_BREAK = 15 * 60; // 15 minutes
  
  timerMode = signal<'work' | 'shortBreak' | 'longBreak'>('work');
  timeLeft = signal(this.WORK_TIME);
  isRunning = signal(false);
  cyclesCompleted = signal(0);
  
  // Study session tracking
  selectedSubject: Subject = Subject.PHYSICS;
  sessionNotes = '';
  
  private timerInterval: any = null;
  
  subjects = Object.values(Subject);
  
  ngOnInit(): void {
    this.loadSessionState();
  }
  
  ngOnDestroy(): void {
    this.stopTimer();
    this.saveSessionState();
  }
  
  get displayTime(): string {
    const minutes = Math.floor(this.timeLeft() / 60);
    const seconds = this.timeLeft() % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  get progressPercentage(): number {
    const totalTime = this.getTotalTimeForMode();
    return ((totalTime - this.timeLeft()) / totalTime) * 100;
  }
  
  get modeLabel(): string {
    switch (this.timerMode()) {
      case 'work': return 'Study Time 📚';
      case 'shortBreak': return 'Short Break ☕';
      case 'longBreak': return 'Long Break 🌴';
      default: return 'Study Time';
    }
  }
  
  get modeIcon(): string {
    switch (this.timerMode()) {
      case 'work': return '📚';
      case 'shortBreak': return '☕';
      case 'longBreak': return '🌴';
      default: return '⏰';
    }
  }
  
  startTimer(): void {
    if (!this.isRunning()) {
      this.isRunning.set(true);
      this.timerInterval = setInterval(() => {
        if (this.timeLeft() > 0) {
          this.timeLeft.update(time => time - 1);
        } else {
          this.handleTimerComplete();
        }
      }, 1000);
    }
  }
  
  pauseTimer(): void {
    this.isRunning.set(false);
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }
  
  stopTimer(): void {
    this.pauseTimer();
    this.resetTimer();
  }
  
  resetTimer(): void {
    this.timeLeft.set(this.getTotalTimeForMode());
  }
  
  switchMode(mode: 'work' | 'shortBreak' | 'longBreak'): void {
    this.pauseTimer();
    this.timerMode.set(mode);
    this.timeLeft.set(this.getTotalTimeForMode());
  }
  
  private getTotalTimeForMode(): number {
    switch (this.timerMode()) {
      case 'work': return this.WORK_TIME;
      case 'shortBreak': return this.SHORT_BREAK;
      case 'longBreak': return this.LONG_BREAK;
      default: return this.WORK_TIME;
    }
  }
  
  private handleTimerComplete(): void {
    this.pauseTimer();
    
    // Play notification sound (browser notification)
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Timer Complete!', {
        body: `${this.modeLabel} session is complete!`,
        icon: '/assets/icon.png'
      });
    }
    
    // Vibrate if supported
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
    
    // Switch to next mode
    if (this.timerMode() === 'work') {
      this.cyclesCompleted.update(cycles => cycles + 1);
      
      if (this.cyclesCompleted() % 4 === 0) {
        this.switchMode('longBreak');
      } else {
        this.switchMode('shortBreak');
      }
      
      // Save completed study session
      this.saveCompletedSession();
    } else {
      this.switchMode('work');
    }
  }
  
  private saveCompletedSession(): void {
    const sessions = JSON.parse(localStorage.getItem('study-sessions') || '[]');
    const session = {
      id: Date.now(),
      subject: this.selectedSubject,
      duration: this.WORK_TIME / 60, // in minutes
      completedAt: new Date().toISOString(),
      notes: this.sessionNotes,
      cycles: this.cyclesCompleted()
    };
    
    sessions.push(session);
    localStorage.setItem('study-sessions', JSON.stringify(sessions));
    
    // Clear notes for next session
    this.sessionNotes = '';
  }
  
  getTodaySessions(): any[] {
    const sessions = JSON.parse(localStorage.getItem('study-sessions') || '[]');
    const today = new Date().toDateString();
    
    return sessions.filter((session: any) => 
      new Date(session.completedAt).toDateString() === today
    );
  }
  
  getTotalStudyTimeToday(): number {
    const todaySessions = this.getTodaySessions();
    return todaySessions.reduce((total: number, session: any) => total + session.duration, 0);
  }
  
  private loadSessionState(): void {
    const saved = localStorage.getItem('timer-state');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        this.timerMode.set(state.mode || 'work');
        this.timeLeft.set(state.timeLeft || this.WORK_TIME);
        this.cyclesCompleted.set(state.cycles || 0);
        this.selectedSubject = state.subject || Subject.PHYSICS;
      } catch (e) {
        console.error('Error loading timer state:', e);
      }
    }
  }
  
  private saveSessionState(): void {
    const state = {
      mode: this.timerMode(),
      timeLeft: this.timeLeft(),
      cycles: this.cyclesCompleted(),
      subject: this.selectedSubject,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('timer-state', JSON.stringify(state));
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