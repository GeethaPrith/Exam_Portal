import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  
  @Input() isMobileMenuOpen = false;
  @Output() mobileMenuClose = new EventEmitter<void>();

  dashboardOpen = false;
  examManagementOpen = false;
  userManagementOpen = false;
  contentManagementOpen = false;
  reportsOpen = false;
  systemOpen = false;
  accountOpen = false;

  constructor(private router: Router, private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(target) && 
        !target.closest('.mobile-menu-toggle')) {
      this.closeAllMenus();
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    if (window.innerWidth > 992) {
      this.closeMobileMenu();
    }
  }

  closeAllMenus(): void {
    this.dashboardOpen = false;
    this.examManagementOpen = false;
    this.userManagementOpen = false;
    this.contentManagementOpen = false;
    this.reportsOpen = false;
    this.systemOpen = false;
    this.accountOpen = false;
  }

  toggleAccountMenu(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (this.accountOpen) {
      this.accountOpen = false;
    } else {
      this.closeAllMenus();
      this.accountOpen = true;
    }
  }

  closeMobileMenu(): void {
    this.mobileMenuClose.emit();
  }

  navigateToRoute(route: string): void {
    this.router.navigate([route]);
    this.closeAllMenus();
    
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  onSubmenuClick(event: Event): void {
    event.stopPropagation();
    
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }
}

// export class SidebarComponent {

//     dashboardOpen = false;
//   examManagementOpen = false;
//   userManagementOpen = false;
//   contentManagementOpen = false;
//   reportsOpen = false;
//   systemOpen = false;
//   accountOpen = false;

//   constructor(private router: Router, private elementRef: ElementRef) { }

//   // ngOnInit(): void {
//   //   // Initialize component
//   // }


//   @HostListener('document:click', ['$event'])
//   onDocumentClick(event: Event): void {
//     if (!this.elementRef.nativeElement.contains(event.target)) {
//       this.closeAllMenus();
//     }
//   }

//   closeAllMenus(): void {
//     this.dashboardOpen = false;
//     this.examManagementOpen = false;
//     this.userManagementOpen = false;
//     this.contentManagementOpen = false;
//     this.reportsOpen = false;
//     this.systemOpen = false;
//     this.accountOpen = false;
//   }

//   toggleDashboardMenu(event: Event): void {
//     event.preventDefault();
//     event.stopPropagation();

//     // Toggle the dashboard menu state
//     if (this.dashboardOpen) {
//       this.dashboardOpen = false;
//     } else {
//       this.closeAllMenus();
//       this.dashboardOpen = true;
//     }
//   }
//   toggleExamManagementMenu(event: Event): void {
//     event.preventDefault();
//     event.stopPropagation();

//     if (this.examManagementOpen) {
//       this.examManagementOpen = false;
//     } else{
//       this.closeAllMenus();
//     this.examManagementOpen = true;
//   }
//   }
// toggleUserManagementMenu(event: Event): void {
//   event.preventDefault();
//   event.stopPropagation();

//   if(this.userManagementOpen){
//     this.userManagementOpen = false;
//   }else{
//     this.closeAllMenus();
//     this.userManagementOpen = true;
//   }
// }
// toggleContentManagementMenu(event: Event): void {
//   event.preventDefault();
//   event.stopPropagation();

// if(this.contentManagementOpen){
//   this.contentManagementOpen = false;
// }else{
//   this.closeAllMenus();
//   this.contentManagementOpen = true;
// }
// }
// toggleReportsMenu(event: Event): void {
//   event.preventDefault();
//   event.stopPropagation();

//   if(this.reportsOpen){
//     this.reportsOpen = false;
//   }else{
//     this.closeAllMenus();
//     this.reportsOpen = true;
//   }
// }
// toggleSystemMenu(event: Event): void {
//   event.preventDefault();
//   event.stopPropagation();

//   if(this.systemOpen){
//     this.systemOpen = false;
//   }else{
//     this.closeAllMenus();
//     this.systemOpen = true;
//   }
// }
// toggleAccountMenu(event: Event): void {
//   event.preventDefault();
//   event.stopPropagation();

// if(this.accountOpen){ 
//   this.accountOpen = false;
// }else{
//   this.closeAllMenus();
//   this.accountOpen = true;
// }
// }
// navigateToRoute(route: string): void {
//   this.router.navigate([route]);
//   this.closeAllMenus();
// }
// }


//   accountOpen = false;
//   studentOpen = false;
//   communityOpen = false;
  
//   toggleStudentMenu(event: Event) {
//     event.preventDefault(); // prevent page jump
//     this.studentOpen = !this.studentOpen;
//   }

//   toggleCommunityMenu(event: Event) {
//     event.preventDefault(); // prevent page jump
//     this.communityOpen = !this.communityOpen;
//   }
//   toggleAccountMenu(event: Event) {
//     event.preventDefault(); // prevent page jump
//     this.accountOpen = !this.accountOpen;
//   }
// }

