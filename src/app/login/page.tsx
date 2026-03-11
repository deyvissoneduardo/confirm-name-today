'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { authService } from '@/lib/api/features/auth';
import { useAuth } from '@/lib/auth/context';

const SAVED_EMAIL_KEY = 'saved_email';
const SAVED_PASSWORD_KEY = 'saved_password';

function getSavedEmail(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(SAVED_EMAIL_KEY) || '';
}

function getSavedPassword(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(SAVED_PASSWORD_KEY) || '';
}

export default function LoginPage() {
  const [email, setEmail] = useState(getSavedEmail);
  const [password, setPassword] = useState(getSavedPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const searchParams = useSearchParams();

  useEffect(() => {
    const errorCode = searchParams.get('error');
    if (!errorCode) return;

    if (errorCode === 'session') {
      ('Não foi possível carregar seus dados. Faça login novamente.');
    }

    if (errorCode === 'autologin') {
      ('Conta criada com sucesso. Faça login para continuar.');
    }

    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', '/login');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validação de senha
    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login({ email, password });
      login(response.token);

      // Salvar credenciais após login bem-sucedido
      if (typeof window !== 'undefined') {
        localStorage.setItem(SAVED_EMAIL_KEY, email);
        localStorage.setItem(SAVED_PASSWORD_KEY, password);
      }
    } catch (error) {
      setError('Email ou senha inválidos');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0a0a]">
      <Card className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#ededed] mb-2">
              Confirm Game Today
            </h1>
            <p className="text-[#a3a3a3]">Entre com sua conta</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="p-3 rounded-lg bg-[#ef4444]/20 text-[#ef4444] text-sm">
                {error}
              </div>
            )}

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
              disabled={isLoading}
            />

            <div className="relative">
              <Input
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                disabled={isLoading}
                minLength={6}
                maxLength={100}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-[#a3a3a3] hover:text-[#ededed] text-sm"
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
              {password.length > 0 && (
                <div className="mt-1 text-xs">
                  <span
                    className={
                      password.length >= 6 ? 'text-[#10b981]' : 'text-[#ef4444]'
                    }
                  >
                    {password.length}/6 caracteres mínimos
                  </span>
                </div>
              )}
            </div>

            <Button type="submit" disabled={isLoading} className="w-full mt-2">
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="text-center text-sm text-[#a3a3a3]">
            Não tem uma conta?{' '}
            <Link
              href="/register"
              className="text-[#3b82f6] hover:text-[#2563eb] font-medium"
            >
              Criar conta
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
