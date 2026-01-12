export type RankingType =
  | 'goals'
  | 'complaints'
  | 'victories'
  | 'draws'
  | 'defeats'
  | 'minutes-played';

export interface RankingItem {
  position: number;
  userId: string;
  userName: string;
  userEmail: string;
  value: number;
  formattedValue: string;
}

export interface Ranking {
  type: RankingType;
  description: string;
  items: RankingItem[];
  total: number;
}

const mockUsers = [
  {
    id: '100e8400-e29b-41d4-a716-446655440001',
    name: 'Dudu',
    email: 'dudu@email.com',
  },
  {
    id: '200e8400-e29b-41d4-a716-446655440002',
    name: 'Tales',
    email: 'tales@email.com',
  },
  {
    id: '300e8400-e29b-41d4-a716-446655440003',
    name: 'Rafael',
    email: 'rafael@email.com',
  },
  {
    id: '400e8400-e29b-41d4-a716-446655440004',
    name: 'Levi',
    email: 'levi@email.com',
  },
  {
    id: '500e8400-e29b-41d4-a716-446655440005',
    name: 'Junior',
    email: 'junior@email.com',
  },
  {
    id: '600e8400-e29b-41d4-a716-446655440006',
    name: 'Andre',
    email: 'andre@email.com',
  },
  {
    id: '700e8400-e29b-41d4-a716-446655440007',
    name: 'Well',
    email: 'well@email.com',
  },
  {
    id: '800e8400-e29b-41d4-a716-446655440008',
    name: 'Lera',
    email: 'lera@email.com',
  },
];

function generateRankingItems(
  type: RankingType,
  values: number[]
): RankingItem[] {
  const items = mockUsers.map((user, index) => ({
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    value: values[index],
    formattedValue: values[index].toString(),
  }));

  items.sort((a, b) => b.value - a.value);

  return items.map((item, index) => ({
    ...item,
    position: index + 1,
  }));
}

const rankingValues: Record<RankingType, number[]> = {
  goals: [25, 18, 15, 12, 10, 8, 6, 4],
  complaints: [5, 3, 2, 1, 4, 2, 1, 0],
  victories: [12, 10, 8, 7, 6, 5, 4, 3],
  draws: [3, 2, 4, 2, 3, 1, 2, 1],
  defeats: [2, 5, 3, 6, 4, 7, 5, 8],
  'minutes-played': [450, 380, 320, 280, 240, 200, 160, 120],
};

export async function mockGetRanking(
  type: RankingType,
  _gameId?: string | null
): Promise<Ranking> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const descriptions: Record<RankingType, string> = {
    goals: 'Ranking de Gols',
    complaints: 'Ranking de Reclamações',
    victories: 'Ranking de Vitórias',
    draws: 'Ranking de Empates',
    defeats: 'Ranking de Derrotas',
    'minutes-played': 'Ranking de Minutos Jogados',
  };

  const values = rankingValues[type];
  const items =
    type === 'minutes-played'
      ? generateRankingItems(type, values).map((item) => ({
          ...item,
          formattedValue: `${Math.floor(item.value / 60)}:${String(item.value % 60).padStart(2, '0')}`,
        }))
      : generateRankingItems(type, values);

  return {
    type,
    description: descriptions[type],
    items,
    total: items.length,
  };
}
