/**
 * Testes básicos para o cliente API
 */

import { ApiClientError } from '@/lib/api/client';
import { authService } from '@/lib/api/features/auth';
import { usersService } from '@/lib/api/features/users';
import { gamesService } from '@/lib/api/features/games';

describe('API Client', () => {
  describe('ApiClientError', () => {
    it('should create error with message', () => {
      const error = new ApiClientError('Test error');
      expect(error.message).toBe('Test error');
      expect(error.name).toBe('ApiClientError');
    });

    it('should create error with status code', () => {
      const error = new ApiClientError('Not found', 404);
      expect(error.message).toBe('Not found');
      expect(error.status).toBe(404);
    });
  });

  describe('Auth Service', () => {
    it('should have login method', () => {
      expect(authService.login).toBeDefined();
      expect(typeof authService.login).toBe('function');
    });
  });

  describe('Users Service', () => {
    it('should have required methods', () => {
      expect(usersService.getMe).toBeDefined();
      expect(usersService.create).toBeDefined();
      expect(usersService.update).toBeDefined();
      expect(usersService.getStatistics).toBeDefined();
    });
  });

  describe('Games Service', () => {
    it('should have required methods', () => {
      expect(gamesService.getAll).toBeDefined();
      expect(gamesService.getConfirmations).toBeDefined();
      expect(gamesService.createConfirmation).toBeDefined();
    });
  });
});
