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
  avatar: string = 'assets/default-avatar.jpg'; // Аватар по умолчанию

  ngOnInit() {
    // Загружаем существующий профиль из localStorage
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      const profileData = JSON.parse(profile);
      this.username = profileData.username || '';
      this.bio = profileData.bio || '';
      this.avatar = profileData.avatar || 'assets/default-avatar.jpg';
    }
  }

  // Сохранение профиля в localStorage
  saveProfile() {
    const profileData = {
      username: this.username,
      bio: this.bio,
      avatar: this.avatar,
      walletAddress: '0x' + Math.random().toString(16).slice(2, 10) + '...', // Заглушка для адреса кошелька
      followers: 0, // Заглушка для данных с бэкенда
      following: 0, // Заглушка для данных с бэкенда
      id: 'user_' + Math.random().toString(36).slice(2), // Уникальный ID для пользователя
    };
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    console.log('Профиль сохранен:', profileData);
  }

  // Ограничение длины биографии
  checkCharLimit(event: Event) {
    const inputElement = event.target as HTMLTextAreaElement;
    if (inputElement.value.length > 300) {
      inputElement.value = inputElement.value.slice(0, 300);
      this.bio = inputElement.value;
    }
  }

  // Обработка загрузки аватара
  onAvatarChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.avatar = reader.result as string; // Сохраняем изображение как Data URL
      };
      reader.readAsDataURL(file);
    }
  }
}
