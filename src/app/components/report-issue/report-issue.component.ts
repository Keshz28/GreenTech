import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-report-issue',
  standalone: true,  // Indicates it's a standalone component
  imports: [FormsModule],  // Add FormsModule here
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.css']
})
export class ReportIssueComponent {
  // Model for the report
  report = {
    community: '',
    issueType: '',  // Optional field for issue type
    description: '',
    image: null
  };

  // Properties for issue submission status
  issueId: string | null = null;  // Unique ID for the issue
  issueStatus: string | null = null;  // Status of the issue (e.g., "Pending")
  showNotification = false;  // Flag to show local notification

  constructor(
    private router: Router,
    private notificationService: NotificationService  // Inject the NotificationService
  ) {}

  // Handle form submission with validation
  onSubmit() {
    // Validate the form fields
    if (!this.report.community || !this.report.description || this.report.description.length < 30) {
      // Display alert if required fields are missing or invalid
      alert('Information not been filled! Please fill out all required fields.');
      return;  // Stop the form submission process
    }

    // If validation passes, generate a unique issue ID
    const issueId = this.generateUniqueIssueId();
    const issueStatus = "Submitted";

    // Add a notification to the global notification service
    this.notificationService.addNotification(
      `Your issue (ID: ${issueId}) has been successfully submitted with status: ${issueStatus}`
    );

    // Log the report details (You could send this data to a backend service here)
    console.log('Report Submitted:', this.report);

    // Optionally reset the form after submission
    this.resetForm();
  }

  // Generate a unique issue ID (for example purposes, we can use a timestamp)
  generateUniqueIssueId(): string {
    return 'ISSUE-' + Math.floor(Date.now() / 1000);  // Example format: ISSUE-1633987463
  }

  // Handle file selection (for image upload)
  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log('Image Selected:', file);
    this.report.image = file;
  }

  // Navigate back to the homepage
  goBackHome() {
    this.router.navigate(['/']);  // Navigate to the home page
  }

  // Reset form fields after submission
  resetForm() {
    this.report = {
      community: '',
      issueType: '',
      description: '',
      image: null
    };
  }
}
