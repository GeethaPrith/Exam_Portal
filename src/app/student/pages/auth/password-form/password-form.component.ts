import { Component, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { AuthService } from '../../../../core/services/auth.service';
type UserRole = 'teacher' | 'admin' | 'superadmin' | 'student';
type FormMode = 'update' | 'forgot';

@Component({
  selector: 'app-password-form',
  imports: [SharedModule],
  templateUrl: './password-form.component.html',
  styleUrl: './password-form.component.scss'
})
export class PasswordFormComponent {
  @Input() role: UserRole = 'student';
    @Input() mode: FormMode = 'update';   // 👈 now you can control mode from parent

  //mode: FormMode = 'change';
  passwordForm!: FormGroup;
  resetForm!: FormGroup;
  emailSent = false;
  message = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.initForms();
  }

  initForms(): void {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  }

  get password() {
    return this.passwordForm.get('password');
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }

  onChangeSubmit(): void {
    if (this.passwordForm.valid) {
      console.log('Password changed:', this.passwordForm.value);
    }
  }


  setMode(newMode: FormMode): void {
    this.mode = newMode;
    this.emailSent = false;
  }
    onResetSubmit(): void {
    if (this.resetForm.valid) {
      const email = this.resetForm.value.email;
      this.authService.forgotPassword(email).subscribe({
        next: (res) => {
          this.emailSent = true;
          this.message = res.message || 'Reset email sent successfully.';
        },
        error: (err) => {
          this.message = 'Failed to send reset link. Try again later.';
          console.error(err);
        }
      });
    }
  }
}
