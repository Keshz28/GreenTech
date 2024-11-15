import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserLoginComponent } from '../user-login/user-login.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { AdminRegisterComponent } from '../admin-register/admin-register.component';
import { HomeComponent } from '../home/home.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-role-selection',
  standalone: true,
  imports: [RouterModule, UserLoginComponent, AdminLoginComponent, UserRegisterComponent, AdminRegisterComponent, HomeComponent],
  templateUrl: './role-selection.component.html',
  styleUrls: ['./role-selection.component.css'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class RoleSelectionComponent {
  constructor(private router: Router) {}

  // Method to navigate to the User Profile
  selectUserRole() {
    this.router.navigate(['/profile']);
  }

  // Method to navigate to the Admin Dashboard
  selectAdminRole() {
    this.router.navigate(['/admin-dashboard']); // or your actual admin route
  }

}
