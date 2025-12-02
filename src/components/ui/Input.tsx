import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'mb-2 block text-sm font-bold',
              'text-brand-navy-900 dark:text-brand-navy-50'
            )}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            'flex h-12 w-full rounded-lg border px-4 py-3',
            'bg-white dark:bg-brand-navy-900',
            'border-brand-navy-200 dark:border-brand-navy-700',
            'text-brand-navy-900 dark:text-brand-navy-50',
            'placeholder:text-brand-navy-400 dark:placeholder:text-brand-navy-500',
            'transition-colors duration-200',
            'focus:border-brand-orange-500 focus:outline-none focus:ring-2 focus:ring-brand-orange-500/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
