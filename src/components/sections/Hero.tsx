'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Workflow } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';
import { BoxtingLogo } from '@/components/icons/BoxtingLogo';

const TYPEWRITER_WORDS = [
  'generative AI.',
  'automation workflows.',
  'web platforms.',
  'mobile apps.',
];

function TypewriterText() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkTimeout = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(blinkTimeout);
  }, [blink]);

  useEffect(() => {
    if (subIndex === TYPEWRITER_WORDS[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      },
      Math.max(
        reverse ? 50 : subIndex === TYPEWRITER_WORDS[index].length ? 1000 : 100,
        Math.random() * 50 + 50
      )
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className="inline-flex items-center">
      <span className="min-h-[1.1em] bg-gradient-to-r from-brand-orange-500 to-brand-orange-400 bg-clip-text text-transparent">
        {TYPEWRITER_WORDS[index].substring(0, subIndex)}
      </span>
      <span
        className={cn(
          'ml-1 h-[1em] w-[3px] bg-brand-orange-500',
          blink ? 'opacity-100' : 'opacity-0'
        )}
      />
    </span>
  );
}

export interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={cn('relative overflow-hidden px-6 pb-32 pt-20 lg:pb-48 lg:pt-32', className)}>
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-dot-pattern text-brand-navy-900/5 dark:text-white/5"
        />
        <div className="absolute right-[-10%] top-[-20%] h-[800px] w-[800px] rounded-full bg-blue-100 opacity-30 blur-[120px] dark:bg-blue-900/20" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-orange-100 opacity-20 blur-[100px] dark:bg-orange-900/20" />
      </div>

      <Container>
        <div className="relative z-10 grid items-center gap-16 lg:grid-cols-2">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Badge variant="primary" className="mb-8">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-orange-500" />
              </span>
              Accepting new clients for Q1 2025
            </Badge>

            <h1 className="mb-8 text-display-lg font-bold leading-[1.1] tracking-tight text-brand-navy-900 dark:text-brand-navy-50 lg:text-display-2xl">
              We craft <br />
              <TypewriterText />
            </h1>

            <p className="mb-10 max-w-lg text-body-lg leading-relaxed text-muted-light dark:text-muted-dark lg:text-xl">
              Boxting Labs is the premium engineering partner for visionary companies. We
              translate complex requirements into elegant, scalable software.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => scrollTo('#contact')}>
                Start a Project <ArrowRight size={20} />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo('#work')}>
                View Case Studies
              </Button>
            </div>
          </motion.div>

          {/* Visual */}
          <div className="relative flex h-[400px] w-full items-center justify-center lg:h-[500px] lg:justify-end">
            <motion.div
              className={cn(
                'relative flex h-64 w-64 items-center justify-center rounded-[40px] border shadow-2xl backdrop-blur-xl lg:h-80 lg:w-80',
                'border-white/80 bg-white/40 shadow-brand-orange-500/10',
                'dark:border-white/20 dark:bg-brand-navy-800/40 dark:shadow-brand-orange-500/20'
              )}
              animate={{
                y: [-15, 15, -15],
                rotateY: [-5, 5, -5],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="relative z-10 h-24 w-24 lg:h-32 lg:w-32">
                <BoxtingLogo variant="icon" className="h-full w-full" />
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -right-6 -top-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-orange-500 text-white shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <Bot size={24} />
              </motion.div>

              <motion.div
                className={cn(
                  'absolute -bottom-6 -left-6 flex h-16 w-16 items-center justify-center rounded-full border shadow-lg',
                  'border-gray-100 bg-white text-brand-navy-900',
                  'dark:border-brand-navy-700 dark:bg-brand-navy-800 dark:text-white'
                )}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <Workflow size={24} />
              </motion.div>
            </motion.div>

            {/* Orbit ring */}
            <div className="absolute -z-10 h-[500px] w-[500px] rounded-full border border-brand-orange-300 opacity-20 dark:border-brand-orange-500" />
          </div>
        </div>
      </Container>
    </section>
  );
}
