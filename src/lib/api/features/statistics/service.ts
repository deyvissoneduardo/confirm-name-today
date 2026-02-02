import { api } from '@/lib/api/client';
import { USE_MOCK_DATA } from '@/lib/api/config';
import type { UserStatistics } from './types';
import { mockGetStatistics } from '@/lib/mock-data/statistics';

export const statisticsService = {
  getMe: async (): Promise<UserStatistics> => {
    if (USE_MOCK_DATA) {
      const userId = '100e8400-e29b-41d4-a716-446655440001';
      return mockGetStatistics(userId);
    }
    return api.get<UserStatistics>('/users/me/statistics');
  },
};
