import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators, } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { PasswordFormComponent } from '../password-form/password-form.component';


@Component({
  selector: 'app-change-password',
  imports: [SharedModule,PasswordFormComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  passwordForm;
  constructor(private fb: FormBuilder) {

    this.passwordForm = this.fb.nonNullable.group(

      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }
  // getters for template access
  get password() {
    return this.passwordForm.get('password');
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }

  // ✅ custom validator
  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      console.log('Form submitted:', this.passwordForm.value);
    }
  }
  onReset() {
    this.passwordForm.reset();
    console.log('Form reset');
  }
}
