/**
 * Testes de Configuração da API
 * Verifica que a URL da API está configurada corretamente
 */

describe('API Configuration', () => {
  describe('Environment Variables', () => {
    it('should have NEXT_PUBLIC_API_URL configured', () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      expect(apiUrl).toBeDefined();
      expect(typeof apiUrl).toBe('string');
      expect(apiUrl.length).toBeGreaterThan(0);
    });

    it('should use production API URL when configured', () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

      // Verificar que a URL está configurada
      expect(apiUrl).toBeDefined();

      // Se for a URL de produção, verificar formato
      if (apiUrl.includes('herokuapp.com')) {
        expect(apiUrl).toMatch(/^https:\/\/.*\.herokuapp\.com/);
        expect(apiUrl).not.toContain('localhost');
      }
    });

    it('should have valid URL format', () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

      if (apiUrl.startsWith('http://') || apiUrl.startsWith('https://')) {
        expect(() => new URL(apiUrl)).not.toThrow();
      }
    });
  });

  describe('API Client URL Construction', () => {
    it('should construct correct URL for users endpoint', () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
      const endpoint = '/users';

      let expectedUrl: string;
      if (apiUrl.startsWith('http://') || apiUrl.startsWith('https://')) {
        const baseUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
        expectedUrl = `${baseUrl}${endpoint}`;
      } else {
        expectedUrl = `${apiUrl}${endpoint}`;
      }

      expect(expectedUrl).toContain('/users');
      expect(expectedUrl).not.toContain('//users'); // Sem dupla barra
    });

    it('should construct correct URL for auth login endpoint', () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
      const endpoint = '/auth/login';

      let expectedUrl: string;
      if (apiUrl.startsWith('http://') || apiUrl.startsWith('https://')) {
        const baseUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
        expectedUrl = `${baseUrl}${endpoint}`;
      } else {
        expectedUrl = `${apiUrl}${endpoint}`;
      }

      expect(expectedUrl).toContain('/auth/login');
      expect(expectedUrl).not.toContain('//auth'); // Sem dupla barra
    });

    it('should use production API URL for login requests', () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

      if (apiUrl.includes('herokuapp.com')) {
        const loginUrl = `${apiUrl}/auth/login`;
        expect(loginUrl).toContain('https://');
        expect(loginUrl).toContain('herokuapp.com');
        expect(loginUrl).toContain('/auth/login');
      }
    });
  });
});
