import {
  Component,
  HostListener,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent implements AfterViewInit {
  title = 'KKSpecial';

  @ViewChild('verticalNavbar') verticalNavbar!: ElementRef;
  @ViewChild('burgerBtn') burgerBtn!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.verticalNavbar?.nativeElement || !this.burgerBtn?.nativeElement) {
      return;
    }

    if (!this.isClickInsideNavbar(event) && !this.isClickInsideBurger(event)) {
      this.closeNavMenu();
    }
  }

  toggleNavMenu(): void {
    if (!this.verticalNavbar?.nativeElement) return;

    const isOpen = this.verticalNavbar.nativeElement.classList.contains('open');
    isOpen ? this.closeNavMenu() : this.openNavMenu();
  }

  private openNavMenu(): void {
    if (this.verticalNavbar?.nativeElement) {
      this.renderer.addClass(this.verticalNavbar.nativeElement, 'open');
      this.renderer.addClass(document.body, 'nav-open');
    }
  }

  private closeNavMenu(): void {
    if (this.verticalNavbar?.nativeElement) {
      this.renderer.removeClass(this.verticalNavbar.nativeElement, 'open');
      this.renderer.removeClass(document.body, 'nav-open');
    }
  }

  private isClickInsideNavbar(event: MouseEvent): boolean {
    return this.verticalNavbar?.nativeElement?.contains(event.target as Node);
  }

  private isClickInsideBurger(event: MouseEvent): boolean {
    return this.burgerBtn?.nativeElement?.contains(event.target as Node);
  }

  private checkScreenSize(): void {
    if (window.innerWidth > 768) {
      this.closeNavMenu();
    }
  }
}
