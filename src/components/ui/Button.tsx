import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  className = '',
  disabled,
  children,
  ...props
}: Readonly<ButtonProps>) {
  const baseStyles =
    'px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantStyles = {
    primary: 'bg-[#3b82f6] text-white hover:bg-[#2563eb] active:bg-[#1d4ed8]',
    secondary:
      'border border-[#404040] text-[#3b82f6] bg-transparent hover:bg-[#171717] active:bg-[#262626]',
    ghost:
      'text-[#ededed] bg-transparent hover:bg-[#171717] active:bg-[#262626]',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
