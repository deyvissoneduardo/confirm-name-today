export interface User {
  id: string;
  fullName: string;
  email: string;
  photo?: string | null;
  profile: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export const mockUser: User = {
  id: '100e8400-e29b-41d4-a716-446655440001',
  fullName: 'Dudu',
  email: 'dudu@email.com',
  photo: null,
  profile: 'JOGADOR',
  active: true,
  createdAt: '2024-01-10T10:00:00Z',
  updatedAt: '2024-01-15T09:00:00Z',
};

export const mockRegisterResponse: User = {
  id: '100e8400-e29b-41d4-a716-446655440001',
  fullName: 'Dudu',
  email: 'dudu@email.com',
  photo: null,
  profile: 'JOGADOR',
  active: true,
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-15T10:30:00Z',
};

export async function mockGetCurrentUser(): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockUser;
}

export async function mockRegister(
  _fullName: string,
  _email: string,
  _password: string,
  _photo?: string
): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockRegisterResponse;
}

export async function mockUpdateUser(
  id: string,
  data: Partial<User>
): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { ...mockUser, ...data, updatedAt: new Date().toISOString() };
}
