import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoleSelectionComponent } from '../role-selection/role-selection.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { AdminRegisterComponent } from '../admin-register/admin-register.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [RouterModule, RoleSelectionComponent, AdminLoginComponent, UserLoginComponent, AdminRegisterComponent, FormsModule],
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
      private router: Router,
      private notificationService: NotificationService
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

      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(registrationData));

      // Redirect to another page on successful registration
      this.router.navigate(['/role-selection']);
    }

    // Method to navigate back to the homepage
    goHome() {
      this.router.navigate(['/']);  // Navigate to the homepage
    }
  
}
