import { Component, ElementRef, HostListener } from '@angular/core';
import { Router} from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-admin-topbar',
  imports: [SharedModule],
  templateUrl: './admin-topbar.component.html',
  styleUrl: './admin-topbar.component.scss'
})
export class AdminTopbarComponent {
  searchQuery: string = '';
  openDropdown: string | null = null;

  notifications = [
    { id: 1, title: 'New student registration', time: '2 mins ago', type: 'user', read: false },
    { id: 2, title: 'Exam results published', time: '1 hour ago', type: 'exam', read: false },
    { id: 3, title: 'System backup completed', time: '3 hours ago', type: 'system', read: true },
    { id: 4, title: 'New teacher profile created', time: '1 day ago', type: 'user', read: true }
  ];

  constructor(private router: Router, private elementRef: ElementRef) {}

  // ngOnInit(): void {
  //   // Initialize component
  // }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.openDropdown = null;
    }
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/admin/search'], { 
        queryParams: { q: this.searchQuery.trim() } 
      });
    }
  }

  toggleDropdown(dropdown: string): void {
    this.openDropdown = this.openDropdown === dropdown ? null : dropdown;
  }

  navigateAndClose(route: string): void {
    this.router.navigate([route]);
    this.openDropdown = null;
  }

  markNotificationAsRead(id: number): void {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
  }

  markAllNotificationsAsRead(): void {
    this.notifications.forEach(n => n.read = true);
  }

  getUnreadNotificationCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  logout(): void {
    // Implement logout logic
    localStorage.removeItem('adminToken');
    this.router.navigate(['/admin/auth/login']);
  }

  teacherLogin(): void {
    // Navigate to teacher login or switch to teacher mode
    this.router.navigate(['/teacher/auth/login']);
  }

  switchToStudentPortal(): void {
    // Navigate to student portal
    this.router.navigate(['/student/dashboard']);
  }
}
