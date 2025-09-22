import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { PasswordFormComponent } from '../password-form/password-form.component';

@Component({
  selector: 'app-reset-password',
  imports: [SharedModule,PasswordFormComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  emailSent = false;

  constructor(private fb: FormBuilder) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      const email = this.resetForm.value.email;
      console.log('Reset password request for:', email);
      
      // Simulate API call
      this.emailSent = true;

      // TODO: Replace with your service call
      // this.authService.resetPassword(email).subscribe(() => this.emailSent = true);
    } else {
      this.resetForm.markAllAsTouched();
    }
  }

}
