'use client';

import Link from 'next/link';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/lib/auth/context';

interface HeaderProps {
  title: string;
}

export function Header({ title }: Readonly<HeaderProps>) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 bg-[#0a0a0a] border-b border-[#262626] px-4 py-3 lg:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#ededed]">{title}</h1>
        <div className="flex items-center gap-3">
          <Link href="/profile" className="flex items-center gap-2">
            <Avatar
              src={user?.photo || null}
              name={user?.fullName}
              size="md"
              alt={user?.fullName || 'Avatar'}
            />
          </Link>
          <button
            onClick={logout}
            className="text-sm text-[#a3a3a3] hover:text-[#ededed] transition-colors"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
