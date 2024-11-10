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
  
    private readonly API_BASE_URL = 'http://localhost:3000';  // Define base URL here
  
    email: string = '';
    password: string = '';
  
    constructor(
      private http: HttpClient,
      private router: Router,
      private notificationService: NotificationService 
    ) {}
  
    onLogin() {
        if (this.email && this.password) {
          const loginData = { email: this.email, password: this.password };
  
          this.http.post<{ message: string; userId?: string; token?: string }>(`${this.API_BASE_URL}/api/login`, loginData)
            .subscribe(response => {
              console.log(response.message);
              
              if (response.userId && response.token) {
                localStorage.setItem('authToken', response.token);
                this.router.navigate(['/role-selection']);
              } else { 
                const failMessage = 'Login Failed! Please Check Your Credentials!';
                alert(failMessage);
                this.notificationService.addNotification(failMessage);
              }
            }, error => {
              const serverErrorMessage = 'Login Failed Due To Server Error!';
              alert(serverErrorMessage);
              this.notificationService.addNotification(serverErrorMessage);
            });
        } else {
          const missingFieldsMessage = 'Please Enter Both Email and Password!';
          alert(missingFieldsMessage);
          this.notificationService.addNotification(missingFieldsMessage);
        }
      }
  
      goHome() {
        this.router.navigate(['/']);
      }
  } 
