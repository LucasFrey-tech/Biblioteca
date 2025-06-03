// frontend/api/auth.ts
import { apiClient } from './apiClient';

interface LoginData {
  email: string;
  password: string;
}

export const login = (data: LoginData) => {
  return apiClient<{ token: string }>('auth/login', 'POST', data);
};

export const getProfile = () => {
  return apiClient('auth/profile', 'GET');
};
