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
    // Create the registration data payload
    const registrationData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      address: this.address,
      communityName: this.communityName,
      phoneNumber: this.phoneNumber,
      password: this.password,
    };

    // Validate required fields before making API call
    if (!this.firstName || !this.lastName || !this.email || !this.password) {
      const validationError = 'Please fill all required fields.';
      alert(validationError);
      this.notificationService.addNotification(validationError);
      return;
    }

    // Make a POST request to register the user
    this.http
      .post<{ message: string; userId?: string }>(
        `${this.API_BASE_URL}/register`,
        registrationData
      )
      .subscribe(
        (response) => {
          console.log('API Response:', response);

          if (response && response.userId) {
            alert('Registration successful! Redirecting to your profile...');
            this.notificationService.addNotification('Registration successful!');
            this.router.navigate(['/profile']); // Navigate to profile on success
          } else {
            const errorMsg = 'Registration failed! Please check your details.';
            alert(errorMsg);
            this.notificationService.addNotification(errorMsg);
          }
        },
        (error) => {
          // Handle server errors
          const serverError = 'Registration failed due to a server error.';
          console.error('Registration failed:', error);
          alert(serverError);
          this.notificationService.addNotification(serverError);
        }
      );
  }

  /**
   * Navigates back to the home page
   */
  goHome() {
    this.router.navigate(['/']); // Redirect to home
  }
}

