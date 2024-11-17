import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Schedule {
  type: string;
  time: string;
  location: string;
}

interface GroupedSchedule {
  date: string;
  schedules: Schedule[];
}

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  filterType: string = 'all'; // Default filter
  groupedSchedules: GroupedSchedule[] = []; // Filtered schedules
  allSchedules: GroupedSchedule[] = []; // All schedules for reference

  constructor(private router: Router) {} // Inject Router in constructor

  ngOnInit(): void {
    // Initialize schedules with mock data (replace with API call if needed)
    this.allSchedules = [
      {
        date: '2024-11-15',
        schedules: [
          { type: 'plastic', time: '10:00 AM', location: 'Location A' },
          { type: 'glass', time: '12:00 PM', location: 'Location B' },
        ],
      },
      {
        date: '2024-11-14',
        schedules: [
          { type: 'paper', time: '02:00 PM', location: 'Location C' },
          { type: 'organic', time: '04:00 PM', location: 'Location D' },
        ],
      },
    ];
    this.groupedSchedules = [...this.allSchedules]; // Default view
  }

  // Navigate back to the Home component
  goBackHome(): void {
    this.router.navigate(['/']); // Navigates to the default home route
  }

  applyFilter(): void {
    if (this.filterType === 'all') {
      this.groupedSchedules = [...this.allSchedules];
    } else {
      this.groupedSchedules = this.allSchedules
        .map((group) => ({
          ...group,
          schedules: group.schedules.filter((schedule) => schedule.type === this.filterType),
        }))
        .filter((group) => group.schedules.length > 0);
    }
  }

  sortSchedules(order: string): void {
    this.groupedSchedules.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return order === 'latest' ? dateB - dateA : dateA - dateB;
    });
  }

  clearHistory(): void {
    this.groupedSchedules = [];
  }
}




  