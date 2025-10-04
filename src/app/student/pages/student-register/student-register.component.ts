import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-student-register',
  imports: [SharedModule,RouterLink],
  templateUrl: './student-register.component.html',
  styleUrl: './student-register.component.scss'
})
export class StudentRegisterComponent {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      terms: [true, Validators.requiredTrue]
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      const { fullName, email, password, mobileNumber } = this.signupForm.value; // strip terms

      this.authService.register({ fullName, email, password, mobileNumber }).subscribe({
        next: (res) => {
          this.snackBar.open('Registration successful! Please log in.', 'Close', {
            duration: 4000,
            panelClass: ['snack-success']
          });
          this.router.navigate(['/account/login']);
        },
        error: (err) => {
          console.error('Registration failed', err);
          this.snackBar.open('Signup failed. Please try again.', 'Close', {
            duration: 4000,
            panelClass: ['snack-error']
          });
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  get fullName() {
    return this.signupForm.get('fullName')!;
  }

  get email() {
    return this.signupForm.get('email')!;
  }

  get password() {
    return this.signupForm.get('password')!;
  }

  get terms() {
    return this.signupForm.get('terms')!;
  }
}
