import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  username: string = ''; // Добавлено свойство username
  password: string = ''; // Добавлено свойство password
  message: string = ''; // Добавлено свойство message

  // Добавлен метод onSubmit()
  onSubmit() {
    if (this.username && this.password) {
      this.message = `Добро пожаловать, ${this.username}!`;
    } else {
      this.message = 'Пожалуйста, введите логин и пароль';
    }
  }

  // Добавлен метод showRegisterMessage()
  showRegisterMessage() {
    this.message = 'Функция регистрации будет доступна позже';
  }
}
