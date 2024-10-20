import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { RoleSelectionComponent } from './components/role-selection/role-selection.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { ReportsComponent } from './components/reports/reports.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'admin-login', component: AdminLoginComponent},
    {path: 'user-login', component: UserLoginComponent},
    {path: 'user-register', component: UserRegisterComponent},
    {path: 'admin-register', component: AdminRegisterComponent},
    {path: 'role-selection', component: RoleSelectionComponent},
    {path: 'reports', component: ReportsComponent}
   
];
