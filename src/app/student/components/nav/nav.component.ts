import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [SharedModule,RouterLink,FormsModule,CommonModule,RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  openDropdown: string | null = null;
  searchQuery = '';

  constructor(private router: Router) {}

  toggleDropdown(menu: string) {
    this.openDropdown = this.openDropdown === menu ? null : menu;
  }

  toggleSidebar() {
    console.log('Sidebar toggled');
  }
navigateAndClose(path: string) {
  this.router.navigate([path]);
  this.openDropdown = null;
}

  onSearch() {
    console.log('Searching for:', this.searchQuery);
    // Example: navigate to a search page
     this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Close dropdown if clicked outside of any .dropdown
    if (!target.closest('.dropdown')) {
      this.openDropdown = null;
    }
  }
    @Output() sidebarToggle = new EventEmitter<void>();

  onToggleClick() {
    this.sidebarToggle.emit();
  }
textShortOpen = false;

  toggleTextShort() {
    this.textShortOpen = !this.textShortOpen;
  }
}
