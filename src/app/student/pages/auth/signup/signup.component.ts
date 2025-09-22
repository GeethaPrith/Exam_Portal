import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { AuthService } from '../../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  imports: [ SharedModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private snackBar: MatSnackBar // inject snackbar
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      terms: [true, Validators.requiredTrue]
    });
  }

  onSignup() {
    if (this.signupForm.valid) {

      // Call your API
      this.authService.register(this.signupForm.value).subscribe({
        next: (res) => {
          this.snackBar.open('Registration successful! Please log in.', 'Close', {
            duration: 4000,
            panelClass: ['snack-success']
          });
          console.log('Registration success', res);
          this.router.navigate(['/account/login']);
        },
        error: (err) => {
          console.error('Registration failed', err);
          this.snackBar.open('Signup failed. Please try again.', 'Close', {
            duration: 4000,
            panelClass: ['snack-error']
          });
        }
      },
      );
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  get name() {
    return this.signupForm.get('name')!;
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
