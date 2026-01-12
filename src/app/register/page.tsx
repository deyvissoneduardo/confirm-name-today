'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { mockRegister } from '@/lib/mock-data/users';
import { useAuth } from '@/lib/auth/context';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    if (fullName.length < 3) {
      setError('O nome deve ter no mínimo 3 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      await mockRegister(fullName, email, password, photo || undefined);
      const mockToken = 'mock-jwt-token';
      login(mockToken);
    } catch {
      setError('Erro ao criar conta. Tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0a0a]">
      <Card className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#ededed] mb-2">
              Criar Conta
            </h1>
            <p className="text-[#a3a3a3]">Cadastre-se para começar</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="p-3 rounded-lg bg-[#ef4444]/20 text-[#ef4444] text-sm">
                {error}
              </div>
            )}

            <Input
              label="Nome completo"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="João Silva"
              disabled={isLoading}
              minLength={3}
              maxLength={255}
            />

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
              disabled={isLoading}
            />

            <Input
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              disabled={isLoading}
              minLength={6}
              maxLength={100}
            />

            <Input
              label="Confirmar senha"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
              disabled={isLoading}
            />

            <Input
              label="Foto (URL, opcional)"
              type="url"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="https://exemplo.com/foto.jpg"
              disabled={isLoading}
              maxLength={500}
            />

            <Button type="submit" disabled={isLoading} className="w-full mt-2">
              {isLoading ? 'Criando conta...' : 'Criar conta'}
            </Button>
          </form>

          <div className="text-center text-sm text-[#a3a3a3]">
            Já tem uma conta?{' '}
            <Link
              href="/login"
              className="text-[#3b82f6] hover:text-[#2563eb] font-medium"
            >
              Entrar
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
