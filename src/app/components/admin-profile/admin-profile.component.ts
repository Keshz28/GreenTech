import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent implements OnInit {
  admin: any; // To store the admin data
  notifications: any[] = [];
  showNotifications = false;

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    this.notifications = this.notificationService.getNotifications();
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.notificationService.markAllAsRead();
    }
  }

  getNotificationCount() {
    return this.notifications.length;
  }

  editProfile() {
    this.router.navigate(['/edit-admin-profile']);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
