import { Component, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-password-form',
  imports: [SharedModule],
  templateUrl: './password-form.component.html',
  styleUrl: './password-form.component.scss'
})
export class PasswordFormComponent {
  @Input() mode: 'change' | 'reset' = 'change'; // default
  passwordForm!: FormGroup;
  resetForm!: FormGroup;
  emailSent = false;

  constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
    this.buildForms();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mode'] && !changes['mode'].firstChange) {
      this.buildForms();       // rebuild when mode switches
      this.emailSent = false;  // reset any previous state
    }
  }
  private buildForms(): void {
    if (this.mode === 'change') {
      this.passwordForm = this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
        },
        { validators: this.passwordMatchValidator }
      );
            this.resetForm = undefined as any;

    } else {
      this.resetForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
      });
            this.passwordForm = undefined as any;

    }
  }

  get password(): AbstractControl | null {
    return this.passwordForm?.get('password') || null;
  }
  get confirmPassword(): AbstractControl | null {
    return this.passwordForm?.get('confirmPassword') || null;
  }

  passwordMatchValidator(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  onChangeSubmit() {
    if (this.passwordForm.valid) {
      console.log('Password changed:', this.passwordForm.value);
    }
  }

  onResetSubmit() {
    if (this.resetForm.valid) {
      console.log('Reset link sent to:', this.resetForm.value.email);
      this.emailSent = true;
    }
  }

}
