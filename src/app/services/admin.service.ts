  import { Injectable } from '@angular/core';

  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { Admin } from '../interfaces/admin.interface';

  @Injectable({
    providedIn: 'root'
  })
  export class AdminService {

    private apiUrl = 'http://localhost:3000/api/admin/profile';

    constructor(private http: HttpClient) {}

    getProfile(adminId: string): Observable<Admin> {

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      });

      return this.http.get<Admin>(this.apiUrl, { headers });
    }

    updateProfile(adminId: string, adminData: Admin): Observable<Admin> {

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      });

      return this.http.put<Admin>(this.apiUrl, adminData, { headers });
    }
  }