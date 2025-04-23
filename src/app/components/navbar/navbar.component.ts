import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false,
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen = true;
  isLoggedIn = false;
  private authSub!: Subscription;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.authSub = this.auth.authStatus$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  handleNavigation(route: string) {
    if (!this.isLoggedIn) {
      const tried = localStorage.getItem('hasTriedAccess');

      if (!tried) {
        localStorage.setItem('hasTriedAccess', 'true');
        this.router.navigate(['/register']);
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate([route]);
      this.isMenuOpen = false;
    }
  }
}
