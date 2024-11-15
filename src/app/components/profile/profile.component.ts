import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Router for navigation
import { NotificationService } from '../../services/notification.service';  // Import the NotificationService
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [UserRegisterComponent, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;  // To store the user data
  notifications: any[] = [];  // Array to store notifications
  showNotifications = false;

  constructor(
    private router: Router,  // Inject Router for navigation
    private notificationService: NotificationService  // Inject NotificationService for notifications
  ) {}

  ngOnInit() {
    // Fetch user data from localStorage after registration
    const storedUser = localStorage.getItem('user');  // Check if there is any user stored in localStorage
    if (storedUser) {
      this.user = JSON.parse(storedUser);  // Parse the stored user data
    } else {
      // If no user is found in localStorage, navigate back to the registration or login page
      this.router.navigate(['/user-register']);
    }

    // Load notifications from the notification service
    this.notifications = this.notificationService.getNotifications();
  }

  // Toggle notification visibility
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    const notificationPopup = document.querySelector('.notification-popup');
    if (this.showNotifications) {
      this.notificationService.markAllAsRead();  // Mark all notifications as read when opened
    }
  }

  // Method to get the count of unread notifications
  getNotificationCount() {
    return this.notificationService.getUnreadCount();  // Get the number of unread notifications
  }

  // Navigate to the edit profile page (you can define this route separately)
  editProfile() {
    this.router.navigate(['/edit-profile']);  // Adjust the route as needed
  }

  // Navigate back to the home page
  goHome() {
    this.router.navigate(['/']);  // Navigate to the home page
  }
}
