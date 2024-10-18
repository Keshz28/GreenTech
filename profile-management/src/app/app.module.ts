import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // ngModel 사용을 위한 모듈
import { RouterModule, Routes } from '@angular/router'; // RouterModule 임포트

import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component'; // UserProfileComponent 경로 조정
import { AdminProfileComponent } from './admin-profile/admin-profile.component'; // AdminProfileComponent 경로 조정

const routes: Routes = [
  { path: '', redirectTo: '/user-profile', pathMatch: 'full' }, // 기본 경로 설정
  { path: 'user-profile', component: UserProfileComponent }, // User Profile 경로 설정
  { path: 'admin-profile', component: AdminProfileComponent } // Admin Profile 경로 설정
];

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent, // UserProfileComponent 선언
    AdminProfileComponent // AdminProfileComponent 선언
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes) // 라우트 등록
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
