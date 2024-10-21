import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Router for navigation
import { NotificationService } from '../../services/notification.service';  // Import the NotificationService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  admin: any;  // To store the admin data
  notifications: any[] = [];  // Array to store notifications
  showNotifications = false;

  constructor(
    private router: Router,  // Inject Router for navigation
    private notificationService: NotificationService  // Inject NotificationService for notifications
  ) {}

  ngOnInit() {
    // Fetch admin data from localStorage (just like how the user data is stored)
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');

    // Load notifications from the service
    this.notifications = this.notificationService.getNotifications();
  }

  // Toggle notification visibility
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.notificationService.markAllAsRead();  // Mark all notifications as read when opened
    }
  }

  // Method to get the count of notifications
  getNotificationCount() {
    return this.notifications.length;
  }

  // Navigate to edit profile page for admin (you'll need to set up this route)
  editProfile() {
    this.router.navigate(['/edit-admin-profile']);  // Adjust the route as needed
  }
 // Go back to home page
 goHome() {
  this.router.navigate(['/']);  // Navigate to the home page
}
}
