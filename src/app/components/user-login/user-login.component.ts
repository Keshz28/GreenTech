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
  
    email: string = '';
    password: string = '';
  
    constructor(
      private http: HttpClient,
      private router: Router,
      private notificationService: NotificationService ) {}
  
    onLogin() {
      if (this.email && this.password){
      const loginData = { email: this.email, password: this.password };

      localStorage.setItem('user', JSON.stringify(loginData));
      
      // Send POST request to the backend
      this.http.post<{ message: string; userId?: string }>('http://localhost:3000/api/login', loginData)
        .subscribe(response => {
          console.log(response.message);
          if (response.userId) {
            //Redirect to dashboard after successfull login
            this.router.navigate(['/role-selection']);
          } else { 
            const failMessage = 'Login Failed!!! Please Check Your Credentials!';
            alert(failMessage);

            // Add the message to the notifications
            this.notificationService.addNotification(failMessage);
          }
        }, error => {
          console.error('Login failed:', error);
          const serverErrorMessage = 'Login Failed Due To Server Error!!!';
          alert(serverErrorMessage);

           // Add the server error to the notifications
           this.notificationService.addNotification(serverErrorMessage);
        });
      }else{
        const missingFieldsMessage = 'Please Enter Both Email and Password!';
        alert(missingFieldsMessage);

        // Add the missing fields error to the notifications
        this.notificationService.addNotification(missingFieldsMessage);
      }
    }

    

     // Method to navigate back to the homepage
    goHome() {
      this.router.navigate(['/']);  // Navigate to the homepage
  }

}