'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Box } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BoxtingLogo } from '@/components/icons/BoxtingLogo';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ui, type NavTranslations } from '@/i18n/ui';

export interface HeaderProps {
  lang: 'en' | 'es';
  translations: NavTranslations;
}

export function Header({ lang, translations }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: translations.work, href: '#work' },
    { name: translations.services, href: '#services' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300 px-4 py-4 sm:px-6 lg:px-8',
        isScrolled ? 'py-2' : 'py-6'
      )}
    >
      <div className="mx-auto max-w-7xl">
        <nav className="brutalist-box flex items-center justify-between bg-white/90 px-6 py-3 backdrop-blur-md dark:bg-slate-900/90 shadow-[4px_4px_0px_0px_theme(colors.slate.900)] dark:shadow-[4px_4px_0px_0px_white]">
          <a href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 border-2 border-slate-900 bg-brand-orange-500 p-1.5 transition-transform group-hover:rotate-90 dark:border-white">
              <BoxtingLogo variant="icon" className="h-full w-full text-white" />
            </div>
            <span className="font-heading text-lg font-bold tracking-tighter uppercase">
              Boxting Labs
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-heading text-xs font-bold uppercase tracking-widest text-slate-600 transition-colors hover:text-brand-orange-500 dark:text-slate-400 dark:hover:text-brand-orange-500"
              >
                {link.name}
              </a>
            ))}
            <div className="h-6 w-[2px] bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-4">
              <LanguageSwitcher currentLang={lang} />
              <ThemeToggle />
              <a
                href="#contact"
                className="brutalist-btn-primary py-2 px-6 text-[10px]"
              >
                {translations.contact}
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-4 right-4 top-24 z-40 md:hidden"
          >
            <div className="brutalist-box-heavy bg-white dark:bg-slate-900">
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-heading text-2xl font-bold uppercase tracking-tighter text-slate-900 dark:text-white"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="border-t-2 border-slate-100 py-6 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <LanguageSwitcher currentLang={lang} />
                    <ThemeToggle />
                  </div>
                  <a
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="brutalist-btn-primary mt-6 w-full"
                  >
                    {translations.contact}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
