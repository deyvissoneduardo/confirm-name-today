import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { Game } from '@/lib/mock-data/games';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: Readonly<GameCardProps>) {
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
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#ededed]">Jogo Ativo</h3>
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
      <Link href={`/games/${game.id}/confirm`}>
        <Button variant="primary" className="w-full" disabled={!game.released}>
          {game.released ? 'Confirmar Presença' : 'Lista Bloqueada'}
        </Button>
      </Link>
    </Card>
  );
}
