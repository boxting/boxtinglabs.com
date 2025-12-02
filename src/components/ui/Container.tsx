import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'sm' | 'lg' | 'full';
  as?: React.ElementType;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'default', as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'mx-auto w-full px-6 lg:px-8',
          size === 'sm' && 'max-w-4xl',
          size === 'default' && 'max-w-7xl',
          size === 'lg' && 'max-w-[90rem]',
          size === 'full' && 'max-w-none',
          className
        )}
        {...props}
      />
    );
  }
);
Container.displayName = 'Container';

export { Container };
