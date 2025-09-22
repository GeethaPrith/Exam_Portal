import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-admin-register',
  imports: [SharedModule],
  templateUrl: './admin-register.component.html',
  styleUrl: './admin-register.component.scss'
})
export class AdminRegisterComponent {
    registerForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        role: ['', [Validators.required]],
        password: ['', [Validators.required, AdminRegisterComponent.strongPassword]],
        confirmPassword: ['', [Validators.required]],
        acceptTerms: [false, [Validators.requiredTrue]]
      },
      { validators: AdminRegisterComponent.passwordMatch }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    this.loading = true;
    // simulate API call
    setTimeout(() => {
      this.loading = false;
      this.successMessage = 'Account created successfully!';
      this.registerForm.reset();
    }, 1500);
  }

  static passwordMatch(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (!password || !confirmPassword) return null;
    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  static strongPassword(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (!value) return null;
    const hasNumber = /[0-9]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const valid = hasNumber && hasUpper && hasLower && hasSpecial && value.length >= 8;
    return valid ? null : { weakPassword: true };
  }

}
