import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent {
  editMode: boolean = false; // 편집 모드 상태
  adminProfile = {
    name: 'Admin Name',
    email: 'admin@example.com',
    phone: '010-1234567'
  };

  editProfile() {
    this.editMode = true; // 편집 모드로 전환
  }

  saveProfile() {
    this.editMode = false; // 저장 후 편집 모드 해제
    // 추가적으로 저장 로직을 구현할 수 있습니다.
  }
}
