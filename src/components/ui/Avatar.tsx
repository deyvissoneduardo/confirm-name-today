import Image from 'next/image';
import type { HTMLAttributes } from 'react';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  name?: string;
}

const sizeMap = {
  sm: 32,
  md: 40,
  lg: 64,
  xl: 96,
};

export function Avatar({
  src,
  alt,
  size = 'md',
  name,
  className = '',
  ...props
}: Readonly<AvatarProps>) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-2xl',
  };

  const initials = name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const imageSize = sizeMap[size];

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-[#262626] flex items-center justify-center overflow-hidden ${className}`}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || name || 'Avatar'}
          width={imageSize}
          height={imageSize}
          className="object-cover w-full h-full"
        />
      ) : (
        <Image
          src="/logo.png"
          alt={alt || name || 'Logo'}
          width={imageSize}
          height={imageSize}
          className="object-contain w-full h-full p-1"
        />
      )}
    </div>
  );
}
