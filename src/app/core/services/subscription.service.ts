// subscription.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SubscriptionPlan, UserSubscription, SubscriptionResponse } from '../models/subsciption.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private baseUrl = `${environment.apiUrl}/student/subscription`;

  constructor(private http: HttpClient) {}

  getPlans(): Observable<SubscriptionPlan[]> {
    return this.http.get<SubscriptionPlan[]>(`${this.baseUrl}/plans`);
  }

  getMySubscription(): Observable<UserSubscription> {
    return this.http.get<UserSubscription>(`${this.baseUrl}/my-subscriptions`);
  }

  buySubscription(planId: number): Observable<SubscriptionResponse> {
    return this.http.post<SubscriptionResponse>(`${this.baseUrl}/buy`, { planId });
  }

  cancelSubscription(subscriptionId: number): Observable<SubscriptionResponse> {
    return this.http.delete<SubscriptionResponse>(`${this.baseUrl}/${subscriptionId}`);
  }
}