'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Início', icon: '🏠' },
  { href: '/statistics', label: 'Estatísticas', icon: '📊' },
  { href: '/rankings', label: 'Ranking', icon: '🏆' },
  { href: '/profile', label: 'Perfil', icon: '👤' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-[#171717] lg:border-r lg:border-[#262626] lg:h-screen lg:sticky lg:top-0">
      <div className="flex flex-col p-4 gap-2">
        <h2 className="text-xl font-bold text-[#ededed] mb-4 px-3">
          Confirm Game
        </h2>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-[#3b82f6] bg-[#3b82f6]/10'
                  : 'text-[#a3a3a3] hover:text-[#ededed] hover:bg-[#262626]'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
