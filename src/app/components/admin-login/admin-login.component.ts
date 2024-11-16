import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RoleSelectionComponent } from '../role-selection/role-selection.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { AdminRegisterComponent } from '../admin-register/admin-register.component';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    RoleSelectionComponent,
    UserLoginComponent,
    UserRegisterComponent,
    AdminRegisterComponent,
  ],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';

  private readonly API_BASE_URL = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  onLogin() {
    if (!this.email || !this.password) {
      const missingFieldsMsg = 'Please Enter Both Email and Password!';
      alert(missingFieldsMsg);
      this.notificationService.addNotification(missingFieldsMsg);
      return;
    }

    const loginData = { email: this.email, password: this.password };

    localStorage.setItem('user', JSON.stringify(loginData));

    this.http
      .post<{ message: string; adminId?: string; token?: string }>(
        `${this.API_BASE_URL}/admin/login`,
        loginData
      )
      .subscribe(
        (response) => {
          console.log(response.message);
          if (response.adminId && response.token) {
            localStorage.setItem('authToken', response.token);
            alert('Login successful!');
            this.notificationService.addNotification('Admin logged in successfully!');
            this.router.navigate(['/admin-dashboard']);
          } else {
            const failMsg = 'Login Failed!!! Please Check Your Credentials!';
            alert(failMsg);
            this.notificationService.addNotification(failMsg);
          }
        },
        (error) => {
          const serverErrorMsg = 'Login Failed Due To Server Error!!!';
          console.error('Login failed:', error);
          alert(serverErrorMsg);
          this.notificationService.addNotification(serverErrorMsg);
        }
      );
  }

  goHome() {
    this.router.navigate(['/']);
  }
}

