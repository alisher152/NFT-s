import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false,
})
export class DashboardComponent implements OnInit {
  username: string = '';

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      this.username = JSON.parse(user).username;
    }
  }
}
