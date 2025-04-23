import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(false);
  authStatus$ = this.authStatus.asObservable();

  constructor(private router: Router) {
    this.checkAuthStatus();
  }

  checkAuthStatus(): void {
    const token = localStorage.getItem('authToken');
    this.authStatus.next(!!token);
  }

  isLoggedIn(): boolean {
    return this.authStatus.value;
  }

  login(token: string): void {
    localStorage.setItem('authToken', token);
    this.authStatus.next(true);
    console.log('User logged in with token:', token);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.authStatus.next(false);
    this.router.navigate(['/login']);
  }
}
