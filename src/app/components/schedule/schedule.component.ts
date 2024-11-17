import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // For navigation
import { ScheduleService, Schedule } from '../../services/schedule.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  imports: [CommonModule, FormsModule], // Import necessary Angular modules
  providers: [ScheduleService], // Provide the service here for standalone
})
export class ScheduleComponent implements OnInit {
  type: string = ''; // Input for Type
  date: string = ''; // Input for Date
  time: string = ''; // Input for Time
  location: string = ''; // Input for Location
  dayOfWeek: string = ''; // To display the day of the week
  schedules: Schedule[] = []; // List of schedules

  constructor(private scheduleService: ScheduleService, private router: Router) {}

  ngOnInit() {
    this.loadSchedules(); // Load schedules when the component is initialized
  }

  // Navigate back to the Home component
  goBackHome(): void {
    this.router.navigate(['/']); // Navigate to the Home route
  }

  // Load schedules from the service
  loadSchedules() {
    this.scheduleService.getSchedules().subscribe((data) => {
      this.schedules = data;
    });
  }

  // Handle date input change
  onDateChange(event: any) {
    const selectedDate = new Date(event.target.value); // Get date from event
    this.dayOfWeek = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
  }

  // Add a new schedule
  addSchedule() {
    if (this.type && this.date && this.time && this.location) {
      const formattedDate = new Date(this.date); // Convert the string to a Date object
      const newSchedule: Schedule = {
        type: this.type,
        date: formattedDate, // Save as Date object
        time: this.time,
        location: this.location,
        dayOfWeek: formattedDate.toLocaleDateString('en-US', { weekday: 'long' }),
      };

      // Call the service to save the schedule
      this.scheduleService.addSchedule(newSchedule).subscribe((data) => {
        this.schedules.push(data); // Add the new schedule to the list
        this.resetFields(); // Reset input fields
      });
    }
  }

  // Remove a schedule by ID
  removeSchedule(id: string) {
    this.scheduleService.deleteSchedule(id).subscribe(() => {
      this.schedules = this.schedules.filter((schedule) => schedule._id !== id);
    });
  }

  // Reset input fields after adding a schedule
  resetFields() {
    this.type = '';
    this.date = '';
    this.time = '';
    this.location = '';
    this.dayOfWeek = '';
  }
}


