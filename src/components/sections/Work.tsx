'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Section } from '@/components/ui/Section';
import { ui } from '@/i18n/ui';

interface ProjectMetadata {
  images: string[];
  type: 'mobile' | 'web';
}

const PROJECT_METADATA: ProjectMetadata[] = [
  {
    type: 'mobile',
    images: [
      'https://images.unsplash.com/photo-1728026462595-ae9e5884d612?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1570894808314-677b57f25e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    ],
  },
  {
    type: 'mobile',
    images: [
      'https://images.unsplash.com/photo-1576696335217-482d57896658?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1728026462595-ae9e5884d612?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    ],
  },
  {
    type: 'web',
    images: [
      'https://images.unsplash.com/photo-1662135426498-72a27149a7dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1603702607501-a0e27733e2e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    ],
  },
];

interface ProjectShowcaseProps {
  project: (typeof ui.en.work.projects)[number] & ProjectMetadata;
  viewCaseStudyText: string;
}

function ProjectShowcase({ project, viewCaseStudyText }: ProjectShowcaseProps) {
  const isMobile = project.type === 'mobile';

  return (
    <div className="mb-24 last:mb-0">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <span className="rounded-lg bg-brand-navy-100 p-2 text-brand-navy-600 dark:bg-white/10 dark:text-brand-navy-300">
              {isMobile ? <Smartphone size={20} /> : <Monitor size={20} />}
            </span>
            <Badge variant="primary">{project.category}</Badge>
          </div>
          <h3 className="mb-3 text-display-sm font-bold text-brand-navy-900 dark:text-brand-navy-50 md:text-display-md">
            {project.title}
          </h3>
          <p className="max-w-xl text-body-lg leading-relaxed text-muted-light dark:text-muted-dark">
            {project.description}
          </p>
        </div>
        <Button variant="outline" className="shrink-0">
          {viewCaseStudyText} <ArrowRight size={16} />
        </Button>
      </div>

      <div
        className={cn(
          'grid gap-6',
          isMobile ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'
        )}
      >
        {project.images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
              'group relative overflow-hidden rounded-3xl border-4 shadow-2xl transition-transform duration-500 hover:-translate-y-2',
              'border-white bg-brand-navy-100 shadow-brand-navy-200',
              'dark:border-brand-navy-700 dark:bg-brand-navy-900 dark:shadow-black/40',
              isMobile ? 'aspect-[9/19]' : 'aspect-[16/10]'
            )}
          >
            <img
              src={img}
              alt={`${project.title} screenshot ${idx + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export interface WorkProps {
  className?: string;
  translations: typeof ui.en.work;
}

export function Work({ className, translations }: WorkProps) {
  return (
    <Section id="work" className={className}>
      <div className="mb-20">
        <h2 className="mb-4 text-display-sm font-bold text-brand-navy-900 dark:text-brand-navy-50 lg:text-display-md">
          {translations.title}
        </h2>
        <p className="text-xl text-muted-light dark:text-muted-dark">
          {translations.subtitle}
        </p>
      </div>

      {translations.projects.map((project, idx) => (
        <ProjectShowcase
          key={project.title}
          project={{ ...project, ...PROJECT_METADATA[idx] }}
          viewCaseStudyText={translations.viewCaseStudy}
        />
      ))}
    </Section>
  );
}

