import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';  // Import HttpClient to send HTTP requests
import { Router } from '@angular/router';  // Import Router for navigation
import { RoleSelectionComponent } from '../role-selection/role-selection.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-register',
  standalone: true,
  imports: [RouterModule, FormsModule, RoleSelectionComponent, AdminLoginComponent, UserLoginComponent, UserRegisterComponent],  // No need to import other components here
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  address: string = '';
  communityName: string = '';
  phoneNumber: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
    const adminData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      address: this.address,
      communityName: this.communityName,
      phoneNumber: this.phoneNumber,
      password: this.password
    };

    this.http.post<{ message: string; adminId?: string }>('http://localhost:3000/api/admin/register', adminData)
      .subscribe(response => {
        console.log(response.message);
        if (response.adminId) {
          // Redirect to some other page on successful registration
          this.router.navigate(['/admin-dashboard']);  // Adjust the route as needed
        } else {
          alert('Registration Failed!!! An Accounting Error Had Been Occured!')
        }
      }, error => {
        console.error('Registration failed:', error);
        alert ('Login Failed Due To Server Error!!!')
      });

  }

  // Method to navigate back to the homepage
  goHome() {
    this.router.navigate(['/']);  // Navigate to the home page
  }


}
