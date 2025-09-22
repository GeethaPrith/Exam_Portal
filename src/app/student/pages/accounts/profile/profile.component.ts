import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-profile',
  imports: [SharedModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileForm: FormGroup;
  previewUrl: string = '/assets/images/guy-3.jpg'; // default image

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      photo: ['Choose File',null],
      profileName: ['', [Validators.required, Validators.minLength(3)]],
      about: [''],
      displayRealName: [true],
      allowPublic: [true]
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.profileForm.patchValue({ photo: file });
      this.profileForm.get('photo')?.updateValueAndValidity();

      // Image preview
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Form submitted:', this.profileForm.value);
      // TODO: API call to save profile
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

}
