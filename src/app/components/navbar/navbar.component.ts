import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
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
  isMobileView = false;
  isLoggedIn = false;
  private authSub!: Subscription;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkViewport();
    this.authSub = this.auth.authStatus$.subscribe((status) => {
      this.isLoggedIn = status;
      console.log('Auth status changed:', status);
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkViewport();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  handleNavigation(route: string) {
    if (!this.isLoggedIn) {
      this.router.navigate(['/register']);
    } else {
      this.router.navigate([route]);
      if (this.isMobileView) {
        this.isMenuOpen = false;
      }
    }
  }

  private checkViewport() {
    this.isMobileView = window.innerWidth <= 768;
    if (!this.isMobileView) {
      this.isMenuOpen = true;
    }
  }
}
