import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({
  children,
  className = '',
  ...props
}: Readonly<CardProps>) {
  return (
    <div
      className={`bg-[#171717] rounded-xl p-6 border border-[#262626] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
