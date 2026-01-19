'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Section } from '@/components/ui/Section';
import { ui } from '@/i18n/ui';
import AVAImage1 from '@assets/images/ava/AVA_iPhone_Image_1.png';
import AVAImage2 from '@assets/images/ava/AVA_iPhone_Image_2.png';
import AVAImage3 from '@assets/images/ava/AVA_iPhone_Image_3.png';
import AVAImage4 from '@assets/images/ava/AVA_iPhone_Image_4.png';

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
      AVAImage1.src,
      AVAImage2.src,
      AVAImage3.src,
      AVAImage4.src,
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
          'flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-brand-orange-500/30',
          isMobile ? 'snap-x snap-mandatory' : ''
        )}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(254, 93, 28, 0.3) transparent',
        }}
      >
        {project.images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
              'group relative flex-shrink-0 overflow-hidden rounded-3xl border-4 shadow-2xl transition-transform duration-500 hover:-translate-y-2',
              'border-white bg-brand-navy-100 shadow-brand-navy-200',
              'dark:border-brand-navy-700 dark:bg-brand-navy-900 dark:shadow-black/40',
              isMobile ? 'aspect-[9/19] w-[280px] snap-center md:w-[320px]' : 'aspect-[16/10] w-[600px] md:w-[700px]',
              'snap-start'
            )}
          >
            <img
              src={img}
              alt={`${project.title} screenshot ${idx + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              width={isMobile ? 400 : 800}
              height={isMobile ? 844 : 500}
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

