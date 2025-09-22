import { Component, ElementRef, HostListener } from '@angular/core';
import { Router} from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-admin-sidebar',
  imports: [SharedModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss'
})
export class AdminSidebarComponent {
  dashboardOpen = false;
  examManagementOpen = false;
  userManagementOpen = false;
  contentManagementOpen = false;
  reportsOpen = false;
  systemOpen = false;
  accountOpen = false;
adminOpen = false;
teacherOpen = false;


  constructor(private router: Router, private elementRef: ElementRef) { }

  // ngOnInit(): void {
  //   // Initialize component
  // }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeAllMenus();
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
    this.adminOpen = false;
    this.teacherOpen = false;
  }

  toggleDashboardMenu(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    // Toggle the dashboard menu state
    if (this.dashboardOpen) {
      this.dashboardOpen = false;
    } else {
      this.closeAllMenus();
      this.dashboardOpen = true;
    }
  }
  toggleExamManagementMenu(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.examManagementOpen) {
      this.examManagementOpen = false;
    } else{
      this.closeAllMenus();
    this.examManagementOpen = true;
  }
  }
toggleUserManagementMenu(event: Event): void {
  event.preventDefault();
  event.stopPropagation();

  if(this.userManagementOpen){
    this.userManagementOpen = false;
  }else{
    this.closeAllMenus();
    this.userManagementOpen = true;
  }
}
toggleContentManagementMenu(event: Event): void {
  event.preventDefault();
  event.stopPropagation();

if(this.contentManagementOpen){
  this.contentManagementOpen = false;
}else{
  this.closeAllMenus();
  this.contentManagementOpen = true;
}
}
toggleReportsMenu(event: Event): void {
  event.preventDefault();
  event.stopPropagation();

  if(this.reportsOpen){
    this.reportsOpen = false;
  }else{
    this.closeAllMenus();
    this.reportsOpen = true;
  }
}
toggleSystemMenu(event: Event): void {
  event.preventDefault();
  event.stopPropagation();

  if(this.systemOpen){
    this.systemOpen = false;
  }else{
    this.closeAllMenus();
    this.systemOpen = true;
  }
}
toggleAccountMenu(event: Event): void {
  event.preventDefault();
  event.stopPropagation();

if(this.accountOpen){ 
  this.accountOpen = false;
}else{
  this.closeAllMenus();
  this.accountOpen = true;
}
}
navigateToRoute(route: string): void {
  this.router.navigate([route]);
  this.closeAllMenus();
}
closeMobileMenu(){
  const sidebar = document.querySelector('.sidebar');
  sidebar?.classList.toggle('mobile-menu-open');  
}
toggleAdminMenu(event: Event) {
  event.preventDefault();
  this.adminOpen = !this.adminOpen;
}

toggleTeacherMenu(event: Event) {
  event.preventDefault();
  this.teacherOpen = !this.teacherOpen;
}

}

