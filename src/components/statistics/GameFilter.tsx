'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Game } from '@/lib/mock-data/games';

export type FilterMode = 'total' | 'month' | 'day';

interface GameFilterProps {
  games: Game[];
  selectedGameId: string | null;
  onGameChange: (gameId: string | null) => void;
  selectedMonth: string | null;
  onMonthChange: (month: string | null) => void;
  selectedDay: string | null;
  onDayChange: (day: string | null) => void;
}

export function GameFilter({
  games,
  selectedGameId,
  onGameChange,
  selectedMonth,
  onMonthChange,
  selectedDay,
  onDayChange,
}: Readonly<GameFilterProps>) {
  const [filterMode, setFilterMode] = useState<FilterMode>('total');

  // Agrupar jogos por mês
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    games.forEach((game) => {
      const date = new Date(game.gameDate);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      months.add(monthKey);
    });
    return Array.from(months).sort().reverse();
  }, [games]);

  // Filtrar dias disponíveis quando mês é selecionado
  const availableDays = useMemo(() => {
    if (selectedMonth && filterMode === 'month') {
      return games
        .filter((game) => {
          const date = new Date(game.gameDate);
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          return monthKey === selectedMonth;
        })
        .map((game) => {
          const date = new Date(game.gameDate);
          return date.toISOString().split('T')[0]; // YYYY-MM-DD
        })
        .sort()
        .reverse();
    }
    return [];
  }, [selectedMonth, games, filterMode]);

  const handleModeChange = (mode: FilterMode) => {
    setFilterMode(mode);
    if (mode === 'total') {
      onGameChange(null);
      onMonthChange(null);
      onDayChange(null);
    } else if (mode === 'month') {
      onGameChange(null);
      onDayChange(null);
    }
  };

  const handleMonthSelect = (month: string) => {
    if (selectedMonth === month) {
      onMonthChange(null);
      setFilterMode('total');
    } else {
      onMonthChange(month);
      setFilterMode('month');
    }
  };

  const handleDaySelect = (day: string) => {
    const selectedGame = games.find((game) => game.gameDate.startsWith(day));
    if (selectedGame) {
      onGameChange(selectedGame.id);
      onDayChange(day);
    }
  };

  const formatMonth = (monthKey: string): string => {
    const [year, month] = monthKey.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return new Intl.DateTimeFormat('pt-BR', {
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const formatDay = (dayKey: string): string => {
    const date = new Date(dayKey);
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'short',
    }).format(date);
  };

  const selectedGame = selectedGameId
    ? games.find((g) => g.id === selectedGameId)
    : null;

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#ededed]">Filtrar por Jogo</h3>
      </div>

      {/* Modo de Filtro */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filterMode === 'total' ? 'primary' : 'secondary'}
          onClick={() => handleModeChange('total')}
          className="text-sm"
        >
          Total
        </Button>
        <Button
          variant={filterMode === 'month' ? 'primary' : 'secondary'}
          onClick={() => handleModeChange('month')}
          className="text-sm"
          disabled={availableMonths.length === 0}
        >
          Por Mês
        </Button>
      </div>

      {/* Seleção de Mês */}
      {filterMode === 'month' && availableMonths.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-[#a3a3a3]">Selecione o mês:</p>
          <div className="flex flex-wrap gap-2">
            {availableMonths.map((month) => (
              <Button
                key={month}
                variant={selectedMonth === month ? 'primary' : 'secondary'}
                onClick={() => handleMonthSelect(month)}
                className="text-sm"
              >
                {formatMonth(month)}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Seleção de Dia */}
      {selectedMonth && availableDays.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-[#a3a3a3]">
            Selecione o dia (apenas dias com jogos confirmados):
          </p>
          <div className="flex flex-wrap gap-2">
            {availableDays.map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? 'primary' : 'secondary'}
                onClick={() => handleDaySelect(day)}
                className="text-sm"
              >
                {formatDay(day)}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Informação do Filtro Ativo */}
      {selectedGameId && selectedGame && (
        <p className="text-sm text-[#a3a3a3]">
          Mostrando dados do jogo:{' '}
          {new Intl.DateTimeFormat('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format(new Date(selectedGame.gameDate))}
        </p>
      )}
    </Card>
  );
}
