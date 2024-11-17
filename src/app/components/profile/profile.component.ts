import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Router for navigation
import { HttpClient } from '@angular/common/http'; // For API calls
import { NotificationService } from '../../services/notification.service'; // Import NotificationService
import { FormsModule } from '@angular/forms'; // Import FormsModule for [(ngModel)] binding
import { CommonModule } from '@angular/common'; // Keep your original imports
import { UserRegisterComponent } from '../user-register/user-register.component'; // Keep your original imports
import { RouterModule } from '@angular/router'; // Keep your original imports

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    UserRegisterComponent,
    RouterModule,
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {}; // To store the user data
  notifications: any[] = []; // Array to store notifications
  showNotifications = false;
  isEditing = false; // Toggle for edit mode
  private readonly API_BASE_URL = 'http://localhost:3000/api/users';

  constructor(
    private router: Router, // Inject Router for navigation
    private http: HttpClient, // For making HTTP requests
    private notificationService: NotificationService // Inject NotificationService
  ) {}

  ngOnInit() {
    // Fetch user data from localStorage after registration
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    } else {
      this.router.navigate(['/user-register']); // Redirect if no user is found
    }

    // Load notifications from the notification service
    this.notifications = this.notificationService.getNotifications();
  }

  // Toggle notification visibility
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.notificationService.markAllAsRead(); // Mark all notifications as read
    }
  }

  


  // Method to start editing the profile
  editProfile() {
    this.isEditing = true; // Enable edit mode
  }

  // Save profile changes
  saveProfile() {
    const userId = this.user._id;

    this.http.put(`${this.API_BASE_URL}/${userId}`, this.user).subscribe(
      (response: any) => {
        alert('Profile updated successfully!');
        localStorage.setItem('user', JSON.stringify(response.updatedUser)); // Update localStorage
        this.isEditing = false; // Exit edit mode
      },
      (error) => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    );
  }

  // Navigate back to the home page
  goHome() {
    this.router.navigate(['/']);
  }
}
