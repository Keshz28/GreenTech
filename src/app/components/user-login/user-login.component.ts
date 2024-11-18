import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoleSelectionComponent } from '../role-selection/role-selection.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminRegisterComponent } from '../admin-register/admin-register.component';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [RouterModule, AdminLoginComponent, RoleSelectionComponent, FormsModule, AdminRegisterComponent, UserRegisterComponent],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent {
        private readonly API_BASE_URL = 'http://localhost:3000/api';  // Update the API endpoint to include /api prefix
  
        email: string = '';
        password: string = '';

        constructor(
          private http: HttpClient,
          private router: Router,
          private notificationService: NotificationService 
        ) {}

        onLogin() {
          const loginData = {
            email: this.email.trim(),
            password: this.password
          };

          this.http.post<any>(`${this.API_BASE_URL}/users/login`, loginData)
            .subscribe({
              next: (response) => {
                console.log('Login successful:', response);
                this.notificationService.addNotification('Login successful!');
                this.router.navigate(['/dashboard']);
              },
              error: (error) => {
                console.error('Login failed:', error);
                this.notificationService.addNotification('Invalid email or password');
              }
            });
        }
      goHome() {
        this.router.navigate(['/']);
      }
  } 
