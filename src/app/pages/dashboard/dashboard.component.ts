import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false,
})
export class DashboardComponent implements OnInit {
  username: string = '';
  bio: string = '';

  saveProfile() {
    const profileData = {
      username: this.username,
      bio: this.bio,
    };
    localStorage.setItem('profile', JSON.stringify(profileData));
    console.log('Profile Saved:', profileData);
  }

  checkCharLimit(event: Event) {
    const inputElement = event.target as HTMLTextAreaElement;

    if (inputElement.value.length > 300) {
      inputElement.value = inputElement.value.slice(0, 300); // Ограничиваем текст
      this.bio = inputElement.value; // Обновляем переменную bio
    }
  }

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      this.username = JSON.parse(user).username;
    }
  }
}
