import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent implements OnInit {
  admin: any = {}; // Store admin data
  originalAdmin: any = {}; // Backup for canceling edits
  notifications: any[] = [];
  showNotifications = false;
  isEditing = false; // Toggle for edit mode
  API_BASE_URL = 'http://your-backend-url/api/admins'; // Update with your actual API URL

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    // Load admin data and notifications
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    this.originalAdmin = { ...this.admin }; // Backup original data for cancel
    this.notifications = this.notificationService.getNotifications();
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.notificationService.markAllAsRead();
    }
  }

  toggleEdit() {
    if (this.isEditing) {
      this.saveProfile();
    } else {
      this.isEditing = true;
    }
  }

  // Updated method to handle the input event correctly
  updateField(field: string, event: Event) {
    const inputElement = event.target as HTMLInputElement; // Explicitly cast event.target
    this.admin[field] = inputElement.value; // Dynamically update the field
  }

  saveProfile() {
    const adminId = this.admin._id;

    this.http.put(`${this.API_BASE_URL}/${adminId}`, this.admin).subscribe(
      (response: any) => {
        alert('Profile updated successfully!');
        localStorage.setItem('admin', JSON.stringify(response.updatedAdmin));
        this.originalAdmin = { ...this.admin }; // Update backup data
        this.isEditing = false; // Exit edit mode
      },
      (error) => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    );
  }

  cancelEdit() {
    this.admin = { ...this.originalAdmin }; // Revert to backup data
    this.isEditing = false; // Exit edit mode
  }

  goHome() {
    this.router.navigate(['/']);
  }
}

