import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'rounded-full font-bold',
    'transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange-500 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-95',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-brand-orange-500 text-white',
          'hover:bg-brand-orange-600',
          'shadow-lg shadow-brand-orange-500/20',
          'hover:shadow-brand-orange-500/40',
        ],
        secondary: [
          'bg-brand-navy-100 text-brand-navy-900',
          'hover:bg-brand-navy-200',
          'dark:bg-brand-navy-800 dark:text-brand-navy-50',
          'dark:hover:bg-brand-navy-700',
        ],
        outline: [
          'border-2 border-current',
          'text-brand-navy-900 dark:text-brand-navy-50',
          'hover:bg-brand-orange-500 hover:border-brand-orange-500 hover:text-white',
        ],
        ghost: [
          'bg-transparent',
          'text-brand-navy-900 dark:text-brand-navy-50',
          'hover:bg-brand-navy-100 dark:hover:bg-brand-navy-800',
        ],
        link: [
          'text-brand-orange-500',
          'underline-offset-4 hover:underline',
          'p-0 h-auto',
        ],
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
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
