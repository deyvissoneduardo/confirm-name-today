'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import type { User } from '@/lib/mock-data/users';

interface ProfileViewProps {
  user: User;
  onEdit: () => void;
}

export function ProfileView({ user, onEdit }: Readonly<ProfileViewProps>) {
  const createdAt = new Date(user.createdAt);
  const dateFormatted = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(createdAt);

  return (
    <Card className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-4">
        <Avatar
          src={user.photo || null}
          name={user.fullName}
          size="xl"
          alt={user.fullName}
        />
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#ededed] mb-2">
            {user.fullName}
          </h2>
          <p className="text-[#a3a3a3]">{user.email}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-4 border-t border-[#262626]">
        <div className="flex flex-col gap-2">
          <div className="text-sm text-[#a3a3a3]">Perfil</div>
          <div className="text-base font-medium text-[#ededed]">
            {user.profile}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm text-[#a3a3a3]">Data de cadastro</div>
          <div className="text-base font-medium text-[#ededed]">
            {dateFormatted}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm text-[#a3a3a3]">Status</div>
          <div className="text-base font-medium text-[#ededed]">
            {user.active ? 'Ativo' : 'Inativo'}
          </div>
        </div>
      </div>

      <Button variant="primary" className="w-full" onClick={onEdit}>
        Editar perfil
      </Button>
    </Card>
  );
}
