'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ApiClientError } from '@/lib/api/client';
import { gamesService } from '@/lib/api/features/games';
import type { Game, Confirmation } from '@/lib/api/features/games';

interface ConfirmationCardProps {
  game: Game;
}

export function ConfirmationCard({ game }: Readonly<ConfirmationCardProps>) {
  const [confirmedName, setConfirmedName] = useState('');
  const [isGuest, setIsGuest] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const gameDate = new Date(game.gameDate);
  const dateFormatted = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(gameDate);
  const timeFormatted = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  }).format(gameDate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!confirmedName.trim()) {
      setError('O nome é obrigatório');
      return;
    }

    if (confirmedName.length > 255) {
      setError('O nome deve ter no máximo 255 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      const newConfirmation = await gamesService.createConfirmation(game.id, {
        confirmedName: confirmedName.trim(),
        isGuest,
      });
      setConfirmation(newConfirmation);
      setConfirmedName('');
      setIsGuest(false);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof ApiClientError) {
        setError(error.message);
      } else {
        setError('Erro ao confirmar presença. Tente novamente.');
      }
      setIsLoading(false);
    }
  };

  if (!confirmation) {
    return (
      <Card className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#ededed]">
            Confirmar Presença
          </h3>
          <Badge variant={game.released ? 'success' : 'error'}>
            {game.released ? 'Lista liberada' : 'Lista bloqueada'}
          </Badge>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm text-[#a3a3a3]">Data:</div>
          <div className="text-base font-medium text-[#ededed]">
            {dateFormatted}
          </div>
          <div className="text-sm text-[#a3a3a3]">Início do jogo:</div>
          <div className="text-base font-medium text-[#ededed]">
            {timeFormatted}
          </div>
        </div>

        {!game.released && (
          <div className="p-3 rounded-lg bg-[#ef4444]/20 text-[#ef4444] text-sm">
            As confirmações estão bloqueadas para este jogo.
          </div>
        )}

        {game.released && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="p-3 rounded-lg bg-[#ef4444]/20 text-[#ef4444] text-sm">
                {error}
              </div>
            )}

            <Input
              label="Nome a confirmar"
              type="text"
              value={confirmedName}
              onChange={(e) => setConfirmedName(e.target.value)}
              required
              placeholder="Seu nome"
              disabled={isLoading}
              maxLength={255}
            />

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isGuest"
                checked={isGuest}
                onChange={(e) => setIsGuest(e.target.checked)}
                disabled={isLoading}
                className="w-4 h-4 rounded border-[#404040] bg-[#171717] text-[#3b82f6] focus:ring-[#3b82f6]"
              />
              <label
                htmlFor="isGuest"
                className="text-sm text-[#ededed] cursor-pointer"
              >
                É um convidado
              </label>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Confirmando...' : 'Confirmar presença'}
            </Button>
          </form>
        )}
      </Card>
    );
  }

  const confirmedDate = new Date(confirmation.confirmedAt);
  const confirmedDateFormatted = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(confirmedDate);

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#ededed]">Nome Confirmado</h3>
        <Badge variant={confirmation.isGuest ? 'warning' : 'success'}>
          {confirmation.isGuest ? 'Convidado' : 'Confirmado'}
        </Badge>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-sm text-[#a3a3a3]">Data:</div>
        <div className="text-base font-medium text-[#ededed]">
          {dateFormatted}
        </div>
        <div className="text-sm text-[#a3a3a3]">Início do jogo:</div>
        <div className="text-base font-medium text-[#ededed]">
          {timeFormatted}
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-2 border-t border-[#262626]">
        <div className="text-sm text-[#a3a3a3]">Nome Confirmado</div>
        <div className="text-lg font-bold text-[#ededed]">
          {confirmation.confirmedName}
        </div>
        <div className="text-sm text-[#a3a3a3]">
          Confirmado em: {confirmedDateFormatted}
        </div>
      </div>

      <Link href={`/games/${game.id}/confirm`}>
        <Button variant="secondary" className="w-full">
          Ver Detalhes
        </Button>
      </Link>
    </Card>
  );
}
