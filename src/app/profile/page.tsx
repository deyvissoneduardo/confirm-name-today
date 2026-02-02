'use client';

import { useEffect, useState } from 'react';
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import { Card } from '@/components/ui/Card';
import { ProfileView } from '@/components/profile/ProfileView';
import { ProfileEdit } from '@/components/profile/ProfileEdit';
import { useAuth } from '@/lib/auth/context';
import { usersService } from '@/lib/api/features/users';
import type { User, UpdateUserRequest } from '@/lib/api/features/users';

export default function ProfilePage() {
  const { user: _authUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const userData = await usersService.getMe();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
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
      const updatedUser = await usersService.update(user.id, data);
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
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
          <div className="text-[#a3a3a3]">Carregando perfil...</div>
        </Card>
      </ProtectedLayout>
    );
  }

  if (!user) {
    return (
      <ProtectedLayout title="Perfil">
        <Card>
          <div className="text-center py-8">
            <p className="text-[#a3a3a3]">Usuário não encontrado.</p>
          </div>
        </Card>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout title="Perfil">
      <div className="flex flex-col gap-6 pb-20 lg:pb-0">
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
