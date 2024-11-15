import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Define your routes here
const routes: Routes = [
  // Main non-dashboard routes
  { path: 'home', component: HomeComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'role-selection', component: RoleSelectionComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'user-register', component: UserRegisterComponent },
  { path: 'admin-register', component: AdminRegisterComponent },
  { path: 'report-issue', component: ReportIssueComponent},
  
  { path: 'profile', component: ProfileComponent },
  

  // Dashboard routes
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default dashboard route
      { path: '', component: DashboardComponent },
      { path: 'home', component: DashboardLayoutComponent },  // Main dashboard view
      { path: 'history', component: HistoryComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'admin-profile', component: AdminProfileComponent },

      // Redirect /dashboard to /dashboard/home by default
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  // Redirect root to /dashboard
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Fallback for undefined routes
  { path: '**', redirectTo: '/dashboard' }  // Redirect any undefined routes to dashboard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
