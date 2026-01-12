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

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#171717] border-t border-[#262626] lg:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-[#3b82f6] bg-[#3b82f6]/10'
                  : 'text-[#a3a3a3] hover:text-[#ededed]'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
