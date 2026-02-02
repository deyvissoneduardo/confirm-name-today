import { api } from '@/lib/api/client';
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserStatistics,
} from './types';

export const usersService = {
  getMe: async (): Promise<User> => {
    return api.get<User>('/users/me');
  },
  create: async (data: CreateUserRequest): Promise<User> => {
    return api.post<User>('/users', data);
  },
  update: async (id: string, data: UpdateUserRequest): Promise<User> => {
    return api.put<User>(`/users/${id}`, data);
  },
  getStatistics: async (): Promise<UserStatistics> => {
    return api.get<UserStatistics>('/users/me/statistics');
  },
};
