'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/lib/auth/context';
import { ConfirmationForm } from '@/components/games/ConfirmationForm';
import { ConfirmationList } from '@/components/games/ConfirmationList';
import { ApiClientError } from '@/lib/api/client';
import { gamesService } from '@/lib/api/features/games';
import type { Game, Confirmation } from '@/lib/api/features/games';

export default function ConfirmPage() {
  const params = useParams();
  const { user } = useAuth();
  const gameId = params.gameId as string;
  const [game, setGame] = useState<Game | null>(null);
  const [confirmations, setConfirmations] = useState<Confirmation[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const gameData = await gamesService.getById(gameId);
        setGame(gameData);

        if (user?.id) {
          const userConfirmations = await gamesService.getConfirmations(gameId);
          setConfirmations(userConfirmations);
        }
      } catch (error) {
        if (error instanceof ApiClientError) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('Não foi possível carregar as confirmações.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [gameId, user?.id]);

  const handleConfirm = async (confirmation: Confirmation) => {
    setConfirmations([...confirmations, confirmation]);
  };

  if (isLoading) {
    return (
      <ProtectedLayout title="Confirmar Presença">
        <Card>
          <div className="text-[#a3a3a3]">
            {errorMessage || 'Carregando...'}
          </div>
        </Card>
      </ProtectedLayout>
    );
  }

  if (!game) {
    return (
      <ProtectedLayout title="Confirmar Presença">
        <Card>
          <div className="text-center py-8">
            <p className="text-[#a3a3a3]">
              {errorMessage || 'Jogo não encontrado.'}
            </p>
          </div>
        </Card>
      </ProtectedLayout>
    );
  }

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
    <ProtectedLayout title="Confirmar Presença">
      <div className="flex flex-col gap-6 pb-20 lg:pb-0">
        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#ededed]">
              Informações do Jogo
            </h2>
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
        </Card>

        <ConfirmationForm game={game} onConfirm={handleConfirm} />

        <ConfirmationList confirmations={confirmations} />
      </div>
    </ProtectedLayout>
  );
}
