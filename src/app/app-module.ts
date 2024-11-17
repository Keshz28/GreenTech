import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
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
import { ReportIssueComponent } from './components/report-issue/report-issue.component';
import { HistoryComponent } from './components/history/history.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'; // Import DashboardComponent

// Define the routes for your app
const appRoutes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'user-login', component: UserLoginComponent },
  { path: 'role-selection', component: RoleSelectionComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-register', component: AdminRegisterComponent },
  { path: 'user-register', component: UserRegisterComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'report-issue', component: ReportIssueComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'admin-profile', component: AdminProfileComponent },
  //i havent added the dashboard route yet, we check and see if it works
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: DashboardComponent }, // Default child route for Dashboard
      { path: 'history', component: HistoryComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'admin-profile', component: AdminProfileComponent }
    ]
  }
];

@NgModule({
  declarations: [
    
     // Add DashboardComponent here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Add HttpClientModule here
    RouterModule.forRoot(appRoutes), // Configure routes with forRoot
    FormsModule
  ],
  providers: [],
  bootstrap: [] // Bootstrapping AppComponent to initialize the app
})
export class AppModule { }



