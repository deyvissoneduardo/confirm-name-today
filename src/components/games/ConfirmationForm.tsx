'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ApiClientError } from '@/lib/api/client';
import { gamesService } from '@/lib/api/features/games';
import type { Game, Confirmation } from '@/lib/api/features/games';

interface ConfirmationFormProps {
  game: Game;
  onConfirm: (confirmation: Confirmation) => void;
}

export function ConfirmationForm({
  game,
  onConfirm,
}: Readonly<ConfirmationFormProps>) {
  const [confirmedName, setConfirmedName] = useState('');
  const [isGuest, setIsGuest] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      const confirmation = await gamesService.createConfirmation(game.id, {
        confirmedName: confirmedName.trim(),
        isGuest,
      });
      setConfirmedName('');
      setIsGuest(false);
      onConfirm(confirmation);
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

  if (!game.released) {
    return (
      <Card>
        <div className="flex flex-col gap-4">
          <Badge variant="error">Lista Bloqueada</Badge>
          <p className="text-[#a3a3a3]">
            As confirmações estão bloqueadas para este jogo.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg font-bold text-[#ededed] mb-4">
        Confirmar Presença
      </h3>
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
          placeholder="João Silva"
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
    </Card>
  );
}
