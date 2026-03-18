'use client';

import { useEffect, useState } from 'react';
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import { Card } from '@/components/ui/Card';
import { GameCard } from '@/components/games/GameCard';
import { gamesService } from '@/lib/api/features/games';
import type { Game } from '@/lib/api/features/games';

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      try {
        const allGames = await gamesService.getAll();
        const releasedGames = allGames.filter((game) => game.released);
        setGames(releasedGames);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (isLoading) {
    return (
      <ProtectedLayout title="Jogos">
        <Card>
          <div className="text-[#a3a3a3]">Carregando jogos...</div>
        </Card>
      </ProtectedLayout>
    );
  }

  if (games.length === 0) {
    return (
      <ProtectedLayout title="Jogos">
        <Card>
          <div className="text-center py-8">
            <p className="text-[#a3a3a3]">Nenhum jogo em aberto no momento.</p>
          </div>
        </Card>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout title="Jogos">
      <div className="flex flex-col gap-6 pb-20 lg:pb-0">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </ProtectedLayout>
  );
}
