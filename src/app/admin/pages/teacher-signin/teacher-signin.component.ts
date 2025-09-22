import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeacherAuthService } from '../../../core/services/teacher-auth.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-teacher-signin',
  imports: [SharedModule],
  templateUrl: './teacher-signin.component.html',
  styleUrl: './teacher-signin.component.scss'
})
export class TeacherSigninComponent {
  signinForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private teacherAuthService: TeacherAuthService,
    private router: Router
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() {
    return this.signinForm.controls;
  }

  onSubmit(): void {
    if (this.signinForm.invalid) {
      this.signinForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    const { email, password } = this.signinForm.value;

    this.teacherAuthService.signin(email, password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/teacher/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Signin failed. Please try again.';
      }
    });
  }
}
