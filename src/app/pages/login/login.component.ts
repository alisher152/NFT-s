import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { AuthService } from '../../auth service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid || this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { username, password } = this.loginForm.value;

    try {
      const result = this.userService.login({ username, password });

      if (result.success) {
        this.authService.login('generated-token'); // Замените на реальный токен
        this.router.navigate(['/nft']);
      } else {
        this.errorMessage = result.message || 'Invalid username or password';
      }
    } catch (error) {
      this.errorMessage = 'An error occurred during login';
      console.error('Login error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  get f() {
    return this.loginForm.controls;
  }
}
