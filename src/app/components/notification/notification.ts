import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, AppNotification } from '../../services/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (currentNotification) {
      <div class="fixed bottom-12 right-12 z-[200] animate-fade-in">
        <div [ngClass]="{
          'bg-brand-slate border-brand-gold/40': currentNotification.type === 'success',
          'bg-red-900 border-red-500/40': currentNotification.type === 'error',
          'bg-brand-emerald border-brand-paper/20': currentNotification.type === 'info'
        }" class="flex items-center gap-6 px-8 py-4 border shadow-2xl backdrop-blur-md">
          <div class="w-1 h-8 bg-brand-gold"></div>
          <div>
            <h4 class="text-brand-gold text-[8px] font-bold uppercase tracking-[0.4em] mb-1">El Faro Notifica</h4>
            <p class="text-brand-paper font-serif italic text-lg">{{ currentNotification.message }}</p>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class NotificationComponent implements OnInit {
  currentNotification: AppNotification | null = null;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notifications$.subscribe(notif => {
      this.currentNotification = notif;
      setTimeout(() => {
        this.currentNotification = null;
      }, 4000);
    });
  }
}
