export interface Game {
  id: string;
  gameDate: string;
  released: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Confirmation {
  id: string;
  gameId: string;
  userId: string;
  confirmedName: string;
  isGuest: boolean;
  confirmedByUserId: string | null;
  confirmedAt: string;
  createdAt: string;
  updatedAt: string;
}

export const mockActiveGame: Game = {
  id: '770e8400-e29b-41d4-a716-446655440002',
  gameDate: '2024-01-20T19:00:00Z',
  released: true,
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z',
};

export const mockGames: Game[] = [
  mockActiveGame,
  {
    id: '880e8400-e29b-41d4-a716-446655440003',
    gameDate: '2024-01-13T19:00:00Z',
    released: false,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440004',
    gameDate: '2024-01-06T19:00:00Z',
    released: false,
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-05T10:00:00Z',
  },
];

export async function mockGetAllGames(): Promise<Game[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockGames;
}

export const mockConfirmations: Confirmation[] = [
  {
    id: '990e8400-e29b-41d4-a716-446655440004',
    gameId: '770e8400-e29b-41d4-a716-446655440002',
    userId: '100e8400-e29b-41d4-a716-446655440001',
    confirmedName: 'Dudu',
    isGuest: false,
    confirmedByUserId: null,
    confirmedAt: '2024-01-15T10:40:00Z',
    createdAt: '2024-01-15T10:40:00Z',
    updatedAt: '2024-01-15T10:40:00Z',
  },
  {
    id: 'aa0e8400-e29b-41d4-a716-446655440005',
    gameId: '770e8400-e29b-41d4-a716-446655440002',
    userId: '200e8400-e29b-41d4-a716-446655440002',
    confirmedName: 'Tales',
    isGuest: false,
    confirmedByUserId: null,
    confirmedAt: '2024-01-15T10:45:00Z',
    createdAt: '2024-01-15T10:45:00Z',
    updatedAt: '2024-01-15T10:45:00Z',
  },
];

export async function mockGetActiveGame(): Promise<Game[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return [mockActiveGame];
}

export async function mockGetGameById(_id: string): Promise<Game> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockActiveGame;
}

export async function mockGetConfirmations(
  gameId: string,
  userId: string
): Promise<Confirmation[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return mockConfirmations.filter((c) => c.userId === userId);
}

export async function mockCreateConfirmation(
  gameId: string,
  confirmedName: string,
  isGuest: boolean
): Promise<Confirmation> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newConfirmation: Confirmation = {
    id: `new-${Date.now()}`,
    gameId,
    userId: '100e8400-e29b-41d4-a716-446655440001',
    confirmedName,
    isGuest,
    confirmedByUserId: isGuest ? '100e8400-e29b-41d4-a716-446655440001' : null,
    confirmedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockConfirmations.push(newConfirmation);
  return newConfirmation;
}
