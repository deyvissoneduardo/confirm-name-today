import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}: Readonly<InputProps>) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-[#ededed]">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`px-4 py-2 bg-[#171717] border border-[#404040] rounded-lg text-[#ededed] placeholder:text-[#a3a3a3] focus:outline-none focus:border-[#3b82f6] transition-colors ${className} ${
          error ? 'border-[#ef4444]' : ''
        }`}
        {...props}
      />
      {error && <span className="text-sm text-[#ef4444]">{error}</span>}
      {helperText && !error && (
        <span className="text-sm text-[#a3a3a3]">{helperText}</span>
      )}
    </div>
  );
}
