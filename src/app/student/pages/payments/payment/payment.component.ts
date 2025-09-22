import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-payment',
  imports: [SharedModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {

  paymentMethods = [
    { label: 'Debit / Credit Card', value: 'cc' },
    { label: 'PayPal', value: 'pp' },
  ];

  months = [
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];

  years = Array.from({ length: 12 }, (_, i) => new Date().getFullYear() + i);

  paymentForm: FormGroup;

  // ✅ Inject FormBuilder here
  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      paymentType: ['cc', Validators.required],
      cardNumber: [''],
      cvv: [''],
      expiryMonth: [''],
      expiryYear: [''],
    });
  }

  onPay() {
    if (this.paymentForm.valid) {
      console.log('Payment Data:', this.paymentForm.value);
      // handle payment logic here
    }
  }
}
