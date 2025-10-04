// subscription-plans.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionPlan, UserSubscription } from '../../../../core/models/subsciption.model';
import { SubscriptionService } from '../../../../core/services/subscription.service';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-subscription-plans',
  imports: [SharedModule],
  templateUrl: './subscription-plans.component.html',
  styleUrl: './subscription-plans.component.scss'
})
export class SubscriptionPlansComponent implements OnInit {

  plans: SubscriptionPlan[] = [];
  mySubscription: UserSubscription | null = null;
  loading = false;

  constructor(
    private subscriptionService: SubscriptionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPlans();
    this.loadMySubscription();
  }

  loadPlans() {
    this.loading = true;
    this.subscriptionService.getPlans().subscribe({
      next: (data) => {
        this.plans = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load plans', err);
        this.loading = false;
      }
    });
  }

  loadMySubscription() {
    this.subscriptionService.getMySubscription().subscribe({
      next: (data) => {
        this.mySubscription = data;
      },
      error: (err) => {
        console.error('Failed to load subscription', err);
      }
    });
  }

  buyPlan(planId: number) {
    this.subscriptionService.buySubscription(planId).subscribe({
      next: (response) => {
        alert(response.message);
        this.loadMySubscription();
      },
      error: (err) => {
        console.error('Failed to buy subscription', err);
        alert('Failed to purchase subscription');
      }
    });
  }

  cancelSubscription() {
    if (this.mySubscription && confirm('Are you sure you want to cancel your subscription?')) {
      this.subscriptionService.cancelSubscription(this.mySubscription.id).subscribe({
        next: (response) => {
          alert(response.message);
          this.loadMySubscription();
        },
        error: (err) => {
          console.error('Failed to cancel subscription', err);
          alert('Failed to cancel subscription');
        }
      });
    }
  }

  isActivePlan(planId: number): boolean {
    return this.mySubscription?.planId === planId && this.mySubscription?.status === 'active';
  }
}