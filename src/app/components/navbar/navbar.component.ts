import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-vertical-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false,
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  isMobileView = false;

  ngOnInit() {
    this.checkViewport();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkViewport();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  private checkViewport() {
    this.isMobileView = window.innerWidth <= 768;
    if (!this.isMobileView) {
      this.isMenuOpen = true; // Всегда открыт на десктопе
    }
  }
}
