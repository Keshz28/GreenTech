import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RoleSelectionComponent } from '../role-selection/role-selection.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-admin-register',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    RoleSelectionComponent,
    AdminLoginComponent,
    UserLoginComponent,
    UserRegisterComponent,
  ],
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css'],
})
export class AdminRegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  address: string = '';
  communityName: string = '';
  phoneNumber: string = '';
  password: string = '';

  private readonly API_BASE_URL = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  onRegister() {
    const adminData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      address: this.address,
      communityName: this.communityName,
      phoneNumber: this.phoneNumber,
      password: this.password,
    };

    localStorage.setItem('user', JSON.stringify(registerLocaleData));

    this.http
      .post<{ message: string; adminId?: string }>(
        `${this.API_BASE_URL}/admin/register`,
        adminData
      )
      .subscribe(
        (response) => {
          console.log(response.message);
          if (response.adminId) {
            alert('Registration successful!');
            this.notificationService.addNotification('Admin registered successfully!');
            this.router.navigate(['/admin-dashboard']);
          } else {
            const failMsg = 'Registration Failed!!! An Accounting Error Had Been Occurred!';
            alert(failMsg);
            this.notificationService.addNotification(failMsg);
          }
        },
        (error) => {
          const serverErrorMsg = 'Registration Failed Due To Server Error!!!';
          console.error('Registration failed:', error);
          alert(serverErrorMsg);
          this.notificationService.addNotification(serverErrorMsg);
        }
      );
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
