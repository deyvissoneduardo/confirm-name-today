export interface LoginResponse {
  token: string;
  type: string;
  expiresIn: number;
  user: {
    id: string;
    fullName: string;
    email: string;
    profile: string;
  };
}

export const mockLoginResponse: LoginResponse = {
  token: 'mock-jwt-token',
  type: 'Bearer',
  expiresIn: 86400,
  user: {
    id: '100e8400-e29b-41d4-a716-446655440001',
    fullName: 'Dudu',
    email: 'dudu@email.com',
    profile: 'JOGADOR',
  },
};

export async function mockLogin(
  _email: string,
  _password: string
): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockLoginResponse;
}
