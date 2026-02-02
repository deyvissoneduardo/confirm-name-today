import { api } from '@/lib/api/client';
import { USE_MOCK_DATA } from '@/lib/api/config';
import type { Game, Confirmation, CreateConfirmationRequest } from './types';
import {
  mockGetActiveGame,
  mockGetConfirmations,
  mockCreateConfirmation,
} from '@/lib/mock-data/games';

export const gamesService = {
  getAll: async (): Promise<Game[]> => {
    if (USE_MOCK_DATA) {
      return mockGetActiveGame();
    }
    return api.get<Game[]>('/games');
  },

  getConfirmations: async (gameId: string): Promise<Confirmation[]> => {
    if (USE_MOCK_DATA) {
      const userId = '100e8400-e29b-41d4-a716-446655440001';
      return mockGetConfirmations(gameId, userId);
    }
    return api.get<Confirmation[]>(`/games/${gameId}/confirmations/me`);
  },

  createConfirmation: async (
    gameId: string,
    data: CreateConfirmationRequest
  ): Promise<Confirmation> => {
    if (USE_MOCK_DATA) {
      return mockCreateConfirmation(
        gameId,
        data.confirmedName,
        data.isGuest || false
      );
    }
    return api.post<Confirmation>(`/games/${gameId}/confirmations`, data);
  },
};
