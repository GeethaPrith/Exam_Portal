import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoginRequest } from '../../../core/models/admin-auth.model';
import { AdminAuthService } from '../../../core/services/admin-auth.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-admin-signin',
  imports: [SharedModule],
  templateUrl: './admin-signin.component.html',
  styleUrl: './admin-signin.component.scss'
})
export class AdminSigninComponent {
  loginForm!: FormGroup;
  loading = false;
  errorMessage = '';
  showPassword = false;
  private destroy$ = new Subject<void>();
  private returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private adminAuthService: AdminAuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
    
    // Redirect if already logged in
    if (this.adminAuthService.isLoggedIn()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  
  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }
  
onSubmit() {
  if (this.loginForm.invalid) {
    this.markFormGroupTouched();
    return;
  }

  this.loading = true;
  this.errorMessage = '';

  const credentials: LoginRequest = {
    email: this.f['email'].value,
    password: this.f['password'].value,
    rememberMe: this.f['rememberMe'].value
  };

  this.adminAuthService.login(credentials)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if (response.success) {
          localStorage.setItem('authToken', response.token ?? '');
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.errorMessage = response.message || 'Login failed. Please try again.';
        }
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error.message || 'An error occurred during login. Please try again.';
        this.loading = false;
      }
    });
}
}