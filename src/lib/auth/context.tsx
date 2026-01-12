'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/lib/mock-data/users';
import { mockGetCurrentUser } from '@/lib/mock-data/users';
import type { ReactNode } from 'react';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const userData = await mockGetCurrentUser();
          setUser(userData);
        } catch {
          // User not found or error
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = (token: string) => {
    localStorage.setItem('auth_token', token);
    mockGetCurrentUser().then((userData) => {
      setUser(userData);
      router.push('/');
    });
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
