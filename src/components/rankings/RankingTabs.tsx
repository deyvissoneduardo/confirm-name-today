'use client';

import type { RankingType } from '@/lib/mock-data/rankings';

interface RankingTabsProps {
  selectedType: RankingType;
  onTypeChange: (type: RankingType) => void;
}

const rankingTypes: Array<{ type: RankingType; label: string; icon: string }> =
  [
    { type: 'goals', label: 'Gols', icon: '⚽' },
    { type: 'victories', label: 'Vitórias', icon: '🏆' },
    { type: 'draws', label: 'Empates', icon: '🤝' },
    { type: 'defeats', label: 'Derrotas', icon: '❌' },
    { type: 'complaints', label: 'Reclamações', icon: '⚠️' },
    { type: 'minutes-played', label: 'Minutos Jogados', icon: '⏱️' },
  ];

export function RankingTabs({
  selectedType,
  onTypeChange,
}: Readonly<RankingTabsProps>) {
  return (
    <div className="flex flex-wrap gap-2 pb-4 border-b border-[#262626]">
      {rankingTypes.map((item) => (
        <button
          key={item.type}
          onClick={() => onTypeChange(item.type)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            selectedType === item.type
              ? 'bg-[#3b82f6] text-white'
              : 'bg-[#171717] text-[#a3a3a3] hover:text-[#ededed] hover:bg-[#262626]'
          }`}
        >
          <span>{item.icon}</span>
          <span className="text-sm font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
