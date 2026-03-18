'use client';

import { useEffect, useState } from 'react';
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import { Card } from '@/components/ui/Card';
import { ProfileView } from '@/components/profile/ProfileView';
import { ProfileEdit } from '@/components/profile/ProfileEdit';
import { usersService } from '@/lib/api/features/users';
import type { User, UpdateUserRequest } from '@/lib/api/features/users';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const userData = await usersService.getMe();
        setUser(userData);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Não foi possível carregar o perfil.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async (data: UpdateUserRequest) => {
    if (!user) return;

    setIsLoading(true);
    try {
      void data;
      setErrorMessage(
        'Edição de perfil não disponível para jogador nesta API.'
      );
      setIsEditing(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Erro ao atualizar perfil. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isLoading && !user) {
    return (
      <ProtectedLayout title="Perfil">
        <Card>
          <div className="text-[#a3a3a3]">
            {errorMessage || 'Carregando perfil...'}
          </div>
        </Card>
      </ProtectedLayout>
    );
  }

  if (!user) {
    return (
      <ProtectedLayout title="Perfil">
        <Card>
          <div className="text-center py-8">
            <p className="text-[#a3a3a3]">
              {errorMessage || 'Usuário não encontrado.'}
            </p>
          </div>
        </Card>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout title="Perfil">
      <div className="flex flex-col gap-6 pb-20 lg:pb-0">
        {errorMessage && (
          <Card>
            <div className="text-[#ef4444]">{errorMessage}</div>
          </Card>
        )}
        {isEditing ? (
          <ProfileEdit
            user={user}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <ProfileView user={user} onEdit={() => setIsEditing(true)} />
        )}
      </div>
    </ProtectedLayout>
  );
}
