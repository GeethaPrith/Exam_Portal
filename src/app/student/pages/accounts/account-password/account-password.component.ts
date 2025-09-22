import { Component } from '@angular/core';
import { PasswordFormComponent } from '../../auth/password-form/password-form.component';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-account-password',
  imports: [PasswordFormComponent,SharedModule],
  templateUrl: './account-password.component.html',
  styleUrl: './account-password.component.scss'
})
export class AccountPasswordComponent {
  mode: 'change' | 'reset' = 'change'; // default mode
}
