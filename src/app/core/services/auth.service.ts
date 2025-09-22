import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthResponse, LoginPayload, LoginResponse, SignupPayload, User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'https://dummyjson.com/auth/login'; // 🔥 replace with real API
  private baseUrl = 'https://your-api-url.com/api'; // Replace with your actual API

  constructor(private http: HttpClient) { }

    /** Login user */
  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}`, payload).pipe(
      tap((res: LoginResponse) => {
        this.setSession(res.token, res.user);
      })
    );
  }

  /** Register user */
  register(payload: SignupPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, payload);
  }

  /** Reset password */
  resetPassword(email: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/reset-password`, { email });
  }

  /** Change password */
  changePassword(payload: { oldPassword: string; newPassword: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/change-password`, payload);
  }

  /** Store session */
  private setSession(token: string, user: User): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  /** Clear session */
  clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /** Logout */
  logout(): void {
    this.clearSession();
  }

  /** Is logged in */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /** Get token */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /** Get user */
  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  /** Role-based access */
  hasRole(role: string): boolean {
    const user = this.getUser();
    return user?.role === role;
  }
}
