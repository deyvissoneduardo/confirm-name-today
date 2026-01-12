'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { Sidebar } from './Sidebar';
import type { ReactNode } from 'react';

interface ProtectedLayoutProps {
  children: ReactNode;
  title: string;
}

export function ProtectedLayout({
  children,
  title,
}: Readonly<ProtectedLayoutProps>) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-[#a3a3a3]">Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:min-w-0">
        <Header title={title} />
        <main className="flex-1 pb-20 lg:pb-0 px-4 py-6 lg:px-6">
          {children}
        </main>
        <BottomNavigation />
      </div>
    </div>
  );
}
