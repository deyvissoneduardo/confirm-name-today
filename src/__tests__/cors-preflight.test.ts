import { fetch } from 'undici';

describe('CORS Preflight (Integration)', () => {
  const backendUrl =
    process.env.CORS_TEST_BACKEND_URL || 'http://localhost:8080/api/users';
  const origin = process.env.CORS_TEST_ORIGIN || 'http://localhost:3000';

  beforeAll(() => {
    jest.setTimeout(10000);
  });

  it('should allow preflight for POST /users from localhost:3000', async () => {
    const response = await fetch(backendUrl, {
      method: 'OPTIONS',
      headers: {
        Origin: origin,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'content-type',
      },
    });

    const allowOrigin = response.headers.get('access-control-allow-origin');
    const allowMethods = response.headers.get('access-control-allow-methods');
    const allowHeaders = response.headers.get('access-control-allow-headers');

    expect([200, 204]).toContain(response.status);
    expect(allowOrigin).toBe(origin);

    const methods = (allowMethods || '').toUpperCase();
    expect(methods).toContain('POST');

    const headers = (allowHeaders || '').toLowerCase();
    expect(headers).toContain('content-type');
  });
});
