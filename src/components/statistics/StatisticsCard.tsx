import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import type { UserStatistics } from '@/lib/api/features/users';

interface StatisticsCardProps {
  statistics: UserStatistics;
  userName?: string;
  userPhoto?: string | null;
}

export function StatisticsCard({
  statistics,
  userName,
  userPhoto,
}: Readonly<StatisticsCardProps>) {
  const stats = [
    { label: '⏱️ Minutos jogados', value: statistics.minutesPlayed },
    { label: '⚽ Gols', value: statistics.goals.toString() },
    { label: '⚠️ Reclamações', value: statistics.complaints.toString() },
    { label: '🏆 Vitórias', value: statistics.victories.toString() },
    { label: '🤝 Empates', value: statistics.draws.toString() },
    { label: '❌ Derrotas', value: statistics.defeats.toString() },
  ];

  return (
    <Card className="flex flex-col gap-6">
      {userName && (
        <div className="flex items-center gap-4 pb-4 border-b border-[#262626]">
          {userPhoto && (
            <Image
              src={userPhoto}
              alt={userName}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div>
            <h2 className="text-xl font-bold text-[#ededed]">{userName}</h2>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 p-4 bg-[#0a0a0a] rounded-lg border border-[#262626]"
          >
            <div className="text-sm text-[#a3a3a3]">{stat.label}</div>
            <div className="text-2xl font-bold text-[#ededed]">
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
