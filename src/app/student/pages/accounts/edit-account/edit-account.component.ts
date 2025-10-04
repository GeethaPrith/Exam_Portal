import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { AuthService } from '../../../../core/services/auth.service';

interface AccountForm {
  fullName: FormControl<string>;
  email: FormControl<string>;
  mobileNumber: FormControl<string>;
}

@Component({
  selector: 'app-edit-account',
  imports: [SharedModule],
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.scss'
})
export class EditAccountComponent {

  infoForm: FormGroup<AccountForm>;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.infoForm = this.fb.nonNullable.group({
      fullName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.authService.getProfile().subscribe({
      next: (res) => {
        this.infoForm.patchValue({
          fullName: res.fullName || '',
          mobileNumber: res.mobileNumber || '',
          email: res.email || ''
        });
      },
      error: (err) => console.error('Failed to load profile', err)
    });
  }

  get fullName() {
    return this.infoForm.controls.fullName;
  }

  get mobileNumber() {
    return this.infoForm.controls.mobileNumber;
  }

  get email() {
    return this.infoForm.controls.email;
  }

  onSave() {
    if (this.infoForm.valid) {
      const payload = {
        fullName: this.fullName?.value,
       mobileNumber: this.mobileNumber?.value,
        email: this.email?.value
      };

      this.authService.updateProfile(payload).subscribe({
        next: (res) => {
          console.log('Profile updated', res),
        localStorage.setItem('user', JSON.stringify(res));
        },
        error: (err) => console.error('Update failed', err)
      });
    } else {
      this.infoForm.markAllAsTouched();
    }
  }
}




