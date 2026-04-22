import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'rounded-none font-heading uppercase tracking-widest',
    'transition-all duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange-500 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:translate-x-0 active:translate-y-0 active:shadow-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-brand-orange-500 text-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_theme(colors.slate.900)]',
          'hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_theme(colors.slate.900)]',
          'dark:border-white dark:shadow-[4px_4px_0px_0px_white] dark:hover:shadow-[8px_8px_0px_0px_white]',
        ],
        secondary: [
          'bg-brand-fuchsia-500 text-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_theme(colors.slate.900)]',
          'hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_theme(colors.slate.900)]',
          'dark:border-white dark:shadow-[4px_4px_0px_0px_white] dark:hover:shadow-[8px_8px_0px_0px_white]',
        ],
        outline: [
          'bg-white text-slate-900 border-2 border-slate-900 shadow-[4px_4px_0px_0px_theme(colors.slate.900)]',
          'hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_theme(colors.slate.900)]',
          'dark:bg-slate-900 dark:text-white dark:border-white dark:shadow-[4px_4px_0px_0px_white] dark:hover:shadow-[8px_8px_0px_0px_white]',
        ],
        ghost: [
          'bg-transparent border-2 border-transparent',
          'text-slate-900 dark:text-white',
          'hover:border-slate-900 dark:hover:border-white',
        ],
        link: [
          'text-brand-orange-500',
          'underline-offset-4 hover:underline decoration-4',
          'p-0 h-auto',
        ],
      },
      size: {
        sm: 'h-9 px-4 text-[10px]',
        md: 'h-11 px-6 text-xs',
        lg: 'h-14 px-8 text-sm',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
