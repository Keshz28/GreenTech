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
  imports: [RouterModule, RoleSelectionComponent, AdminLoginComponent, UserLoginComponent, AdminRegisterComponent, FormsModule, ProfileComponent],
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
 
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
      private notificationService: NotificationService //Inject NotificationService
    ) {}
  
    onRegister() {
      const registrationData = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        address: this.address,
        communityName: this.communityName,
        phoneNumber: this.phoneNumber,
        password: this.password
      };
    
      // Store the user data in localStorage
      localStorage.setItem('user', JSON.stringify(registrationData));
    
      // Send registration request to backend
      this.http.post<{ message: string; userId?: string }>('http://localhost:3000/api/register',registrationData)
        .subscribe(response => {
          console.log('API Response:', response);
    
          // Check if the registration was successful (response contains userId)
          if (response && response.userId) {
            // Redirect to the profile page with updated data
            this.router.navigate(['/profile']);
          } else {
            const errorMsg = 'Registration Failed! Please Check Your Details.';
            alert(errorMsg);
            this.notificationService.addNotification(errorMsg);  // Add alert to notifications
          }
        }, error => {
          // Handle server error
          const serverError = 'Registration Failed Due to Server Error!!!';
          console.error('Registration failed:', error);
          alert(serverError);
          this.notificationService.addNotification(serverError);  // Add server error to notifications
        });
    }
    

    // Method to navigate back to the homepage
    goHome() {
      this.router.navigate(['/']);  // Navigate to the homepage
    }
  
}
