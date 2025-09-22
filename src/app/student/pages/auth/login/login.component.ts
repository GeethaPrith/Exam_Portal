import { Component } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { LoginPayload} from '../../../../core/models/auth.model';
import { AuthService } from '../../../../core/services/auth.service';


@Component({
  selector: 'app-login',
  imports: [ SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  isSubmitted = false;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onLogin() {
    this.isSubmitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) return;

    this.loading = true;

    const payload: LoginPayload = {
      email: this.email.value,
      password: this.password.value
    };

    this.authService.login(payload).subscribe({
      next: (res) => {
        this.loading = false;

        // Save token/user info -> localStorage/sessionStorage
        localStorage.setItem('token', res.token);

        // Navigate to dashboard/home
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Invalid credentials, try again!';
      }
    });
  }
}