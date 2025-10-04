// my-subscriptions.component.ts
import { Component, OnInit } from '@angular/core';
import { UserSubscription } from '../../../../core/models/subsciption.model';
import { SubscriptionService } from '../../../../core/services/subscription.service';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-my-subscriptions',
  imports: [SharedModule],
  templateUrl: './my-subscription.component.html',
  styleUrl: './my-subscription.component.scss'
})
export class MySubscriptionsComponent implements OnInit {

  subscription: UserSubscription | null = null;
  loading = false;

  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit() {
    this.loadSubscription();
  }

  loadSubscription() {
    this.loading = true;
    this.subscriptionService.getMySubscription().subscribe({
      next: (data) => {
        this.subscription = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load subscription', err);
        this.loading = false;
      }
    });
  }

  cancelSubscription() {
    if (this.subscription && confirm('Are you sure you want to cancel your subscription?')) {
      this.subscriptionService.cancelSubscription(this.subscription.id).subscribe({
        next: (response) => {
          alert(response.message);
          this.loadSubscription();
        },
        error: (err) => {
          console.error('Failed to cancel subscription', err);
          alert('Failed to cancel subscription');
        }
      });
    }
  }

  getStatusClass(): string {
    if (!this.subscription) return '';
    switch (this.subscription.status) {
      case 'active': return 'badge-success';
      case 'expired': return 'badge-danger';
      case 'cancelled': return 'badge-warning';
      default: return 'badge-secondary';
    }
  }
}