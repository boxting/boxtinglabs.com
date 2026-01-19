'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { BoxtingLogo } from '@/components/icons/BoxtingLogo';

import { ui } from '@/i18n/ui';

const FOOTER_LINKS = [
  { label: 'Twitter', href: 'https://twitter.com/boxtinglabs' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/boxtinglabs' },
] as const;

export interface FooterProps {
  className?: string;
  translations: typeof ui.en.footer;
}

export function Footer({ className, translations }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'border-t py-12',
        'bg-white dark:bg-background-dark',
        'border-border-light dark:border-border-dark',
        className
      )}
    >
      <Container>
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <BoxtingLogo variant="full" />

          <nav className="flex gap-8 text-sm text-muted-light dark:text-muted-dark">
            <a href="/privacy" className="transition-colors hover:text-brand-orange-500">{translations.privacy}</a>
            <a href="/terms" className="transition-colors hover:text-brand-orange-500">{translations.terms}</a>
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-brand-orange-500"
                {...(link.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="text-sm text-brand-navy-400 dark:text-muted-dark">
            &copy; {currentYear} Boxting Labs. {translations.rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}
