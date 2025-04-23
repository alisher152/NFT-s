import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false,
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid || this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { username, email, password } = this.registerForm.value;

    try {
      const isRegistered = this.userService.register({
        name: username,
        email: email,
        password: password, // В реальном приложении пароль должен хэшироваться
        avatar: 'assets/default-avatar.jpg',
        description: 'New user',
      });

      if (isRegistered) {
        this.successMessage = 'Регистрация успешна! Перенаправляем...';
        setTimeout(() => {
          this.router.navigate(['/nft']);
        }, 1500);
      } else {
        this.errorMessage = 'Пользователь с таким именем уже существует';
      }
    } catch (error) {
      this.errorMessage = 'Ошибка при регистрации';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  get f() {
    return this.registerForm.controls;
  }
}
