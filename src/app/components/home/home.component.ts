import { Component, OnInit, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { RoleSelectionComponent } from '../role-selection/role-selection.component';
import { NotificationService, Notification } from '../../services/notification.service'; // Import Notification interface
import { UserRegisterComponent } from '../user-register/user-register.component';
import { ReportsComponent } from '../reports/reports.component';
import { AdminRegisterComponent } from '../admin-register/admin-register.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, AdminLoginComponent, UserLoginComponent, RoleSelectionComponent, ReportsComponent, UserRegisterComponent, AdminRegisterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showNotifications = false;
  notifications: Notification[] = []; // Array to hold notifications
  unreadCount = 0;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    // Fetch notifications from the service when the component initializes
    this.notifications = this.notificationService.getNotifications();

    // Add the stagnant notification at the top (always displayed, not counted as unread)
    this.notifications.unshift({
      message: 'You have a new update!', // Stagnant message
      timestamp: new Date(), // You can use any timestamp, here it's the current time
      read: true // Mark this as read so it's not included in unread count
    });

    // Calculate the unread count (dynamic notifications only)
    this.unreadCount = this.notificationService.getUnreadCount();
  }

  // Toggle notification visibility
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;

    if (this.showNotifications) {
      this.markAllAsRead();
    }
  }

  // Mark all notifications as read
  markAllAsRead() {
    this.unreadCount = 0; // Reset unread count
    this.notificationService.markAllAsRead(); // Mark all notifications as read in the service
  }

  // HostListener to detect clicks outside the notification popup
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isClickInsideNotification = target.closest('.notification-popup');
    const isClickOnBellIcon = target.closest('.notification-icon');

    if (!isClickInsideNotification && !isClickOnBellIcon && this.showNotifications) {
      this.showNotifications = false;
    }
  }

  
}

