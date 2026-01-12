export interface Statistics {
  id: string;
  userId: string;
  minutesPlayed: string;
  goals: number;
  complaints: number;
  victories: number;
  draws: number;
  defeats: number;
  createdAt: string;
  updatedAt: string;
}

const statisticsByUser: Record<string, Statistics> = {
  '100e8400-e29b-41d4-a716-446655440001': {
    id: '660e8400-e29b-41d4-a716-446655440001',
    userId: '100e8400-e29b-41d4-a716-446655440001',
    minutesPlayed: '7:30:00',
    goals: 25,
    complaints: 5,
    victories: 12,
    draws: 3,
    defeats: 2,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
  },
  '200e8400-e29b-41d4-a716-446655440002': {
    id: '660e8400-e29b-41d4-a716-446655440002',
    userId: '200e8400-e29b-41d4-a716-446655440002',
    minutesPlayed: '6:20:00',
    goals: 18,
    complaints: 3,
    victories: 10,
    draws: 2,
    defeats: 5,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
  },
  '300e8400-e29b-41d4-a716-446655440003': {
    id: '660e8400-e29b-41d4-a716-446655440003',
    userId: '300e8400-e29b-41d4-a716-446655440003',
    minutesPlayed: '5:20:00',
    goals: 15,
    complaints: 2,
    victories: 8,
    draws: 4,
    defeats: 3,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
  },
  '400e8400-e29b-41d4-a716-446655440004': {
    id: '660e8400-e29b-41d4-a716-446655440004',
    userId: '400e8400-e29b-41d4-a716-446655440004',
    minutesPlayed: '4:40:00',
    goals: 12,
    complaints: 1,
    victories: 7,
    draws: 2,
    defeats: 6,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
  },
  '500e8400-e29b-41d4-a716-446655440005': {
    id: '660e8400-e29b-41d4-a716-446655440005',
    userId: '500e8400-e29b-41d4-a716-446655440005',
    minutesPlayed: '4:00:00',
    goals: 10,
    complaints: 4,
    victories: 6,
    draws: 3,
    defeats: 4,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
  },
  '600e8400-e29b-41d4-a716-446655440006': {
    id: '660e8400-e29b-41d4-a716-446655440006',
    userId: '600e8400-e29b-41d4-a716-446655440006',
    minutesPlayed: '3:20:00',
    goals: 8,
    complaints: 2,
    victories: 5,
    draws: 1,
    defeats: 7,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
  },
  '700e8400-e29b-41d4-a716-446655440007': {
    id: '660e8400-e29b-41d4-a716-446655440007',
    userId: '700e8400-e29b-41d4-a716-446655440007',
    minutesPlayed: '2:40:00',
    goals: 6,
    complaints: 1,
    victories: 4,
    draws: 2,
    defeats: 5,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
  },
  '800e8400-e29b-41d4-a716-446655440008': {
    id: '660e8400-e29b-41d4-a716-446655440008',
    userId: '800e8400-e29b-41d4-a716-446655440008',
    minutesPlayed: '2:00:00',
    goals: 4,
    complaints: 0,
    victories: 3,
    draws: 1,
    defeats: 8,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
  },
};

export const mockStatistics: Statistics =
  statisticsByUser['100e8400-e29b-41d4-a716-446655440001'];

export async function mockGetStatistics(
  userId: string,
  _gameId?: string | null
): Promise<Statistics> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return (
    statisticsByUser[userId] ||
    statisticsByUser['100e8400-e29b-41d4-a716-446655440001']
  );
}
