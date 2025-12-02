'use client';

import * as React from 'react';
import { Cloud, Bot, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';

const SERVICES = [
  {
    icon: Cloud,
    title: 'Cloud Native',
    description:
      'Scalable infrastructure built on AWS/Azure/GCP with modern serverless patterns.',
  },
  {
    icon: Bot,
    title: 'AI Integration',
    description:
      'Leveraging LLMs and machine learning to build intelligent, automated workflows.',
  },
  {
    icon: Rocket,
    title: 'Rapid Deployment',
    description:
      'We value speed without compromising quality. CI/CD pipelines for instant feedback.',
  },
] as const;

export interface ServicesProps {
  className?: string;
}

export function Services({ className }: ServicesProps) {
  return (
    <Section id="services" variant="alternate" className={className}>
      <div className="mb-16 max-w-2xl">
        <h2 className="mb-6 text-display-sm font-bold text-brand-navy-900 dark:text-brand-navy-50 lg:text-display-md">
          Our Core Values
        </h2>
        <p className="text-body-lg text-muted-light dark:text-muted-dark">
          We believe in clean code, user-centric design, and transparent communication.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {SERVICES.map((service) => (
          <Card key={service.title} variant="interactive" className="p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange-500/10 text-brand-orange-500">
              <service.icon size={24} />
            </div>
            <CardTitle className="mb-3">{service.title}</CardTitle>
            <CardDescription>{service.description}</CardDescription>
          </Card>
        ))}
      </div>
    </Section>
  );
}
