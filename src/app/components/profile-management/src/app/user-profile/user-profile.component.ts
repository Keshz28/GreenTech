import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  editMode: boolean = false; // 편집 모드 상태
  userProfile = {
    name: 'User Name',
    email: 'user@example.com',
    phone: '010-7654321'
  };

  editProfile() {
    this.editMode = true; // 편집 모드로 전환
  }

  saveProfile() {
    this.editMode = false; // 저장 후 편집 모드 해제
    // 추가적으로 저장 로직을 구현할 수 있습니다.
  }
}
