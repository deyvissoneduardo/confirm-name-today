'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { usersService } from '@/lib/api/features/users';
import { authService } from '@/lib/api/features/auth';
import { useAuth } from '@/lib/auth/context';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();

  const handlePhotoSelect = (file: File | null) => {
    if (!file) return;

    // Validação de tipo
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione uma imagem válida');
      return;
    }

    // Validação de tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('A imagem deve ter no máximo 5MB');
      return;
    }

    setPhoto(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    setShowPhotoOptions(false);
    setError('');
  };

  const handleTakePhoto = () => {
    cameraInputRef.current?.click();
  };

  const handleChooseFromGallery = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações
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
      // Converter foto para base64 se houver
      let photoData: string | undefined;
      if (photo) {
        photoData = await fileToBase64(photo);
      }

      // Criar usuário
      await usersService.create({
        fullName,
        email,
        password,
        profile: 'JOGADOR',
        photo: photoData,
      });

      // Fazer login automaticamente após registro
      const loginResponse = await authService.login({ email, password });
      login(loginResponse.token);
    } catch (error) {
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

            <div className="relative">
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

            <Input
              label="Confirmar senha"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
              disabled={isLoading}
            />

            {/* Campo de Foto */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#ededed]">
                Foto (opcional)
              </label>

              {photoPreview ? (
                <div className="relative flex justify-center">
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="absolute -top-1 -right-1 bg-[#ef4444] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-[#dc2626] transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowPhotoOptions(!showPhotoOptions)}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {showPhotoOptions ? 'Cancelar' : 'Adicionar Foto'}
                  </Button>

                  {showPhotoOptions && (
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={handleTakePhoto}
                        disabled={isLoading}
                        className="flex-1"
                      >
                        📷 Câmera
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={handleChooseFromGallery}
                        disabled={isLoading}
                        className="flex-1"
                      >
                        🖼️ Galeria
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Inputs ocultos */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handlePhotoSelect(e.target.files?.[0] || null)}
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="user"
                className="hidden"
                onChange={(e) => handlePhotoSelect(e.target.files?.[0] || null)}
              />
            </div>

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
