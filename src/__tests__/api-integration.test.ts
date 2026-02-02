/**
 * Testes de Integração da API
 * Testa a integração real com a API usando o usuário jogador01
 */

import { authService } from '@/lib/api/features/auth';
import { usersService } from '@/lib/api/features/users';
import { gamesService } from '@/lib/api/features/games';
import { rankingsService } from '@/lib/api/features/rankings';

describe('API Integration Tests', () => {
  let authToken: string;
  const testCredentials = {
    email: 'jogador01@futebol.com',
    password: 'jogador01',
  };

  beforeAll(async () => {
    // Realizar login antes de todos os testes
    try {
      const loginResponse = await authService.login(testCredentials);
      authToken = loginResponse.token;
      // Armazenar token no localStorage (simulado em ambiente de teste)
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', authToken);
      }
    } catch (error) {
      throw new Error(
        `Falha ao autenticar: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      );
    }
  });

  afterAll(() => {
    // Limpar token após os testes
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  });

  describe('Authentication', () => {
    it('should login successfully with valid credentials', async () => {
      const response = await authService.login(testCredentials);

      expect(response).toHaveProperty('token');
      expect(response).toHaveProperty('user');
      expect(response.user.email).toBe(testCredentials.email);
      expect(response.type).toBe('Bearer');
      expect(response.expiresIn).toBe(86400);
    });

    it('should reject invalid credentials', async () => {
      await expect(
        authService.login({
          email: 'invalid@email.com',
          password: 'wrongpassword',
        })
      ).rejects.toThrow();
    });
  });

  describe('Users Service', () => {
    it('should get current user information', async () => {
      const user = await usersService.getMe();

      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('fullName');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('profile');
      expect(user.email).toBe(testCredentials.email);
    });

    it('should create new user with JOGADOR profile', async () => {
      // Gera email único baseado em timestamp para evitar conflitos
      const timestamp = Date.now();
      const newUserEmail = `testuser${timestamp}@futebol.com`;
      const newUserData = {
        fullName: `Usuário Teste ${timestamp}`,
        email: newUserEmail,
        password: 'senha123456',
        profile: 'JOGADOR',
      };

      const newUser = await usersService.create(newUserData);

      expect(newUser).toHaveProperty('id');
      expect(newUser).toHaveProperty('fullName');
      expect(newUser).toHaveProperty('email');
      expect(newUser).toHaveProperty('profile');
      expect(newUser.email).toBe(newUserEmail);
      expect(newUser.profile).toBe('JOGADOR');
      expect(newUser.fullName).toBe(newUserData.fullName);
    });
  });

  describe('Games Service', () => {
    it('should get list of games', async () => {
      const games = await gamesService.getAll();

      expect(Array.isArray(games)).toBe(true);
      if (games.length > 0) {
        expect(games[0]).toHaveProperty('id');
        expect(games[0]).toHaveProperty('gameDate');
        expect(games[0]).toHaveProperty('released');
      }
    });

    it('should get confirmations for a game', async () => {
      const games = await gamesService.getAll();
      if (games.length > 0) {
        const gameId = games[0].id;
        const confirmations = await gamesService.getConfirmations(gameId);

        expect(Array.isArray(confirmations)).toBe(true);
      }
    });
  });

  describe('Rankings Service', () => {
    it('should get goals ranking', async () => {
      const ranking = await rankingsService.get('goals');

      expect(ranking).toHaveProperty('type');
      expect(ranking).toHaveProperty('description');
      expect(ranking).toHaveProperty('items');
      expect(ranking).toHaveProperty('total');
      expect(ranking.type).toBe('goals');
      expect(Array.isArray(ranking.items)).toBe(true);
    });

    it('should get victories ranking', async () => {
      const ranking = await rankingsService.get('victories');

      expect(ranking.type).toBe('victories');
      expect(Array.isArray(ranking.items)).toBe(true);
    });
  });
});
