import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoleSelectionComponent } from '../role-selection/role-selection.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminRegisterComponent } from '../admin-register/admin-register.component';
import { UserRegisterComponent } from '../user-register/user-register.component';

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
  
    constructor(private http: HttpClient, private router: Router) {}
  
    onLogin() {
      if (this.email && this.password){
      const loginData = { email: this.email, password: this.password };
      
      // Send POST request to the backend
      this.http.post<{ message: string; userId?: string }>('http://localhost:3000/api/login', loginData)
        .subscribe(response => {
          console.log(response.message);
          if (response.userId) {
            //Redirect to dashboard after successfull login
            this.router.navigate(['/role-selection']);
          } else { 
            alert('Login Failed!!! Please Check Your Credentials!')
          }
        }, error => {
          console.error('Login failed:', error);
          alert('Login Failed Due To Server Error!!!')
        });
      }else{
        alert('Please Enter Both Email and Password!')
      }
    }

    

     // Method to navigate back to the homepage
    goHome() {
      this.router.navigate(['/']);  // Navigate to the homepage
  }

}