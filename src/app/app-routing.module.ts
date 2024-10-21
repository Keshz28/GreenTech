import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';  // Ensure RouterModule is imported
import { HomeComponent } from './components/home/home.component';
import { RoleSelectionComponent } from './components/role-selection/role-selection.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReportIssueComponent } from './components/report-issue/report-issue.component';
import { HistoryComponent } from './components/history/history.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';


// Define your routes here
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'role-selection', component: RoleSelectionComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'user-register', component: UserRegisterComponent },
  { path: 'admin-register', component: AdminRegisterComponent},
  { path: 'reports', component: ReportsComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'report-issue', component: ReportIssueComponent},
  { path: 'history', component: HistoryComponent},
  { path: 'schedule', component: ScheduleComponent},
  { path: 'admin-profile', component: AdminProfileComponent},

  // Define the default route (usually home)
  { path: '', redirectTo: 'home', pathMatch: 'full' },  // Correct the redirect path to 'home'
  
  // Fallback for undefined routes
  { path: '**', redirectTo: 'home' }  // Redirect any undefined routes to 'home'

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Use forRoot with your routes
  exports: [RouterModule]  // Export RouterModule so it's available throughout the app
})
export class AppRoutingModule { }