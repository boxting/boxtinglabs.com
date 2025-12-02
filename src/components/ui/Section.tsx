import * as React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'alternate' | 'dark';
  spacing?: 'sm' | 'md' | 'lg';
  containerSize?: 'default' | 'sm' | 'lg' | 'full';
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      variant = 'default',
      spacing = 'md',
      containerSize = 'default',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          // Spacing
          spacing === 'sm' && 'py-12 lg:py-16',
          spacing === 'md' && 'py-20 lg:py-24',
          spacing === 'lg' && 'py-24 lg:py-32',
          // Variants
          variant === 'default' && 'bg-background-light dark:bg-background-dark',
          variant === 'alternate' && 'bg-white dark:bg-brand-navy-800',
          variant === 'dark' && 'bg-brand-navy-900 text-white',
          className
        )}
        {...props}
      >
        <Container size={containerSize}>{children}</Container>
      </section>
    );
  }
);
Section.displayName = 'Section';

export { Section };
