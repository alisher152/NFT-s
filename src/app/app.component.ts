import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  title = 'Alisher';
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const navbar = document.querySelector('.vertical-navbar');
    const burgerBtn = document.querySelector('.burger-btn');

    if (
      !navbar?.contains(event.target as Node) &&
      !burgerBtn?.contains(event.target as Node)
    ) {
      this.closeNavMenu();
    }
  }

  private closeNavMenu() {
    const navbar = document.querySelector('.vertical-navbar');
    if (navbar?.classList.contains('open')) {
      navbar.classList.remove('open');
      document.body.classList.remove('nav-open');
    }
  }
}
