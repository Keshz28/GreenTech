import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { RouterModule, Routes } from '@angular/router';  // RouterModule and Routes
import { FormsModule } from '@angular/forms';


// Import your standalone components directly in routes
import { RoleSelectionComponent } from './components/role-selection/role-selection.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ProfileComponent } from './components/profile/profile.component';



// Define the routes for your app
const appRoutes: Routes = [
  { path: '', component: HomeComponent },          // Default route
  { path: 'user-login', component: UserLoginComponent }, // Route for login
  { path: 'role-selection', component: RoleSelectionComponent }, // Route for role selection
  { path: 'admin-login', component: AdminLoginComponent }, // Admin login route
  { path: 'admin-register', component: AdminRegisterComponent},
  { path: 'user-register', component: UserRegisterComponent},
  { path: 'reports', component: ReportsComponent},
  { path: 'profile', component: ProfileComponent}
  
];

@NgModule({
  declarations: [
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Add HttpClientModule here
    RouterModule.forRoot(appRoutes), // Configure routes with forRoot
    FormsModule
  ],
  providers: [],
  bootstrap: [] // Bootstrap the AppComponent
})
export class AppModule { }


