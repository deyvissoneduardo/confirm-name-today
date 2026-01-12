'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { mockGetActiveGame } from '@/lib/mock-data/games';
import type { Game } from '@/lib/mock-data/games';

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      try {
        const activeGames = await mockGetActiveGame();
        setGames(activeGames);
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
            <p className="text-[#a3a3a3]">Nenhum jogo ativo no momento.</p>
          </div>
        </Card>
      </ProtectedLayout>
    );
  }

  const game = games[0];
  const gameDate = new Date(game.gameDate);
  const dateFormatted = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(gameDate);
  const timeFormatted = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(gameDate);

  return (
    <ProtectedLayout title="Jogos">
      <div className="flex flex-col gap-6 pb-20 lg:pb-0">
        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#ededed]">Jogo Ativo</h2>
            <Badge variant={game.released ? 'success' : 'error'}>
              {game.released ? 'Lista Liberada' : 'Lista Bloqueada'}
            </Badge>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm text-[#a3a3a3]">Data</div>
            <div className="text-base font-medium text-[#ededed]">
              {dateFormatted}
            </div>
            <div className="text-sm text-[#a3a3a3]">Hora</div>
            <div className="text-base font-medium text-[#ededed]">
              {timeFormatted}
            </div>
          </div>
          <Link href={`/games/${game.id}/confirm`}>
            <Button
              variant="primary"
              className="w-full"
              disabled={!game.released}
            >
              {game.released ? 'Confirmar Presença' : 'Lista Bloqueada'}
            </Button>
          </Link>
        </Card>
      </div>
    </ProtectedLayout>
  );
}
