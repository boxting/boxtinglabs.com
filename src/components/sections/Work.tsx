'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, Monitor, Box } from 'lucide-react';
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
    ],
  },
];

export interface WorkProps {
  className?: string;
  translations: WorkTranslations;
}

export function Work({ className, translations }: WorkProps) {
  return (
    <section id="work" className={cn('relative py-24 bg-slate-50 dark:bg-slate-950 border-t-4 border-slate-900 dark:border-white', className)}>
      <div className="brutalist-container">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-block bg-brand-fuchsia-500 px-4 py-1 font-heading text-xs font-bold text-white uppercase tracking-widest border-2 border-slate-900 shadow-[2px_2px_0px_0px_theme(colors.slate.900)] dark:border-white dark:shadow-[2px_2px_0px_0px_white]"
          >
            Portfolio
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold lg:text-7xl"
          >
            {translations.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 max-w-2xl font-mono text-xl text-slate-600 dark:text-slate-400"
          >
            {translations.subtitle}
          </motion.p>
        </div>

        <div className="space-y-32">
          {translations.projects.map((project, index) => {
            const metadata = PROJECT_METADATA[index];
            const isEven = index % 2 === 0;

            return (
              <div
                key={project.title}
                className={cn(
                  "flex flex-col gap-12 lg:items-center",
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
              >
                {/* Project Info */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex-1"
                >
                  <div className="brutalist-box-heavy relative bg-white dark:bg-slate-800">
                    <div className="mb-4 flex items-center gap-3">
                      {metadata.type === 'mobile' ? <Smartphone /> : <Monitor />}
                      <span className="font-heading text-xs font-bold uppercase tracking-widest text-brand-orange-500">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="mb-6 text-4xl font-bold lg:text-5xl">{project.title}</h3>
                    <p className="mb-8 font-mono text-lg text-slate-600 dark:text-slate-400">
                      {project.description}
                    </p>
                    <button className="brutalist-btn-outline w-full group">
                      {translations.viewCaseStudy}
                      <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                    </button>
                    
                    {/* Decorative Corner */}
                    <div className={cn(
                      "absolute -bottom-4 -right-4 h-12 w-12 border-2 border-slate-900 shadow-[2px_2px_0px_0px_theme(colors.slate.900)] dark:border-white dark:shadow-[2px_2px_0px_0px_white]",
                      metadata.color
                    )} />
                  </div>
                </motion.div>

                {/* Project Images */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex-1"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {metadata.images.slice(0, 4).map((img, i) => (
                      <div
                        key={i}
                        className={cn(
                          "brutalist-box p-0 overflow-hidden",
                          i === 0 && "aspect-video col-span-2",
                          i > 0 && "aspect-square"
                        )}
                      >
                        <img
                          src={img}
                          alt={`${project.title} screen ${i + 1}`}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
