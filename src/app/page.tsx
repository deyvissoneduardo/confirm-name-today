'use client';

import { useEffect, useState } from 'react';
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import { Card } from '@/components/ui/Card';
import { ConfirmationCard } from '@/components/games/ConfirmationCard';
import { useAuth } from '@/lib/auth/context';
import { mockGetActiveGame } from '@/lib/mock-data/games';
import type { Game } from '@/lib/mock-data/games';

export default function HomePage() {
  const { user } = useAuth();
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      setIsLoading(true);
      try {
        const games = await mockGetActiveGame();
        if (games.length > 0) {
          setActiveGame(games[0]);
        }
      } catch (error) {
        console.error('Error fetching game:', error);
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
        ) : activeGame && user?.id ? (
          <ConfirmationCard game={activeGame} userId={user.id} />
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
