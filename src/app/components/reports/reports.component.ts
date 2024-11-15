import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  constructor(private router: Router) {}

  // Data for the summary section
  public totalPickups: number = 150;
  public topWasteType: string = 'Plastic';
  public topCommunity: string = 'Subang Bestari';

  // Static Entries for Pickup History table
  public staticEntries = [
    { name: 'John Doe', community: 'Subang Bestari', wasteType: 'Plastic' },
    { name: 'Jane Smith', community: 'Subang Bestari', wasteType: 'Metal' }
  ];

  // Placeholder for dynamically submitted reports
  public submittedReports: Array<{ name: string, community: string, wasteType: string }> = [];

  // Future method to add reports dynamically (we can build on this later)
  addReport(report: { name: string, community: string, wasteType: string }) {
    this.submittedReports.push(report);  // Add the new report dynamically
  }

  // Method to navigate back to the homepage
  goBackHome(): void {
    this.router.navigate(['/']);
  }
}
