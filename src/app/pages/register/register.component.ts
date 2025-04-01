import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'], // Используем те же стили, что и для login
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

    // Здесь будет логика регистрации
    this.message = 'Registration successful!';
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
