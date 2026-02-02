import { api } from '@/lib/api/client';
import type { LoginRequest, LoginResponse } from './types';

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    return api.post<LoginResponse>('/auth/login', data);
  },
};
