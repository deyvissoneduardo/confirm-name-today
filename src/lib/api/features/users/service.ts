import { api } from '@/lib/api/client';
import type { User, CreateUserRequest, UserStatistics } from './types';

export const usersService = {
  getMe: async (): Promise<User> => {
    return api.get<User>('/users/me');
  },
  create: async (data: CreateUserRequest): Promise<User> => {
    return api.post<User>('/users', data);
  },
  getStatistics: async (): Promise<UserStatistics> => {
    return api.get<UserStatistics>('/users/me/statistics');
  },
};
