import { api } from '@/lib/api/client';
import { USE_MOCK_DATA } from '@/lib/api/config';
import type { RankingResponse, RankingType } from './types';
import { mockGetRanking } from '@/lib/mock-data/rankings';

export const rankingsService = {
  get: async (type: RankingType): Promise<RankingResponse> => {
    if (USE_MOCK_DATA) {
      return mockGetRanking(type);
    }
    return api.get<RankingResponse>(`/ranking/${type}`);
  },
};
