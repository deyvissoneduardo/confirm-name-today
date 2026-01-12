import type { HTMLAttributes, ReactNode } from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
}

export function Badge({
  children,
  variant = 'default',
  className = '',
  ...props
}: Readonly<BadgeProps>) {
  const variantStyles = {
    default: 'bg-[#262626] text-[#ededed]',
    success: 'bg-[#10b981] text-white',
    warning: 'bg-[#f59e0b] text-white',
    error: 'bg-[#ef4444] text-white',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
