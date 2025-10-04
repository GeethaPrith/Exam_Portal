import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [SharedModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileForm: FormGroup;
  previewUrl: string = '/assets/images/guy-3.jpg'; // default image

  constructor(private fb: FormBuilder, private authService: AuthService) {
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
    const formData = new FormData();
    
    // Append file if exists
    const photoControl = this.profileForm.get('photo');
    if (photoControl?.value && photoControl.value instanceof File) {
      formData.append('photo', photoControl.value);
    }
    
    // Append other form fields
    formData.append('profileName', this.profileForm.get('profileName')?.value);
    formData.append('about', this.profileForm.get('about')?.value || '');
    formData.append('displayRealName', this.profileForm.get('displayRealName')?.value);
    formData.append('allowPublic', this.profileForm.get('allowPublic')?.value);
    
    this.authService.updateProfile(formData).subscribe({
      next: (response) => {
        console.log('Profile updated successfully', response);
        // Update local storage with new user data
        localStorage.setItem('user', JSON.stringify(response));
      },
      error: (error) => {
        console.error('Error updating profile', error);
      }
    });
  } else {
    this.profileForm.markAllAsTouched();
  }
}


}
