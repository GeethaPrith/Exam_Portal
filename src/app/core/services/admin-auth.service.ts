import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, catchError, throwError } from 'rxjs';
import { ChangePasswordRequest, LoginRequest, RegisterRequest, ResetPasswordRequest, AuthResponse, User } from '../models/admin-auth.model';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  private baseUrl = environment.apiUrl;

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  public currentUser$ = this.currentUserSubject.asObservable();
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const token = this.getToken();
    const user = this.getUserFromStorage();

    if (token && user) {
      this.currentUserSubject.next(user);
      this.isLoggedInSubject.next(true);
    }
  }

  private getHttpOptions() {
    const token = this.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      })
    };
  }

  // Authentication Methods
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials, this.getHttpOptions())
      .pipe(
        map(response => {
          if (response.success && response.token && response.user) {
            this.setAuthData(response.token, response.user, credentials.rememberMe);
          }
          return response;
        }),
        catchError(this.handleError)
      );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, userData, this.getHttpOptions())
      .pipe(
        map(response => {
          if (response.success && response.token && response.user) {
            this.setAuthData(response.token, response.user);
          }
          return response;
        }),
        catchError(this.handleError)
      );
  }

  resetPassword(email: ResetPasswordRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/reset-password`, email, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  changePassword(passwordData: ChangePasswordRequest): Observable<AuthResponse> {
    return this.http.put<AuthResponse>(`${this.baseUrl}/change-password`, passwordData, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  logout(): void {
    // Call API to logout (optional)
    this.http.post(`${this.baseUrl}/logout`, {}, this.getHttpOptions()).subscribe();

    this.clearAuthData();
    this.router.navigate(['/admin/auth/login']);
  }

  // Token Management
  getToken(): string | null {
    return localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token');
  }

  private setToken(token: string, rememberMe = false): void {
    if (rememberMe) {
      localStorage.setItem('admin_token', token);
    } else {
      sessionStorage.setItem('admin_token', token);
    }
  }

  private removeToken(): void {
    localStorage.removeItem('admin_token');
    sessionStorage.removeItem('admin_token');
  }

  // User Management
  getUser(): User | null {
    return this.currentUserSubject.value;
  }

  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem('admin_user') || sessionStorage.getItem('admin_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  private setUser(user: User, rememberMe = false): void {
    this.currentUserSubject.next(user);
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('admin_user', JSON.stringify(user));
  }

  private removeUser(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('admin_user');
    sessionStorage.removeItem('admin_user');
  }

  // Auth State Management
  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  isSuperAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'super_admin' || false;
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return (user?.role === 'admin' || user?.role === 'super_admin') ? true : false;
  }

  isTeacher(): boolean {
    const user = this.getUser();
    return user?.role === 'teacher' || false;
  }

  private setAuthData(token: string, user: User, rememberMe = false): void {
    this.setToken(token, rememberMe);
    this.setUser(user, rememberMe);
    this.isLoggedInSubject.next(true);
  }

  private clearAuthData(): void {
    this.removeToken();
    this.removeUser();
    this.isLoggedInSubject.next(false);
  }

  private handleError(error: any): Observable<never> {
    console.error('Auth Service Error:', error);
    let errorMessage = 'An unexpected error occurred';

    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return throwError(() => new Error(errorMessage));
  }

  // Utility Methods
  refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/refresh-token`, {}, this.getHttpOptions())
      .pipe(
        map(response => {
          if (response.success && response.token) {
            const currentUser = this.getUser();
            if (currentUser) {
              const rememberMe = localStorage.getItem('admin_token') !== null;
              this.setToken(response.token, rememberMe);
            }
          }
          return response;
        }),
        catchError(this.handleError)
      );
  }

  checkEmailExists(email: string): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(`${this.baseUrl}/check-email/${email}`, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }
}
