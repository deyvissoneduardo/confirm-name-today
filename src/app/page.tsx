'use client';

import { useEffect, useState } from 'react';
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import { Card } from '@/components/ui/Card';
import { ConfirmationCard } from '@/components/games/ConfirmationCard';
import { useAuth } from '@/lib/auth/context';
import { ApiClientError } from '@/lib/api/client';
import { gamesService } from '@/lib/api/features/games';
import type { Game } from '@/lib/api/features/games';

export default function HomePage() {
  const { user } = useAuth();
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const games = await gamesService.getAll();
        const sortedGames = [...games].sort(
          (a, b) =>
            new Date(a.gameDate).getTime() - new Date(b.gameDate).getTime()
        );
        const nextUnreleasedGame = sortedGames.find((game) => !game.released);
        const nextGame = nextUnreleasedGame || sortedGames[0];

        if (nextGame) {
          setActiveGame(nextGame);
          return;
        }

        if (games.length > 0) {
          setActiveGame(games[0]);
        }
      } catch (error) {
        if (error instanceof ApiClientError) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('Não foi possível carregar os jogos no momento.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchGame();
  }, []);

  return (
    <ProtectedLayout title="Início">
      <div className="flex flex-col gap-6 pb-20 lg:pb-0">
        <Card>
          <h2 className="text-xl font-bold text-[#ededed] mb-2">
            Olá, {user?.fullName || 'Usuário'}! 👋
          </h2>
          <p className="text-[#a3a3a3]">
            Bem-vindo ao Confirm Game Today. Confirme sua presença nos jogos.
          </p>
        </Card>

        {isLoading ? (
          <Card>
            <div className="text-[#a3a3a3]">Carregando jogo ativo...</div>
          </Card>
        ) : errorMessage ? (
          <Card>
            <div className="text-[#ef4444]">{errorMessage}</div>
          </Card>
        ) : activeGame && user?.id ? (
          <ConfirmationCard game={activeGame} />
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="flex flex-col gap-2">
            <div className="text-2xl">📊</div>
            <h3 className="font-bold text-[#ededed]">Estatísticas</h3>
            <p className="text-sm text-[#a3a3a3]">Ver minhas estatísticas</p>
          </Card>

          <Card className="flex flex-col gap-2">
            <div className="text-2xl">🏆</div>
            <h3 className="font-bold text-[#ededed]">Ranking</h3>
            <p className="text-sm text-[#a3a3a3]">Ver rankings</p>
          </Card>
        </div>
      </div>
    </ProtectedLayout>
  );
}
