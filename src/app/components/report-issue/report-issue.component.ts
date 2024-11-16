import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
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
    image: null
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    // Validate required fields
    if (!this.report.community.trim() || this.report.description.trim().length < 30) {
      alert('Information not been filled! Please fill out all required fields.');
      return;
    }

    // Prepare payload
    const formData = new FormData();
    formData.append('community', this.report.community);
    formData.append('issueType', this.report.issueType || 'Not Specified'); // Optional
    formData.append('description', this.report.description);
    if (this.report.image) {
      formData.append('image', this.report.image);
    }

    // Send report to the backend
    this.http.post('http://localhost:3000/api/reports', formData).subscribe(
      (response: any) => {
        alert('Report submitted successfully!');
        this.resetForm();
        console.log('Response from backend:', response);
      },
      (error) => {
        alert('Failed to submit report. Please try again.');
        console.error('Error:', error);
      }
    );
  }

  // Handle image file selection
  onFileSelected(event: any) {
    this.report.image = event.target.files[0];
  }

  resetForm() {
    this.report = {
      community: '',
      issueType: '',
      description: '',
      image: null
    };
  }

  goBackHome() {
    this.router.navigate(['/']);
  }
}
