import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Router for navigation
import { HttpClient } from '@angular/common/http';  // HttpClient for making API calls
import { FormsModule } from '@angular/forms';  // FormsModule for ngModel binding
import { RouterModule } from '@angular/router';
import { RoleSelectionComponent } from '../role-selection/role-selection.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { AdminRegisterComponent } from '../admin-register/admin-register.component';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, RouterModule, RoleSelectionComponent, UserLoginComponent, UserRegisterComponent, AdminRegisterComponent],  // Import FormsModule for ngModel
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService  // Inject NotificationService
  ) {}

  // Handle the login logic
  onLogin() {
    if (this.email && this.password) {
      const loginData = { email: this.email, password: this.password };

      // Send login request to the backend
      this.http.post<{ message: string; adminId?: string }>('http://localhost:3000/api/admin/login', loginData)
        .subscribe(response => {
          console.log(response.message);
          if (response.adminId) {
            // Redirect to dashboard on successful login
            this.router.navigate(['/admin-dashboard']);
          } else {
            const failMsg = 'Login Failed!!! Please Check Your Credentials!';
            alert(failMsg);
            this.notificationService.addNotification(failMsg);  // Add alert to notification service
          }
        }, error => {
          const serverErrorMsg = 'Login Failed Due To Server Error!!!';
          console.error('Login failed:', error);
          alert(serverErrorMsg);
          this.notificationService.addNotification(serverErrorMsg);  // Add server error to notification service
        });
    } else {
      const missingFieldsMsg = 'Please Enter Both Email and Password!';
      alert(missingFieldsMsg);
      this.notificationService.addNotification(missingFieldsMsg);  // Add alert to notification service
    }
  }

  // Navigate back to the home page
  goHome() {
    this.router.navigate(['/']);
  }
}
