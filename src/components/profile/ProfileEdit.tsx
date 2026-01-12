'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import type { User } from '@/lib/mock-data/users';

interface ProfileEditProps {
  user: User;
  onSave: (data: Partial<User>) => void;
  onCancel: () => void;
}

export function ProfileEdit({
  user,
  onSave,
  onCancel,
}: Readonly<ProfileEditProps>) {
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [photo, setPhoto] = useState(user.photo || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (fullName.length < 3) {
      setError('O nome deve ter no mínimo 3 caracteres');
      return;
    }

    if (fullName.length > 255) {
      setError('O nome deve ter no máximo 255 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      const updateData: Partial<User> = {
        fullName,
        email,
        photo: photo || null,
      };

      if (password.trim()) {
        if (password.length < 6) {
          setError('A senha deve ter no mínimo 6 caracteres');
          setIsLoading(false);
          return;
        }
        if (password.length > 100) {
          setError('A senha deve ter no máximo 100 caracteres');
          setIsLoading(false);
          return;
        }
      }

      onSave(updateData);
    } catch {
      setError('Erro ao salvar perfil. Tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-[#ededed]">Editar Perfil</h2>

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
          placeholder="Deixe em branco para não alterar"
          disabled={isLoading}
          minLength={6}
          maxLength={100}
        />

        <Input
          label="Foto (URL)"
          type="url"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          placeholder="https://exemplo.com/foto.jpg"
          disabled={isLoading}
          maxLength={500}
        />

        <div className="flex gap-4 pt-2">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            disabled={isLoading}
          >
            {isLoading ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
