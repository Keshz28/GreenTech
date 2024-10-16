import { Injectable } from '@angular/core';

// Notification model (you can move this to a separate file if needed)
export interface Notification {
  message: string;
  timestamp: Date;
  read: boolean; // Mark whether the notification is read
}

@Injectable({
  providedIn: 'root' // This means the service is available throughout your app
})
export class NotificationService {
  // Array to hold the notifications
  private notifications: Notification[] = [];

  // Method to retrieve all notifications
  getNotifications() {
    return this.notifications;
  }

  // Method to add a new notification with the current timestamp
  addNotification(message: string) {
    const newNotification: Notification = {
      message,
      timestamp: new Date(),
      read: false // By default, all new notifications are unread
    };
    this.notifications.push(newNotification);
  }

  // Method to clear all notifications
  clearNotifications() {
    this.notifications = [];
  }

  // Method to mark all notifications as read
  markAllAsRead() {
    this.notifications.forEach(notification => {
      notification.read = true;
    });
  }

  // Method to get unread notifications count
  getUnreadCount() {
    return this.notifications.filter(notification => !notification.read).length;
  }
}
