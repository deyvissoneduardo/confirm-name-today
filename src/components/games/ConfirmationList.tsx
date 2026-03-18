import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { Confirmation } from '@/lib/api/features/games';

interface ConfirmationListProps {
  confirmations: Confirmation[];
}

export function ConfirmationList({
  confirmations,
}: Readonly<ConfirmationListProps>) {
  if (confirmations.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-[#a3a3a3]">Nenhuma confirmação ainda.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg font-bold text-[#ededed] mb-4">
        Minhas Confirmações
      </h3>
      <div className="flex flex-col gap-4">
        {confirmations.map((confirmation) => {
          const confirmedDate = new Date(confirmation.confirmedAt);
          const dateFormatted = new Intl.DateTimeFormat('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }).format(confirmedDate);

          return (
            <div
              key={confirmation.id}
              className="p-4 bg-[#0a0a0a] rounded-lg border border-[#262626] flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-[#ededed]">
                  {confirmation.confirmedName}
                </h4>
                <Badge variant={confirmation.isGuest ? 'warning' : 'success'}>
                  {confirmation.isGuest ? 'Convidado' : 'Próprio'}
                </Badge>
              </div>
              <p className="text-sm text-[#a3a3a3]">
                Confirmado em: {dateFormatted}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
