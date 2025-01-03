import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { RoleSelectionComponent } from './components/role-selection/role-selection.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReportIssueComponent } from './components/report-issue/report-issue.component';
import { HistoryComponent } from './components/history/history.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'user-register', component: UserRegisterComponent },
  { path: 'admin-register', component: AdminRegisterComponent },
  { path: 'role-selection', component: RoleSelectionComponent },
  { path: 'report-issue', component: ReportIssueComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'reports', component: ReportsComponent },

  // Explicit route for admin dashboard
  { path: 'admin-dashboard', component: DashboardLayoutComponent },

  // Dashboard child routes
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'admin-profile', component: AdminProfileComponent },
    ],
  },

  // Wildcard route
  { path: '**', redirectTo: '' },
];
