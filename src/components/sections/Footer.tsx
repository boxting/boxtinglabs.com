'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Box } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BoxtingLogo } from '@/components/icons/BoxtingLogo';
import { ui, type FooterTranslations } from '@/i18n/ui';

export interface FooterProps {
  className?: string;
  translations: FooterTranslations;
}

const SOCIALS = [
  { icon: Github, href: 'https://github.com/boxtinglabs' },
  { icon: Twitter, href: 'https://twitter.com/boxtinglabs' },
  { icon: Linkedin, href: 'https://linkedin.com/company/boxtinglabs' },
];

export function Footer({ className, translations }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('relative py-16 bg-white dark:bg-slate-900 border-t-4 border-slate-900 dark:border-white', className)}>
      <div className="brutalist-container">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Logo & Info */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-12 w-12 border-2 border-slate-900 bg-brand-orange-500 p-2 dark:border-white shadow-[2px_2px_0px_0px_theme(colors.slate.900)] dark:shadow-[2px_2px_0px_0px_white]">
                <BoxtingLogo variant="icon" className="h-full w-full text-white" />
              </div>
              <span className="font-heading text-xl font-bold tracking-widest uppercase">
                Boxting Labs
              </span>
            </div>
            <p className="mb-8 max-w-sm font-mono text-slate-600 dark:text-slate-400">
              The Software Factory for visionary companies. We build the boxes that build the future.
            </p>
            <div className="flex gap-4">
              {SOCIALS.map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutalist-box-interactive p-3 bg-slate-100 dark:bg-slate-800"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 font-heading text-sm font-bold uppercase tracking-widest underline decoration-brand-fuchsia-500 decoration-4 underline-offset-8">
              Legal
            </h4>
            <ul className="space-y-4 font-mono">
              <li>
                <a href="#" className="hover:text-brand-orange-500 transition-colors uppercase font-bold">
                  {translations.privacy}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-orange-500 transition-colors uppercase font-bold">
                  {translations.terms}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="mb-6 font-heading text-sm font-bold uppercase tracking-widest underline decoration-brand-orange-500 decoration-4 underline-offset-8">
              Stay in the loop
            </h4>
            <div className="brutalist-box p-0 flex border-2 overflow-hidden">
              <input 
                type="email" 
                placeholder="EMAIL" 
                className="w-full px-4 py-2 font-mono text-sm outline-none bg-transparent"
              />
              <button className="bg-slate-900 text-white px-4 py-2 font-heading text-xs dark:bg-white dark:text-slate-900">
                JOIN
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t-2 border-slate-900 dark:border-white flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="font-mono text-sm font-bold uppercase">
            © {currentYear} BOXTING LABS • {translations.rights}
          </p>
          <div className="flex items-center gap-2 font-heading text-xs font-bold">
            BUILT WITH <Box size={16} className="text-brand-fuchsia-500" /> BY THE FACTORY
          </div>
        </div>
      </div>
    </footer>
  );
}
