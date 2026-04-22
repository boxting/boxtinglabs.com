'use client';

import * as React from 'react';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Smartphone, Monitor, Box, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ui, type WorkTranslations } from '@/i18n/ui';
import AVAImage1 from '@assets/images/ava/AVA_iPhone_Image_1.png';
import AVAImage2 from '@assets/images/ava/AVA_iPhone_Image_2.png';
import AVAImage3 from '@assets/images/ava/AVA_iPhone_Image_3.png';
import AVAImage4 from '@assets/images/ava/AVA_iPhone_Image_4.png';

interface ProjectMetadata {
  images: string[];
  type: 'mobile' | 'web';
  color: string;
}

const PROJECT_METADATA: ProjectMetadata[] = [
  {
    type: 'mobile',
    color: 'bg-blue-500',
    images: [
      'https://images.unsplash.com/photo-1728026462595-ae9e5884d612?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1570894808314-677b57f25e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    ],
  },
  {
    type: 'mobile',
    color: 'bg-brand-orange-500',
    images: [
      AVAImage1.src,
      AVAImage2.src,
      AVAImage3.src,
      AVAImage4.src,
    ],
  },
  {
    type: 'web',
    color: 'bg-brand-fuchsia-500',
    images: [
      'https://images.unsplash.com/photo-1662135426498-72a27149a7dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1603702607501-a0e27733e2e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1551288049-bbbda5366f21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    ],
  },
];

function ProjectGallery({ images, type }: { images: string[]; type: 'mobile' | 'web' }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="group relative w-full">
      <div
        ref={scrollRef}
        className={cn(
          "flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4",
          "cursor-grab active:cursor-grabbing"
        )}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className={cn(
              "brutalist-box p-0 flex-shrink-0 overflow-hidden snap-start",
              type === 'mobile' ? "w-[280px] aspect-[9/19]" : "w-full lg:w-[800px] aspect-video"
            )}
          >
            <img
              src={img}
              alt={`Screen ${i + 1}`}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>
      
      {/* Navigation Controls */}
      <div className="absolute -bottom-12 right-0 flex gap-4">
        <button
          onClick={() => scroll('left')}
          className="brutalist-box p-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll('right')}
          className="brutalist-box p-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export interface WorkProps {
  className?: string;
  translations: WorkTranslations;
}

export function Work({ className, translations }: WorkProps) {
  return (
    <section id="work" className={cn('relative py-32 bg-white dark:bg-slate-900 border-t-4 border-slate-900 dark:border-white', className)}>
      <div className="brutalist-container">
        <div className="mb-32 flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-block bg-brand-fuchsia-500 px-6 py-2 font-heading text-xs font-bold text-white uppercase tracking-widest border-2 border-slate-900 shadow-[4px_4px_0px_0px_theme(colors.slate.900)] dark:border-white dark:shadow-[4px_4px_0px_0px_white]"
            >
              The Factory Archive
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold lg:text-7xl leading-[1.1] tracking-tighter uppercase"
            >
              {translations.title}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-md border-l-8 border-brand-orange-500 pl-8 font-mono text-2xl text-slate-600 dark:text-slate-400"
          >
            {translations.subtitle}
          </motion.p>
        </div>

        <div className="space-y-64">
          {translations.projects.map((project, index) => {
            const metadata = PROJECT_METADATA[index];
            const isEven = index % 2 === 0;

            return (
              <div
                key={project.title}
                className="flex flex-col gap-20"
              >
                {/* Project Header */}
                <div className={cn(
                  "flex flex-col gap-8 lg:flex-row lg:items-center",
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                )}>
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 brutalist-box p-0 flex items-center justify-center bg-brand-orange-500 text-white">
                        {metadata.type === 'mobile' ? <Smartphone size={24} /> : <Monitor size={24} />}
                      </div>
                      <span className="font-heading text-lg font-bold uppercase tracking-widest text-brand-fuchsia-500">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-5xl font-bold lg:text-7xl uppercase">{project.title}</h3>
                    <p className="max-w-2xl font-mono text-xl leading-relaxed text-slate-600 dark:text-slate-400">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <button className="brutalist-btn-primary group">
                      {translations.viewCaseStudy}
                      <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>

                {/* Scrollable Gallery */}
                <div className="relative">
                  <ProjectGallery images={metadata.images} type={metadata.type} />
                  
                  {/* Decorative Background for Gallery */}
                  <div className={cn(
                    "absolute -bottom-8 -right-8 -z-10 h-1/2 w-1/2 border-4 border-slate-900 dark:border-white",
                    metadata.color
                  )} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
