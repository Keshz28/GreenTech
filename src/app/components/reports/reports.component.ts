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

  // Data for Pickup History table
  public pickupHistory = [
    { name: 'John Doe', community: 'Subang Bestari', wasteType: 'Plastic' },
    { name: 'Jane Smith', community: 'Subang Bestari', wasteType: 'Metal' },
    { name: 'Mark Johnson', community: 'Subang Bestari', wasteType: 'Glass' },
    { name: 'Anna Williams', community: 'Subang Bestari', wasteType: 'Paper' },
    { name: 'Paul Adams', community: 'Subang Bestari', wasteType: 'Others' }
  ];

  // Method to navigate back to the homepage
  goBackHome(): void {
    this.router.navigate(['/']);
  }
}
