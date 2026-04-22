import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  [
    'inline-flex items-center gap-1.5',
    'rounded-none px-3 py-1',
    'text-xs font-heading uppercase tracking-widest',
    'transition-all border-2 border-slate-900 dark:border-white',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-white text-slate-900',
          'dark:bg-slate-900 dark:text-white',
        ],
        primary: [
          'bg-brand-orange-500 text-white',
        ],
        accent: [
          'bg-brand-fuchsia-500 text-white',
        ],
        success: [
          'bg-green-500 text-white',
        ],
        warning: [
          'bg-amber-500 text-white',
        ],
        outline: [
          'bg-transparent text-slate-900 dark:text-white',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
