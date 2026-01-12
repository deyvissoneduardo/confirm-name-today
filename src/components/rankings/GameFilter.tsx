'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Game } from '@/lib/mock-data/games';

interface GameFilterProps {
  games: Game[];
  selectedGameId: string | null;
  onGameChange: (gameId: string | null) => void;
}

export function GameFilter({
  games,
  selectedGameId,
  onGameChange,
}: Readonly<GameFilterProps>) {
  const selectedGame = selectedGameId
    ? games.find((g) => g.id === selectedGameId)
    : null;

  const selectedGameDate = selectedGame
    ? new Intl.DateTimeFormat('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(selectedGame.gameDate))
    : null;

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#ededed]">Filtrar por Jogo</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedGameId === null ? 'primary' : 'secondary'}
          onClick={() => onGameChange(null)}
          className="text-sm"
        >
          Total
        </Button>
        {games.map((game) => {
          const gameDate = new Intl.DateTimeFormat('pt-BR', {
            day: 'numeric',
            month: 'short',
          }).format(new Date(game.gameDate));
          return (
            <Button
              key={game.id}
              variant={selectedGameId === game.id ? 'primary' : 'secondary'}
              onClick={() => onGameChange(game.id)}
              className="text-sm"
            >
              {gameDate}
            </Button>
          );
        })}
      </div>
      {selectedGameDate && (
        <p className="text-sm text-[#a3a3a3]">
          Mostrando dados do jogo: {selectedGameDate}
        </p>
      )}
    </Card>
  );
}
