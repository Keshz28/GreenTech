import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Notification {
  message: string;
  timestamp: Date;
  read: boolean;
}

interface AdminData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phoneNumber: string;
  address: string;
  communityName: string;
}

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AdminProfileComponent {
  admin: AdminData = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@greentech.com',
    role: 'System Administrator',
    phoneNumber: '+1 (555) 123-4567',
    address: '123 Green Street, Eco City',
    communityName: 'GreenTech Community'
  };
  
  notifications: Notification[] = [
    {
      message: 'Welcome to GreenTech Admin Panel',
      timestamp: new Date(),
      read: false
    }
  ];
  
  isLoading = false;
  isEditing = false;
  showNotifications = false;

  constructor(private router: Router) {}

  updateField(field: keyof AdminData, event: Event) {
    const target = event.target as HTMLInputElement;
    this.admin[field] = target.value;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  goHome() {
    this.router.navigate(['/']);
  }
}