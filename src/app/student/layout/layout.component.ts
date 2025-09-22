import { AfterViewInit, Component, HostBinding, Renderer2 } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { NavComponent } from '../components/nav/nav.component';
import { FooterComponent } from '../components/footer/footer.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  imports: [NavComponent, FooterComponent, SidebarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements AfterViewInit {
  hideSidebar = false;
  hideFooter = false;
  sidebarOpen = false;
  loading = true;

    constructor(private router: Router, private renderer: Renderer2) {
    // Single subscription to handle all navigation events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }

      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        const url = (event instanceof NavigationEnd ? event.urlAfterRedirects : this.router.url) || '/home';

        // Hide sidebar/footer on exam pages
        this.hideSidebar = url.includes('/exam');
        this.hideFooter = url.includes('/exam');

        // Stop preloader
        this.loading = false;
      }
    });

    // Safety fallback if router events don't fire
    setTimeout(() => this.loading = false, 1000);
  }

  ngAfterViewInit() {
    // Make sidebar scrollable if it exists
    const sidebarEl = document.querySelector('.main-content .sidebar');
    if (sidebarEl) {
      this.renderer.setStyle(sidebarEl, 'overflow-y', 'auto');
    }
  }

  @HostBinding('class.has-drawer-opened') get hasDrawerOpened() {
    return this.sidebarOpen;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

}
