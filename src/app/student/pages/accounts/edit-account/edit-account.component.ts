import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';

interface AccountForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
}

@Component({
  selector: 'app-edit-account',
  imports: [SharedModule],
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.scss'
})
export class EditAccountComponent {

  infoForm: FormGroup<AccountForm>;

  constructor(private fb: FormBuilder) {
    this.infoForm = this.fb.nonNullable.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get firstName() {
    return this.infoForm.controls.firstName;
  }

  get lastName() {
    return this.infoForm.controls.lastName;
  }

  get email() {
    return this.infoForm.controls.email;
  }

  onSave() {
    if (this.infoForm.valid) {
      console.log('Form submitted:', this.infoForm.value);
    }
  }
}




