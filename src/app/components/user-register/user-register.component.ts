import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoleSelectionComponent } from '../role-selection/role-selection.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { AdminRegisterComponent } from '../admin-register/admin-register.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [RouterModule, RoleSelectionComponent, AdminLoginComponent, UserLoginComponent, AdminRegisterComponent, FormsModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
 
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    address: string = '';
    communityName: string = '';
    phoneNumber: string = '';
    password: string = '';
  
    constructor(private http: HttpClient, private router: Router) {}
  
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
  
      this.http.post<{ message: string; userId?: string }>('http://localhost:3000/api/register', registrationData)
        .subscribe(response => {
          console.log(response.message);
          // Redirect to another page on successful registration
          if (response.userId) {
            this.router.navigate(['/role-selection']);
          }
        }, error => {
          console.error('Registration failed:', error);
        });
    }

    // Method to navigate back to the homepage
    goHome() {
      this.router.navigate(['/']);  // Navigate to the homepage
    }
  
}
