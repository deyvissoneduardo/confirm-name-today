/**
 * Testes para Login de Usuário
 * Verifica que o login funciona corretamente com a API
 */

import { authService } from '@/lib/api/features/auth';
import type {
  LoginRequest,
  LoginResponse,
} from '@/lib/api/features/auth/types';

describe('User Login', () => {
  describe('LoginRequest Type', () => {
    it('should include email and password fields in LoginRequest', () => {
      const loginRequest: LoginRequest = {
        email: 'jogador@futebol.com',
        password: 'jogador1234',
      };

      expect(loginRequest).toHaveProperty('email');
      expect(loginRequest).toHaveProperty('password');
      expect(loginRequest.email).toBe('jogador@futebol.com');
      expect(loginRequest.password).toBe('jogador1234');
    });

    it('should require both email and password fields', () => {
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123',
      };

      expect(loginRequest.email).toBeDefined();
      expect(loginRequest.password).toBeDefined();
      expect(typeof loginRequest.email).toBe('string');
      expect(typeof loginRequest.password).toBe('string');
    });
  });

  describe('LoginResponse Type', () => {
    it('should have correct structure for LoginResponse', () => {
      const mockResponse: LoginResponse = {
        token: 'test-token',
        type: 'Bearer',
        expiresIn: 86400,
        user: {
          id: 'user-id',
          fullName: 'Test User',
          email: 'test@example.com',
          profile: 'JOGADOR',
        },
      };

      expect(mockResponse).toHaveProperty('token');
      expect(mockResponse).toHaveProperty('type');
      expect(mockResponse).toHaveProperty('expiresIn');
      expect(mockResponse).toHaveProperty('user');
      expect(mockResponse.user).toHaveProperty('id');
      expect(mockResponse.user).toHaveProperty('fullName');
      expect(mockResponse.user).toHaveProperty('email');
      expect(mockResponse.user).toHaveProperty('profile');
    });
  });

  describe('Auth Service - Login Method', () => {
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

    it('should have login method that accepts LoginRequest', () => {
      expect(authService.login).toBeDefined();
      expect(typeof authService.login).toBe('function');
    });

    it('should send email and password in request body', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          token: 'test-token',
          type: 'Bearer',
          expiresIn: 86400,
          user: {
            id: 'user-id',
            fullName: 'Test User',
            email: 'jogador@futebol.com',
            profile: 'JOGADOR',
          },
        }),
      } as Response);

      const loginRequest: LoginRequest = {
        email: 'jogador@futebol.com',
        password: 'jogador1234',
      };

      const result = await authService.login(loginRequest);

      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
      expect(result.user.email).toBe(loginRequest.email);
      expect(result.user.profile).toBe('JOGADOR');

      // Verificar que o fetch foi chamado
      expect(mockFetch).toHaveBeenCalledTimes(1);

      // Verificar o body da requisição
      const callArgs = mockFetch.mock.calls[0];
      const requestBody = JSON.parse(callArgs[1]?.body as string);

      expect(requestBody).toHaveProperty('email');
      expect(requestBody).toHaveProperty('password');
      expect(requestBody.email).toBe('jogador@futebol.com');
      expect(requestBody.password).toBe('jogador1234');
    });

    it('should send correct request format matching API expectations', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          token: 'test-token',
          type: 'Bearer',
          expiresIn: 86400,
          user: {
            id: 'user-id',
            fullName: 'jogador',
            email: 'jogador@futebol.com',
            profile: 'JOGADOR',
          },
        }),
      } as Response);

      const loginRequest: LoginRequest = {
        email: 'jogador@futebol.com',
        password: 'jogador1234',
      };

      await authService.login(loginRequest);

      // Verificar formato exato do body
      const callArgs = mockFetch.mock.calls[0];
      const requestBody = JSON.parse(callArgs[1]?.body as string);

      // Verificar que tem todos os campos esperados pela API
      expect(requestBody).toEqual({
        email: 'jogador@futebol.com',
        password: 'jogador1234',
      });
    });

    it('should use correct API endpoint', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          token: 'test-token',
          type: 'Bearer',
          expiresIn: 86400,
          user: {
            id: 'user-id',
            fullName: 'Test User',
            email: 'test@example.com',
            profile: 'JOGADOR',
          },
        }),
      } as Response);

      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123',
      };

      await authService.login(loginRequest);

      // Verificar que o endpoint correto foi chamado
      const callArgs = mockFetch.mock.calls[0];
      const url = callArgs[0] as string;

      expect(url).toContain('/auth/login');
      expect(callArgs[1]?.method).toBe('POST');
    });

    it('should return LoginResponse with correct structure', async () => {
      const mockResponseData = {
        token: 'test-jwt-token',
        type: 'Bearer',
        expiresIn: 86400,
        user: {
          id: '100e8400-e29b-41d4-a716-446655440001',
          fullName: 'Test User',
          email: 'test@example.com',
          profile: 'JOGADOR',
        },
      };

      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => mockResponseData,
      } as Response);

      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await authService.login(loginRequest);

      expect(result.token).toBe(mockResponseData.token);
      expect(result.type).toBe(mockResponseData.type);
      expect(result.expiresIn).toBe(mockResponseData.expiresIn);
      expect(result.user.id).toBe(mockResponseData.user.id);
      expect(result.user.fullName).toBe(mockResponseData.user.fullName);
      expect(result.user.email).toBe(mockResponseData.user.email);
      expect(result.user.profile).toBe(mockResponseData.user.profile);
    });

    it('should handle login errors correctly', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 401,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          message: 'Email ou senha inválidos',
          status: 401,
        }),
        text: async () => 'Unauthorized',
      } as Response);

      const loginRequest: LoginRequest = {
        email: 'invalid@example.com',
        password: 'wrongpassword',
      };

      await expect(authService.login(loginRequest)).rejects.toThrow();
    });

    it('should send request with correct headers', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          token: 'test-token',
          type: 'Bearer',
          expiresIn: 86400,
          user: {
            id: 'user-id',
            fullName: 'Test User',
            email: 'test@example.com',
            profile: 'JOGADOR',
          },
        }),
      } as Response);

      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123',
      };

      await authService.login(loginRequest);

      const callArgs = mockFetch.mock.calls[0];
      const headers = callArgs[1]?.headers as HeadersInit;

      expect(headers).toBeDefined();
      // Verificar que Content-Type está presente
      if (headers instanceof Headers) {
        expect(headers.get('Content-Type')).toBe('application/json');
      } else if (typeof headers === 'object') {
        const headersObj = headers as Record<string, string>;
        expect(headersObj['Content-Type']).toBe('application/json');
      }
    });
  });
});
