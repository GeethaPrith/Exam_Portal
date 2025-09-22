import { Component} from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'examPortal';

  
  isExamPage: boolean = false;
  isProfile: boolean = false;
  loading = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }

      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        const url = (event as NavigationEnd).urlAfterRedirects;
        this.isExamPage = url.includes('/exam');
        this.isProfile = url.includes('/profile');
        this.loading = false;
      }
    });
  }
  }
