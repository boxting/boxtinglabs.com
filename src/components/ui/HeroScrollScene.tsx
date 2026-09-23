import * as React from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

interface HeroScrollSceneProps {
  children: React.ReactNode;
}

/**
 * Wraps the hero's foreground content and scrubs it out (scale/opacity/y)
 * as the hero section scrolls past the top of the viewport. Targets its
 * own root element, so it must be the only thing occupying the hero's
 * content box (see `.hero-fg { position: absolute; inset: 0; }`).
 */
export default function HeroScrollScene({ children }: HeroScrollSceneProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, -48]);

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className="hero-fg">
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className="hero-fg" style={{ scale, opacity, y }}>
      {children}
    </motion.div>
  );
}
