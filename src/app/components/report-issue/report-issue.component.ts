import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-issue',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.css']
})
export class ReportIssueComponent {
  report = {
    community: '',
    issueType: '',
    description: '',
    image: null as File | null
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
  
    if (!this.report.community || !this.report.description) {
      alert('Please fill out all required fields');
      return;
    }
  
    const formData = new FormData();
    formData.append('location', this.report.community);  // Changed from 'community' to 'location'
    formData.append('issueType', this.report.issueType || 'Not Specified');
    formData.append('description', this.report.description);
    
    if (user?._id) {
      formData.append('userId', user._id);
    }
  
    if (this.report.image) {
      formData.append('photo', this.report.image);  // Changed from 'image' to 'photo'
    }
  
    this.http.post('http://localhost:3000/api/reports', formData).subscribe({
      next: (response) => {
        alert('Report submitted successfully!');
        this.resetForm();
      },
      error: (error) => {
        console.error('Full error details:', error);
        alert(error.error?.message || 'Failed to submit report');
      }
    });  
  }  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.report.image = input.files[0];
    }
  }

  resetForm(): void {
    this.report = {
      community: '',
      issueType: '',
      description: '',
      image: null
    };
  }

  goBackHome(): void {
    this.router.navigate(['/']);
  }
}