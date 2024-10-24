import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class ScheduleComponent {
  type: string = '';
  date: Date | null = null; // Date should be either Date object or null
  month: string = '';
  time: string = '';

  schedules: { type: string, date: Date | null, month: string, time: string }[] = [];

  addSchedule() {
    if (this.type && this.date && this.month && this.time) {
      this.schedules.push({
        type: this.type,
        date: this.date,
        month: this.month,
        time: this.time
      });

      // Clear fields after adding
      this.type = '';
      this.date = null;
      this.month = '';
      this.time = '';
    } else {
      alert('Please fill all fields before adding a schedule.');
    }
  }

  removeSchedule(index: number) {
    this.schedules.splice(index, 1);
  }
}

