'use client';

import { useEffect, useState } from 'react';
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import { Card } from '@/components/ui/Card';
import { RankingTabs } from '@/components/rankings/RankingTabs';
import { RankingItem } from '@/components/rankings/RankingItem';
import { GameFilter } from '@/components/rankings/GameFilter';
import { useAuth } from '@/lib/auth/context';
import { mockGetRanking } from '@/lib/mock-data/rankings';
import { mockGetAllGames } from '@/lib/mock-data/games';
import type { Ranking, RankingType } from '@/lib/mock-data/rankings';
import type { Game } from '@/lib/mock-data/games';

export default function RankingsPage() {
  const { user } = useAuth();
  const [selectedType, setSelectedType] = useState<RankingType>('goals');
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [ranking, setRanking] = useState<Ranking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [rankingData, gamesData] = await Promise.all([
          mockGetRanking(selectedType, selectedGameId),
          mockGetAllGames(),
        ]);
        setRanking(rankingData);
        setGames(gamesData);
      } catch (error) {
        console.error('Error fetching ranking:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedType, selectedGameId]);

  return (
    <ProtectedLayout title="Rankings">
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

        <Card>
          <div className="flex flex-col gap-6">
            <RankingTabs
              selectedType={selectedType}
              onTypeChange={setSelectedType}
            />

            {isLoading ? (
              <div className="text-[#a3a3a3]">Carregando ranking...</div>
            ) : !ranking ? (
              <div className="text-center py-8">
                <p className="text-[#a3a3a3]">Ranking não encontrado.</p>
              </div>
            ) : (
              <>
                <div>
                  <h2 className="text-xl font-bold text-[#ededed] mb-2">
                    {ranking.description}
                  </h2>
                  <p className="text-sm text-[#a3a3a3]">
                    Total: {ranking.total} participantes
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {ranking.items.map((item) => (
                    <RankingItem
                      key={item.userId}
                      item={item}
                      currentUserId={user?.id}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </ProtectedLayout>
  );
}
