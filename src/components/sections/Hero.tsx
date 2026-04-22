'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Bot, Workflow, Code2, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ui, type HeroTranslations } from '@/i18n/ui';

export interface HeroProps {
  className?: string;
  translations: HeroTranslations;
}

const revealVariants = {
  hidden: { y: 100, opacity: 0, filter: 'blur(10px)' },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  }),
};

export function Hero({ className, translations }: HeroProps) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const yParallax = useTransform(scrollY, [0, 500], [0, 200]);

  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={cn('relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 px-4', className)}>
      
      {/* Blurred Floating Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [-100, 100, -100],
            y: [-50, 50, -50],
            rotate: [0, 45, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-brand-orange-500/10 dark:bg-brand-orange-500/5 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ 
            x: [100, -100, 100],
            y: [50, -50, 100],
            rotate: [0, -45, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[600px] h-[600px] bg-brand-fuchsia-500/10 dark:bg-brand-fuchsia-500/5 rounded-full blur-[120px]"
        />
        <div className="absolute inset-0 bg-grid-slate-900 opacity-[0.03] dark:opacity-[0.05]" />
      </div>

      {/* Kinetic Elements - Corners */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[8%] hidden lg:block opacity-40 dark:opacity-60"
        >
          <Bot size={48} className="text-brand-orange-500" />
        </motion.div>
        <motion.div 
          animate={{ x: [0, 20, 0], rotate: [0, -10, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[25%] left-[5%] hidden lg:block opacity-40 dark:opacity-60"
        >
          <Code2 size={48} className="text-brand-fuchsia-500" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, 15, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[25%] right-[8%] hidden lg:block opacity-40 dark:opacity-60"
        >
          <Workflow size={48} className="text-slate-400 dark:text-white" />
        </motion.div>
        <motion.div 
          animate={{ x: [0, -20, 0], rotate: [0, -5, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[15%] right-[5%] hidden lg:block opacity-40 dark:opacity-60"
        >
          <Zap size={48} className="text-brand-orange-500" />
        </motion.div>
      </div>

      <motion.div style={{ opacity, y: yParallax }} className="relative z-20 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 inline-flex items-center gap-3 brutalist-box py-1 px-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm"
        >
          <div className="h-2 w-2 rounded-full bg-brand-orange-500 animate-pulse" />
          <span className="font-heading text-[10px] font-bold tracking-[0.4em] uppercase">{translations.badge}</span>
        </motion.div>

        <h1 className="mb-8 flex flex-col items-center">
          <div className="overflow-hidden py-2">
            <motion.span 
              custom={0} variants={revealVariants} initial="hidden" animate="visible"
              className="block font-heading text-6xl sm:text-8xl lg:text-[12rem] leading-none text-slate-900 dark:text-white tracking-tighter"
            >
              {translations.title}
            </motion.span>
          </div>
          <div className="overflow-hidden py-2">
            <motion.span 
              custom={1} variants={revealVariants} initial="hidden" animate="visible"
              className="block font-heading text-4xl sm:text-6xl lg:text-[7rem] leading-none text-brand-orange-500 outline-text tracking-tighter"
            >
              WITHOUT LIMITS
            </motion.span>
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="max-w-xl mx-auto mb-12 font-mono text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-bold uppercase tracking-tight"
        >
          {translations.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button
            onClick={() => scrollTo('#contact')}
            className="brutalist-btn-primary group px-10"
          >
            {translations.cta.primary}
            <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => scrollTo('#work')}
            className="brutalist-btn-outline px-10"
          >
            {translations.cta.secondary}
          </button>
        </motion.div>
      </motion.div>

      {/* Marquee Background */}
      <div className="absolute bottom-0 left-0 right-0 border-t-4 border-slate-900 bg-white py-4 dark:border-white dark:bg-slate-900 overflow-hidden select-none z-30">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-8 font-heading text-xl font-bold tracking-widest text-slate-900 dark:text-white">
              SOFTWARE FACTORY • BOXTING LABS • CUSTOM ENGINEERING • AI INTEGRATION • 
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
