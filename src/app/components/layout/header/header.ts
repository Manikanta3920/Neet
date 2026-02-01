import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit, OnDestroy {
  appName = 'For-Her';
  daysToNEET = 0;
  
  motivationalQuotes = [
    "Your future NEET rank is being written with every page you turn today.",
    "3 months can change everything. Stay consistent!",
    "Every great doctor was once a dedicated NEET aspirant like you.",
    "The pain of studying is temporary, but the pride of success is permanent.",
    "NEET is not just an exam, it's the gateway to your medical dreams.",
    "One hour of focused study is worth five hours of distracted reading.",
    "Your MBBS seat is waiting for you. Keep going!",
    "Small daily improvements lead to staggering long-term results."
  ];
  
  currentQuote = '';
  private timer: any;

  // NEET is typically in May each year. Let's set it to May 2026
  // But first, let's calculate the next NEET date dynamically
  private getNextNEETDate(): Date {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // NEET is usually on first Sunday of May
    // Let's calculate May 1st of next year
    let neetYear = currentYear;
    let neetDate = new Date(neetYear, 4, 1); // May 1st (month is 0-indexed: 4 = May)
    
    // Find first Sunday of May
    while (neetDate.getDay() !== 0) { // 0 = Sunday
      neetDate.setDate(neetDate.getDate() + 1);
    }
    
    // If this year's NEET has passed, use next year's
    if (neetDate < now) {
      neetYear = currentYear + 1;
      neetDate = new Date(neetYear, 4, 1);
      while (neetDate.getDay() !== 0) {
        neetDate.setDate(neetDate.getDate() + 1);
      }
    }
    
    return neetDate;
  }

  ngOnInit(): void {
    this.updateCountdown();
    this.updateQuote();
    
    // Update countdown every hour
    this.timer = setInterval(() => {
      this.updateCountdown();
    }, 3600000); // Update every hour
    
    // Update quote every 4 hours
    setInterval(() => {
      this.updateQuote();
    }, 14400000);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private updateCountdown(): void {
    const neetDate = this.getNextNEETDate();
    const now = new Date();
    const timeDiff = neetDate.getTime() - now.getTime();
    
    // Calculate days (round up to include today if exam is today)
    const days = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
    this.daysToNEET = days;
    
    console.log('NEET Date:', neetDate.toDateString());
    console.log('Days left:', days);
  }

  private updateQuote(): void {
    // Get a random quote
    const randomIndex = Math.floor(Math.random() * this.motivationalQuotes.length);
    this.currentQuote = this.motivationalQuotes[randomIndex];
  }

  // For debugging - add this method
  getNextNEETDateString(): string {
    const date = this.getNextNEETDate();
    return date.toDateString();
  }
}