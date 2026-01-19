'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { BoxtingLogo } from '@/components/icons/BoxtingLogo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

export interface HeaderProps {
  className?: string;
  lang: 'en' | 'es';
  translations: {
    work: string;
    services: string;
    contact: string;
  };
}

export function Header({ className, lang, translations }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: translations.work, href: '#work' },
    { label: translations.services, href: '#services' },
  ];

  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50',
        'backdrop-blur-md',
        'bg-background-light/90 dark:bg-background-dark/90',
        'border-b border-border-light dark:border-border-dark',
        'transition-colors duration-300',
        className
      )}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a href={lang === 'en' ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}es/`} className="flex items-center">
            <BoxtingLogo variant="full" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={cn(
                  'text-sm font-medium tracking-wide',
                  'text-brand-navy-900 dark:text-brand-navy-50',
                  'transition-colors hover:text-brand-orange-500'
                )}
              >
                {link.label}
              </button>
            ))}
            <div className="flex items-center gap-2 border-l border-border-light pl-6 dark:border-border-dark">
              <ThemeToggle />
              <LanguageSwitcher currentLang={lang} />
            </div>
            <Button size="sm" onClick={() => scrollTo('#contact')}>
              {translations.contact}
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              className="p-2 text-brand-navy-900 dark:text-brand-navy-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(
              'overflow-hidden border-t md:hidden',
              'bg-white dark:bg-brand-navy-800',
              'border-border-light dark:border-border-dark'
            )}
          >
            <Container>
              <div className="flex flex-col gap-4 py-6">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className={cn(
                      'text-left text-base font-medium',
                      'text-brand-navy-900 dark:text-brand-navy-50',
                      'transition-colors hover:text-brand-orange-500'
                    )}
                  >
                    {link.label}
                  </button>
                ))}
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-muted-light dark:text-muted-dark">
                    Switch Language
                  </span>
                  <LanguageSwitcher currentLang={lang} />
                </div>
                <Button className="mt-2 w-full" onClick={() => scrollTo('#contact')}>
                  {translations.contact}
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
