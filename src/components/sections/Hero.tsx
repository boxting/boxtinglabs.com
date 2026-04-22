'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Workflow, Box } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BoxtingLogo } from '@/components/icons/BoxtingLogo';
import { ui, type HeroTranslations } from '@/i18n/ui';

interface TypewriterTextProps {
  words: readonly string[];
}

function TypewriterText({ words }: TypewriterTextProps) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      },
      reverse ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="inline-block bg-slate-900 px-4 py-1 text-white dark:bg-white dark:text-slate-900">
      {words[index].substring(0, subIndex)}
    </span>
  );
}

export interface HeroProps {
  className?: string;
  translations: HeroTranslations;
}

export function Hero({ className, translations }: HeroProps) {
  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={cn('relative min-h-screen overflow-hidden bg-grid-slate-900 pt-32 pb-20', className)}>
      <div className="brutalist-container relative z-10">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring', damping: 12 }}
              className="inline-block border-2 border-slate-900 bg-brand-fuchsia-500 px-4 py-2 font-heading text-xs font-bold text-white shadow-[4px_4px_0px_0px_theme(colors.slate.900)] dark:border-white dark:shadow-[4px_4px_0px_0px_white]"
            >
              {translations.badge}
            </motion.div>

            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mt-8 mb-8 font-heading text-4xl font-bold leading-none tracking-tighter text-slate-900 dark:text-white sm:text-6xl lg:text-8xl"
            >
              {translations.title} <br />
              <TypewriterText words={translations.typewriter} />
            </motion.h1>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="brutalist-box-heavy relative mb-12 max-w-2xl"
            >
              <p className="font-mono text-lg leading-relaxed lg:text-xl">
                {translations.subtitle}
              </p>
              <div className="absolute -right-4 -top-4 bg-brand-orange-500 p-2 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_theme(colors.slate.900)] dark:border-white dark:shadow-[2px_2px_0px_0px_white]">
                <Box size={24} />
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-6"
            >
              <button
                onClick={() => scrollTo('#contact')}
                className="brutalist-btn-primary group"
              >
                {translations.cta.primary}
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollTo('#work')}
                className="brutalist-btn-outline"
              >
                {translations.cta.secondary}
              </button>
            </motion.div>
          </div>

          {/* Side Boxes / Factory Elements */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="relative h-full">
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="brutalist-box-heavy absolute top-0 right-0 h-64 w-64 bg-white dark:bg-slate-800"
              >
                <div className="flex h-full flex-col items-center justify-center gap-4">
                  <div className="h-24 w-24">
                    <BoxtingLogo variant="icon" className="h-full w-full" />
                  </div>
                  <div className="font-heading text-sm font-bold uppercase tracking-widest">
                    Boxting Labs
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ 
                  x: [0, 20, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="brutalist-box absolute top-48 -left-12 h-40 w-40 bg-brand-orange-500 text-white"
              >
                <div className="flex h-full items-center justify-center">
                  <Workflow size={48} />
                </div>
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 20, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="brutalist-box absolute bottom-12 right-12 h-32 w-32 bg-brand-fuchsia-500 text-white"
              >
                <div className="flex h-full items-center justify-center">
                  <Bot size={48} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Background */}
      <div className="absolute bottom-0 left-0 right-0 border-t-4 border-slate-900 bg-white py-4 dark:border-white dark:bg-slate-900 overflow-hidden select-none">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-8 font-heading text-2xl font-bold tracking-widest text-slate-900 dark:text-white">
              SOFTWARE FACTORY • BOXTING LABS • CUSTOM ENGINEERING • AI INTEGRATION • 
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
