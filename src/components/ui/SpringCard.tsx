import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SpringCardProps {
  className?: string;
  children: React.ReactNode;
}

const SPRING = { type: 'spring' as const, stiffness: 400, damping: 30 };

/**
 * Generic hover/tap wrapper that adds spring-physics weight to a card.
 * Drop-in replacement for a plain div; visual styling stays in the
 * caller's className (border, radius, background, etc.).
 */
export default function SpringCard({ className, children }: SpringCardProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={SPRING}
    >
      {children}
    </motion.div>
  );
}
