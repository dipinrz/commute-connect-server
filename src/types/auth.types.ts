// src/types/auth.types.ts
import { User } from '../entities/user.entity';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  workBuilding: string;
  company?: string;
  designation?:string
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}