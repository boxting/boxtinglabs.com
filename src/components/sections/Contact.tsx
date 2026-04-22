'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ui, type ContactTranslations } from '@/i18n/ui';

export interface ContactProps {
  className?: string;
  translations: ContactTranslations;
}

export function Contact({ className, translations }: ContactProps) {
  return (
    <section id="contact" className={cn('relative py-24 bg-brand-orange-500 overflow-hidden', className)}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-900 opacity-20" />
      
      <div className="brutalist-container relative z-10">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-8 font-heading text-4xl font-bold leading-none text-white sm:text-6xl lg:text-7xl">
              {translations.title} <br />
              <span className="text-slate-900">{translations.highlight}</span>
            </h2>
            <p className="mb-12 max-w-lg font-mono text-xl text-white/90">
              {translations.subtitle}
            </p>

            <div className="space-y-6">
              <div className="brutalist-box flex items-center gap-4 bg-white/10 text-white backdrop-blur-sm border-white shadow-[4px_4px_0px_0px_white]">
                <div className="flex h-12 w-12 items-center justify-center bg-white text-brand-orange-500">
                  <Mail size={24} />
                </div>
                <span className="font-mono font-bold">hello@boxtinglabs.com</span>
              </div>
              <div className="brutalist-box flex items-center gap-4 bg-white/10 text-white backdrop-blur-sm border-white shadow-[4px_4px_0px_0px_white]">
                <div className="flex h-12 w-12 items-center justify-center bg-white text-brand-orange-500">
                  <MapPin size={24} />
                </div>
                <span className="font-mono font-bold">Delaware, US • Lima, PE</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <form className="brutalist-box-heavy space-y-8 bg-white dark:bg-slate-800" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="font-heading text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  {translations.form.name}
                </label>
                <input
                  type="text"
                  className="w-full border-b-4 border-slate-900 bg-transparent py-4 font-mono text-xl outline-none focus:border-brand-fuchsia-500 dark:border-white dark:focus:border-brand-fuchsia-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="font-heading text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  {translations.form.email}
                </label>
                <input
                  type="email"
                  className="w-full border-b-4 border-slate-900 bg-transparent py-4 font-mono text-xl outline-none focus:border-brand-fuchsia-500 dark:border-white dark:focus:border-brand-fuchsia-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <button className="brutalist-btn-primary w-full group">
                {translations.form.submit}
                <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
