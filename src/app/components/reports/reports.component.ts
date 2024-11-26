import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ScheduleService, Schedule } from '../../services/schedule.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  constructor(private router: Router, private scheduleService: ScheduleService) {}

  // Data for the summary section
  public totalPickups: number = 0;
  public topWasteType: string = '';
  public topCommunity: string = '';
  public recyclingStats: { type: string; count: number }[] = [];

  // Placeholder for dynamically submitted reports
  public submittedReports: Array<{ name: string; community: string; wasteType: string }> = [];

  // Dynamic data fetched from the service
  public schedules: Schedule[] = [];

  ngOnInit(): void {
    this.fetchSchedules();
  }

  fetchSchedules() {
    this.scheduleService.getSchedules().subscribe((data) => {
      this.schedules = data;
      this.totalPickups = data.length;
      this.calculateTopWasteType();
      this.calculateTopCommunity();
      this.calculateRecyclingStats();
    });
  }

  calculateTopWasteType() {
    const typeCounts: { [key: string]: number } = {};
    this.schedules.forEach((schedule) => {
      typeCounts[schedule.type] = (typeCounts[schedule.type] || 0) + 1;
    });
    this.topWasteType = Object.keys(typeCounts).reduce((a, b) =>
      typeCounts[a] > typeCounts[b] ? a : b
    );
  }

  calculateTopCommunity() {
    const communityCounts: { [key: string]: number } = {};
    this.schedules.forEach((schedule) => {
      communityCounts[schedule.location] =
        (communityCounts[schedule.location] || 0) + 1;
    });
    this.topCommunity = Object.keys(communityCounts).reduce((a, b) =>
      communityCounts[a] > communityCounts[b] ? a : b
    );
  }

  calculateRecyclingStats() {
    const typeCounts: { [key: string]: number } = {};
    this.schedules.forEach((schedule) => {
      typeCounts[schedule.type] = (typeCounts[schedule.type] || 0) + 1;
    });
    this.recyclingStats = Object.keys(typeCounts).map((type) => ({
      type,
      count: typeCounts[type],
    }));
  }

  // Static Entries for Pickup History table
  public staticEntries = [
    { name: 'Salehah', community: 'Damai', wasteType: 'Plastic' },
    { name: 'Kamishini', community: 'Damai', wasteType: 'Metal' },
  ];

  // Method to add reports dynamically
  addReport(report: { name: string; community: string; wasteType: string }) {
    this.submittedReports.push(report); // Add the new report dynamically
  }

  // Method to navigate back to the homepage
  goBackHome(): void {
    this.router.navigate(['/']);
  }
}
