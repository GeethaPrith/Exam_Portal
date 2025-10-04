import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthResponse, LoginPayload, LoginResponse, SignupPayload, User, ForgotPasswordPayload, UpdatePasswordPayload } from '../models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl = `${environment.apiUrl}/student/auth`;

  constructor(private http: HttpClient) { }

  /** Login user */
  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, payload).pipe(
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
  forgotPassword(email:string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/forgot-password`, {email});
  }

  /** Change password */
  updatePassword(payload: UpdatePasswordPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/update-password`, payload);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/profile`);
  }

  updateProfile(data: any): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/profile`, data);
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
  const token = this.getToken();
  if (!token) return false;
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.exp * 1000 > Date.now();
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
