// subscription.model.ts
export interface SubscriptionPlan {
  id: number;
  name: string;
  duration: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  billingCycle: 'monthly' | 'yearly';
}

export interface UserSubscription {
  id: number;
  planId: number;
  planName: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'cancelled';
  autoRenew: boolean;
}

export interface SubscriptionResponse {
  success: boolean;
  message: string;
  subscription?: UserSubscription;
}