export interface LoginPayload {
  email: string;
  password: string;
}
export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  terms: boolean;
}
export interface AuthResponse {
  message: string;
  success: string;
  token: string;
  user: User;
}
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';

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
