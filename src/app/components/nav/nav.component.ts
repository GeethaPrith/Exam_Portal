import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [SharedModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  constructor(private router: Router) {  }

register(){
      console.log('Register button clicked! Navigating to /register...');
      this.router.navigate(['/register']);
}
signIn(){
  this.router.navigate(['/signIn'])
}

studentProfile(){
  this.router.navigate(['/student-profile'])
}

}
