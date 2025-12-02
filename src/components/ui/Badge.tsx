import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  [
    'inline-flex items-center gap-1.5',
    'rounded-full px-3 py-1',
    'text-sm font-medium',
    'transition-colors',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-brand-navy-100 text-brand-navy-800',
          'dark:bg-brand-navy-800 dark:text-brand-navy-100',
        ],
        primary: [
          'bg-brand-orange-100 text-brand-orange-700',
          'dark:bg-brand-orange-900/30 dark:text-brand-orange-400',
        ],
        success: [
          'bg-green-100 text-green-700',
          'dark:bg-green-900/30 dark:text-green-400',
        ],
        warning: [
          'bg-amber-100 text-amber-700',
          'dark:bg-amber-900/30 dark:text-amber-400',
        ],
        outline: [
          'border border-current',
          'text-brand-navy-600 dark:text-brand-navy-400',
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
