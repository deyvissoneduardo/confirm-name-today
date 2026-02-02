/**
 * Testes para Cadastro de Usuário
 * Verifica que o cadastro funciona corretamente com profile JOGADOR
 */

import { usersService } from '@/lib/api/features/users';
import type { CreateUserRequest } from '@/lib/api/features/users/types';

describe('User Registration', () => {
  describe('CreateUserRequest Type', () => {
    it('should include profile field in CreateUserRequest', () => {
      const createRequest: CreateUserRequest = {
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        profile: 'JOGADOR',
      };

      expect(createRequest).toHaveProperty('profile');
      expect(createRequest.profile).toBe('JOGADOR');
    });

    it('should require profile field', () => {
      // TypeScript deve exigir o campo profile
      const createRequest: CreateUserRequest = {
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        profile: 'JOGADOR', // Campo obrigatório
      };

      expect(createRequest.profile).toBeDefined();
    });

    it('should allow optional photo field', () => {
      const createRequest: CreateUserRequest = {
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        profile: 'JOGADOR',
        photo:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      };

      expect(createRequest).toHaveProperty('photo');
      expect(typeof createRequest.photo).toBe('string');
    });
  });

  describe('Users Service - Create Method', () => {
    let originalFetch: typeof global.fetch;
    let mockFetch: jest.Mock;

    beforeEach(() => {
      originalFetch = global.fetch;
      mockFetch = jest.fn();
      global.fetch = mockFetch;
    });

    afterEach(() => {
      global.fetch = originalFetch;
    });

    it('should have create method that accepts CreateUserRequest', () => {
      expect(usersService.create).toBeDefined();
      expect(typeof usersService.create).toBe('function');
    });

    it('should send profile JOGADOR in request body', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 201,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          id: 'test-id',
          fullName: 'Test User',
          email: 'test@example.com',
          profile: 'JOGADOR',
          photo: null,
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      } as Response);

      const createRequest: CreateUserRequest = {
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        profile: 'JOGADOR',
      };

      const result = await usersService.create(createRequest);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('profile');
      expect(result.profile).toBe('JOGADOR');

      // Verificar que o fetch foi chamado
      expect(mockFetch).toHaveBeenCalledTimes(1);

      // Verificar o body da requisição
      const callArgs = mockFetch.mock.calls[0];
      const requestBody = JSON.parse(callArgs[1]?.body as string);

      expect(requestBody).toHaveProperty('profile');
      expect(requestBody.profile).toBe('JOGADOR');
      expect(requestBody.fullName).toBe('Test User');
      expect(requestBody.email).toBe('test@example.com');
      expect(requestBody.password).toBe('password123');
    });

    it('should send correct request format matching API expectations', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 201,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          id: 'test-id',
          fullName: 'jogador',
          email: 'jogador@futebol.com',
          profile: 'JOGADOR',
          photo: null,
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      } as Response);

      const createRequest: CreateUserRequest = {
        fullName: 'jogador',
        email: 'jogador@futebol.com',
        password: 'jogador1234',
        profile: 'JOGADOR',
      };

      await usersService.create(createRequest);

      // Verificar formato exato do body
      const callArgs = mockFetch.mock.calls[0];
      const requestBody = JSON.parse(callArgs[1]?.body as string);

      // Verificar que tem todos os campos esperados pela API
      expect(requestBody).toEqual({
        fullName: 'jogador',
        email: 'jogador@futebol.com',
        password: 'jogador1234',
        profile: 'JOGADOR',
      });
    });

    it('should include photo in request when provided', async () => {
      const photoBase64 =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

      mockFetch.mockResolvedValue({
        ok: true,
        status: 201,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          id: 'test-id',
          fullName: 'Test User',
          email: 'test@example.com',
          profile: 'JOGADOR',
          photo: photoBase64,
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      } as Response);

      const createRequest: CreateUserRequest = {
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        profile: 'JOGADOR',
        photo: photoBase64,
      };

      await usersService.create(createRequest);

      const callArgs = mockFetch.mock.calls[0];
      const requestBody = JSON.parse(callArgs[1]?.body as string);

      expect(requestBody).toHaveProperty('photo');
      expect(requestBody.photo).toBe(photoBase64);
      expect(requestBody.profile).toBe('JOGADOR');
    });

    it('should use correct API endpoint', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 201,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          id: 'test-id',
          fullName: 'Test User',
          email: 'test@example.com',
          profile: 'JOGADOR',
          photo: null,
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      } as Response);

      const createRequest: CreateUserRequest = {
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        profile: 'JOGADOR',
      };

      await usersService.create(createRequest);

      // Verificar que o endpoint correto foi chamado
      const callArgs = mockFetch.mock.calls[0];
      const url = callArgs[0] as string;

      expect(url).toContain('/users');
      expect(callArgs[1]?.method).toBe('POST');
    });
  });
});
