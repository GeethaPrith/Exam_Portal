import { Component, HostBinding, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from '../components/admin-sidebar/admin-sidebar.component';
import { AdminTopbarComponent } from '../components/admin-topbar/admin-topbar.component';
import { FooterComponent } from '../../student/components/footer/footer.component';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet,
    AdminSidebarComponent,
    AdminTopbarComponent,FooterComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  sidebarOpen = false;
  hideSidebar = false;
  hideFooter = false;
  loading = false;
  isMobile = false;
  
  @HostBinding('class.sidebar-open') get sidebarOpenClass() {
    return this.sidebarOpen;
  }

  @HostBinding('class.is-mobile') get isMobileClass() {
    return this.isMobile;
  }

  constructor(private router: Router) {

       // Check initial screen size
    this.checkScreenSize();

    // Listen to route changes for admin-specific logic
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        
        // Hide sidebar on auth pages
        this.hideSidebar = url.includes('/admin/auth');
        this.hideFooter = url.includes('/admin/auth');

        // Close sidebar on mobile after navigation
        if (this.isMobile) {
          this.sidebarOpen = false;
        }
      }
    });

  }

  ngOnInit(): void {
    // Initialize component
  }
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkScreenSize();
    
    // Auto-close sidebar on mobile
    if (this.isMobile && this.sidebarOpen) {
      this.sidebarOpen = false;
    }
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth < 992;
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    if (this.isMobile) {
      this.sidebarOpen = false;
    }
  }

  onOverlayClick(): void {
    this.sidebarOpen = false;
  }
}

//   toggleSidebar(): void {
//     this.sidebarOpen = !this.sidebarOpen;
//   }

//   closeSidebar(): void {
//     if (window.innerWidth < 992) {
//       this.sidebarOpen = false;
//     }
//   }

//   onResize(): void {
//     if (window.innerWidth >= 992) {
//       this.sidebarOpen = false;
//     }
//   }

// }
