import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(false);
  authStatus$: Observable<boolean> = this.authStatus.asObservable();

  constructor(private router: Router) {
    this.checkAuthStatus();
  }

  checkAuthStatus(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      console.log('AuthService: Token found in localStorage:', token);
      this.authStatus.next(true);
    } else {
      console.warn('AuthService: No token found in localStorage');
      this.authStatus.next(false);
    }
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    const isAuthenticated = !!token;
    if (!isAuthenticated) {
      console.warn('AuthService: User is not logged in');
    }
    return isAuthenticated;
  }

  login(token: string): void {
    if (!token || typeof token !== 'string') {
      console.error('AuthService: Invalid token provided for login');
      throw new Error('Invalid token');
    }
    localStorage.setItem('authToken', token);
    this.authStatus.next(true);
    console.log('AuthService: User logged in with token:', token);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.authStatus.next(false);
    console.log('AuthService: User logged out, token removed');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.warn('AuthService: No token available');
    }
    return token;
  }
}
