'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Section } from '@/components/ui/Section';

export interface ContactProps {
  className?: string;
}

export function Contact({ className }: ContactProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Section id="contact" className={cn('relative overflow-hidden', className)}>
      <div className="absolute inset-0 -z-10 bg-brand-navy-200/30 dark:bg-brand-navy-800/30" />

      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-6 text-display-md font-bold text-brand-navy-900 dark:text-brand-navy-50 lg:text-display-lg">
          Ready to build something{' '}
          <span className="text-brand-orange-500">amazing?</span>
        </h2>
        <p className="mb-12 text-xl text-muted-light dark:text-muted-dark">
          Let's discuss your project and how we can help you achieve your goals.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4 text-left">
          <Input label="Name" placeholder="Jane Doe" required />
          <Input label="Email" type="email" placeholder="jane@example.com" required />
          <Button type="submit" className="mt-6 w-full justify-center">
            Send Message
          </Button>
        </form>
      </div>
    </Section>
  );
}
