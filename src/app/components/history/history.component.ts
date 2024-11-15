import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  constructor(private router: Router) {}

  goBackHome() {
    this.router.navigate(['/']); // or use the correct route to your homepage
  }
}



  