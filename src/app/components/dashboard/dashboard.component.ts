import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // KPI Data
  kpis = [
    { label: 'Total Users', value: '1200', icon: 'fa fa-users' },
    { label: 'Pending Feedback', value: '25', icon: 'fa fa-comments' },
    { label: 'Resolved Issues', value: '75', icon: 'fa fa-check-circle' },
    { label: 'System Uptime', value: '99.9%', icon: 'fa fa-server' }
  ];

  // Line Chart Data for User Growth
  userGrowthData = [
    { label: 'Jan', value: 500 },
    { label: 'Feb', value: 700 },
    { label: 'Mar', value: 1000 },
    { label: 'Apr', value: 1200 },
    { label: 'May', value: 1500 },
    { label: 'Jun', value: 1800 },
    { label: 'Jul', value: 2000 }
  ];

  // Generates SVG points for the line chart
  get userGrowthPoints(): string {
    return this.userGrowthData
      .map((point, i) => `${50 + i * 50},${200 - point.value * 0.1}`)
      .join(' ');
  }

  // Bar Chart Data for Activity Trends
  activityData = [
    { label: 'Mon', value: 20 },
    { label: 'Tue', value: 30 },
    { label: 'Wed', value: 40 },
    { label: 'Thu', value: 25 },
    { label: 'Fri', value: 50 },
    { label: 'Sat', value: 30 },
    { label: 'Sun', value: 15 }
  ];

  // Notifications and Recent Activities
  notifications = [
    { message: 'New feedback from User123', time: new Date() },
    { message: 'Server maintenance scheduled', time: new Date() }
  ];

  recentActivities = [
    { description: 'User JohnDoe submitted feedback', time: new Date() },
    { description: 'New user registration: JaneSmith', time: new Date() }
  ];

  constructor() {}

  ngOnInit(): void {}
}
