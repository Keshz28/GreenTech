import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoleSelectionComponent } from '../role-selection/role-selection.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { AdminRegisterComponent } from '../admin-register/admin-register.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [
    RouterModule,
    RoleSelectionComponent,
    AdminLoginComponent,
    UserLoginComponent,
    AdminRegisterComponent,
    FormsModule,
    ProfileComponent,
  ],
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {
  // Base URL for the backend API
  private readonly API_BASE_URL = 'http://localhost:3000/api';

  // Form fields
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  address: string = '';
  communityName: string = '';
  phoneNumber: string = '';
  password: string = '';

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private notificationService: NotificationService
  ) {}

  /**
   * Handles user registration
   */
  onRegister() {
    // Add form validation before submission
    if (!this.validateForm()) {
      this.notificationService.addNotification('Please fill all required fields');
      return;
    }
  
    // Validate email format
    if (!this.isValidEmail(this.email)) {
      this.notificationService.addNotification('Invalid email format');
      return;
    }
  
    const userData = {
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      email: this.email.trim().toLowerCase(),
      address: this.address.trim(),
      phoneNumber: this.phoneNumber.trim(),
      password: this.password,
      role: 'user'
    };
  
    this.http.post<any>(`${this.API_BASE_URL}/users/register`, userData)
      .subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.notificationService.addNotification('Registration successful!');
          this.router.navigate(['/user-login']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          const errorMessage = error.error?.message || 'Registration failed. Please try again.';
          this.notificationService.addNotification(errorMessage);
        }
      });
  }
  
  validateForm(): boolean {
    return !!(
      this.firstName?.trim() && 
      this.lastName?.trim() && 
      this.email?.trim() && 
      this.password &&
      this.password.length >= 6
    );
  }
  
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email?.trim());
  }
  
  
  /**
   * Navigates back to the home page
   */
  goHome() {
    this.router.navigate(['/']); // Redirect to home
  }
}

