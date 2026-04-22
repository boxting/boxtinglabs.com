'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Box, Code2, Cpu, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ui, type ServicesTranslations } from '@/i18n/ui';

export interface ServicesProps {
  className?: string;
  translations: ServicesTranslations;
}

const ICONS = [Code2, Cpu, Rocket];

export function Services({ className, translations }: ServicesProps) {
  return (
    <section id="services" className={cn('relative py-24 bg-white dark:bg-slate-900 border-t-4 border-slate-900 dark:border-white', className)}>
      <div className="brutalist-container">
        <div className="mb-16 flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-block bg-brand-orange-500 px-4 py-1 font-heading text-xs font-bold text-white uppercase tracking-widest border-2 border-slate-900 shadow-[2px_2px_0px_0px_theme(colors.slate.900)] dark:border-white dark:shadow-[2px_2px_0px_0px_white]"
            >
              Expertise
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold lg:text-6xl"
            >
              {translations.title}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-md font-mono text-lg text-slate-600 dark:text-slate-400"
          >
            {translations.subtitle}
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {translations.items.map((service, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="brutalist-box-interactive group bg-slate-50 dark:bg-slate-800"
              >
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center border-4 border-slate-900 bg-brand-fuchsia-500 text-white shadow-[4px_4px_0px_0px_theme(colors.slate.900)] group-hover:bg-brand-orange-500 transition-colors dark:border-white dark:shadow-[4px_4px_0px_0px_white]">
                  <Icon size={32} />
                </div>
                <h3 className="mb-4 text-2xl font-bold">{service.title}</h3>
                <p className="font-mono text-slate-600 dark:text-slate-400">
                  {service.description}
                </p>
                <div className="mt-8 flex justify-end">
                  <Box className="text-slate-300 dark:text-slate-700 group-hover:text-brand-fuchsia-500 transition-colors" size={40} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
