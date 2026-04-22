import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'glass';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-none border-2 border-slate-900 bg-white dark:bg-slate-900 dark:border-white',
          variant === 'default' && 'shadow-[4px_4px_0px_0px_theme(colors.slate.900)] dark:shadow-[4px_4px_0px_0px_white]',
          variant === 'interactive' && [
            'shadow-[4px_4px_0px_0px_theme(colors.slate.900)] dark:shadow-[4px_4px_0px_0px_white]',
            'transition-all duration-150',
            'hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_theme(colors.slate.900)] dark:hover:shadow-[8px_8px_0px_0px_white]',
            'active:translate-x-0 active:translate-y-0 active:shadow-none',
          ],
          variant === 'glass' && [
            'backdrop-blur-md border-slate-900 dark:border-white',
            'bg-white/80 dark:bg-slate-900/80',
          ],
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6 border-b-2 border-slate-900 dark:border-white', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-xl font-heading font-bold leading-none tracking-tight uppercase',
      'text-slate-900 dark:text-white',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-sm font-mono leading-relaxed',
      'text-slate-600 dark:text-slate-400',
      className
    )}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
