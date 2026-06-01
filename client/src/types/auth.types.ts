export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "USER" | "ADMIN";
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "USER" | "ADMIN";
}

export interface ProfileResponse {
  success: boolean;
  user: AuthUser;
}