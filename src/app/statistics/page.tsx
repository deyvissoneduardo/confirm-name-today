'use client';

import { useEffect, useState } from 'react';
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import { Card } from '@/components/ui/Card';
import { StatisticsCard } from '@/components/statistics/StatisticsCard';
import { GameFilter } from '@/components/statistics/GameFilter';
import { useAuth } from '@/lib/auth/context';
import { mockGetStatistics } from '@/lib/mock-data/statistics';
import { mockGetAllGames } from '@/lib/mock-data/games';
import type { Statistics } from '@/lib/mock-data/statistics';
import type { Game } from '@/lib/mock-data/games';

export default function StatisticsPage() {
  const { user } = useAuth();
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      setIsLoading(true);
      setError(null);

      try {
        const [stats, gamesData] = await Promise.all([
          mockGetStatistics(user.id, selectedGameId),
          mockGetAllGames(),
        ]);
        setStatistics(stats);
        setGames(gamesData);
      } catch (err) {
        setError('Erro ao carregar estatísticas');
        console.error('Error fetching statistics:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user?.id, selectedGameId]);

  return (
    <ProtectedLayout title="Estatísticas">
      <div className="flex flex-col gap-6 pb-20 lg:pb-0">
        <GameFilter
          games={games}
          selectedGameId={selectedGameId}
          onGameChange={setSelectedGameId}
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
          selectedDay={selectedDay}
          onDayChange={setSelectedDay}
        />

        {isLoading ? (
          <Card>
            <div className="text-[#a3a3a3]">Carregando estatísticas...</div>
          </Card>
        ) : error ? (
          <Card>
            <div className="text-center py-8">
              <p className="text-[#ef4444]">{error}</p>
            </div>
          </Card>
        ) : !statistics ? (
          <Card>
            <div className="text-center py-8">
              <p className="text-[#a3a3a3]">Estatísticas não encontradas.</p>
            </div>
          </Card>
        ) : (
          <StatisticsCard
            statistics={statistics}
            userName={user?.fullName}
            userPhoto={user?.photo || null}
          />
        )}
      </div>
    </ProtectedLayout>
  );
}
