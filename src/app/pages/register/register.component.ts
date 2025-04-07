import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false,
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  message: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.user.password !== this.user.confirmPassword) {
      this.message = 'Passwords do not match';
      return;
    }

    // Сохраняем данные пользователя в localStorage (имитация бэкенда)
    localStorage.setItem('user', JSON.stringify(this.user));

    this.message = 'Registration successful!';

    setTimeout(() => {
      this.router.navigate(['/dashboard']); // Перенаправляем в Dashboard
    }, 1500);
  }
}
