import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component'; // AdminProfileComponent 임포트

const routes: Routes = [
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'admin-profile', component: AdminProfileComponent },
  { path: '', redirectTo: '/user-profile', pathMatch: 'full' }, // 기본적으로 User Profile로 리다이렉트
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
