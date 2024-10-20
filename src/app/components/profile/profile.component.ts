import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Router for navigation
import { NotificationService } from '../../services/notification.service';  // Import the NotificationService

@Component({
  selector: 'app-profile',
  standalone: true,
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
    // Fetch user data from localStorage for now (just like you store registration data)
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

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

  // Navigate to edit profile page (you'll need to set up this route if you have it)
  editProfile() {
    this.router.navigate(['/edit-profile']);  // Adjust the route as needed
  }

  // Go back to home page
  goHome() {
    this.router.navigate(['/']);  // Navigate to the home page
  }
}
