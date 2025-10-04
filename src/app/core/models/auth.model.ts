export interface LoginPayload {
  email: string;
  password: string;
}
export interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
  mobileNumber: Number;
}
export interface AuthResponse {
  message: string;
  success: string;
  token: string;
  user: User;
}
export interface User {
  mobileNumber: string;
  fullName: any;
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'teacher' | 'student';
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
export interface ForgotPasswordPayload {
  email: string;
}
export interface UpdatePasswordPayload {
  newPassword: string; // new password to set
}
