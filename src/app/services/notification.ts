import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AppNotification {
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<AppNotification>();
  notifications$ = this.notificationSubject.asObservable();

  show(message: string, type: 'success' | 'error' | 'info' = 'success') {
    this.notificationSubject.next({ message, type });
  }
}
