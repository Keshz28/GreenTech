import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';  // Ensure RouterModule is imported
import { HomeComponent } from './components/home/home.component';
import { RoleSelectionComponent } from './components/role-selection/role-selection.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';

// Define your routes here
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'role-selection', component: RoleSelectionComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'user-register', component: UserRegisterComponent },
  { path: 'admin-register', component: AdminRegisterComponent},

  // Define the default route (usually home)
  { path: '', redirectTo: 'home', pathMatch: 'full' },  // Correct the redirect path to 'home'
  
  // Fallback for undefined routes
  { path: '**', redirectTo: 'home' }  // Redirect any undefined routes to 'home'

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Ensure RouterModule.forRoot is here
  exports: [RouterModule]
})
export class AppRoutingModule { }
