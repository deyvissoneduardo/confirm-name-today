import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import type { RankingItem as RankingItemType } from '@/lib/mock-data/rankings';

interface RankingItemProps {
  item: RankingItemType;
  currentUserId?: string;
}

export function RankingItem({
  item,
  currentUserId,
}: Readonly<RankingItemProps>) {
  const isCurrentUser = item.userId === currentUserId;
  const isTopThree = item.position <= 3;

  return (
    <Card
      className={`flex items-center gap-4 p-4 ${
        isCurrentUser ? 'bg-[#3b82f6]/10 border-[#3b82f6]' : ''
      }`}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#262626] text-[#ededed] font-bold">
        {isTopThree ? (
          <span className="text-xl">
            {item.position === 1 ? '🥇' : item.position === 2 ? '🥈' : '🥉'}
          </span>
        ) : (
          <span>{item.position}</span>
        )}
      </div>

      <Avatar src={null} name={item.userName} size="md" alt={item.userName} />

      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-[#ededed]">{item.userName}</span>
          {isCurrentUser && (
            <Badge variant="default" className="text-xs">
              Você
            </Badge>
          )}
        </div>
      </div>

      <div className="text-right">
        <div className="text-2xl font-bold text-[#ededed]">
          {item.formattedValue}
        </div>
      </div>
    </Card>
  );
}
