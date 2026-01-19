'use client';

import * as React from 'react';
import { Cloud, Bot, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { ui } from '@/i18n/ui';

const ICONS = [Cloud, Bot, Rocket];

export interface ServicesProps {
  className?: string;
  translations: typeof ui.en.services;
}

export function Services({ className, translations }: ServicesProps) {
  return (
    <Section id="services" variant="alternate" className={className}>
      <div className="mb-16 max-w-2xl">
        <h2 className="mb-6 text-display-sm font-bold text-brand-navy-900 dark:text-brand-navy-50 lg:text-display-md">
          {translations.title}
        </h2>
        <p className="text-body-lg text-muted-light dark:text-muted-dark">
          {translations.subtitle}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {translations.items.map((service, idx) => {
          const Icon = ICONS[idx];
          return (
            <Card key={service.title} variant="interactive" className="p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange-500/10 text-brand-orange-500">
                <Icon size={24} />
              </div>
              <CardTitle className="mb-3">{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

