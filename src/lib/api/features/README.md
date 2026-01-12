# API Features - Modular Structure

This directory contains API modules organized by feature.

## Structure

Each feature should follow this structure:

```
features/
  my-feature/
    types.ts       # TypeScript types and interfaces
    service.ts     # API service functions
    hooks.ts       # React hooks (optional, for data fetching)
    index.ts       # Re-exports
```

## Example

### `features/games/types.ts`

```typescript
export interface Game {
  id: string;
  name: string;
  date: string;
  // ...
}
```

### `features/games/service.ts`

```typescript
import { api } from '@/lib/api/client';
import type { Game } from './types';

export const gamesService = {
  getAll: () => api.get<Game[]>('/games'),
  getById: (id: string) => api.get<Game>(`/games/${id}`),
  create: (data: Omit<Game, 'id'>) => api.post<Game>('/games', data),
  // ...
};
```

### `features/games/hooks.ts` (optional)

```typescript
import { useQuery } from '@tanstack/react-query';
import { gamesService } from './service';

export const useGames = () => {
  return useQuery({
    queryKey: ['games'],
    queryFn: () => gamesService.getAll(),
  });
};
```
