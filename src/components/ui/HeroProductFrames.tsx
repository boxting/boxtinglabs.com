import * as React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

interface FrameCopy {
  web: { label: string; badge: string };
  ai: { label: string; badge: string };
  mobile: { label: string; appStore: string; googlePlay: string };
}

interface HeroProductFramesProps {
  t: FrameCopy;
}

const SPRING = { type: 'spring' as const, stiffness: 260, damping: 24 };

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.22, delayChildren: 0.25 },
  },
};

const frameVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: SPRING },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { ...SPRING, delay: 0.18 } },
};

function Badge({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <motion.div
      variants={badgeVariants}
      className="mono"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: 'rgba(255,253,249,0.92)',
        border: '1px solid rgba(15,27,45,0.08)',
        borderRadius: 999,
        padding: '6px 11px',
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: '#0F1B2D',
        whiteSpace: 'nowrap',
        boxShadow: '0 12px 24px -14px rgba(15,27,45,0.35)',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function HeroProductFrames({ t }: HeroProductFramesProps) {
  const prefersReducedMotion = useReducedMotion();
  const initial = prefersReducedMotion ? 'visible' : 'hidden';

  return (
    <motion.div
      initial={initial}
      animate="visible"
      variants={containerVariants}
      style={{ position: 'relative', width: '100%', maxWidth: 480, aspectRatio: '480 / 520', margin: '0 auto' }}
    >
      {/* Web — browser window, back layer */}
      <motion.div
        variants={frameVariants}
        style={{
          position: 'absolute',
          left: 0,
          top: '23%',
          width: '56%',
          aspectRatio: '268 / 166',
          background: '#0F1B2D',
          borderRadius: 16,
          boxShadow: '0 34px 70px -28px rgba(15,27,45,0.4)',
          transform: 'rotate(-3deg)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '20%',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '0 12px',
            background: 'rgba(255,253,249,0.06)',
            borderBottom: '1px solid rgba(255,253,249,0.08)',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FE5D1C' }} />
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ECE5D5' }} />
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4FA98A' }} />
        </div>
        <div style={{ padding: 12, display: 'flex', gap: 8, height: '80%', boxSizing: 'border-box' }}>
          <div style={{ width: '22%', borderRadius: 8, background: 'rgba(255,253,249,0.08)' }} />
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ width: '40%', height: 6, borderRadius: 3, background: 'rgba(255,253,249,0.85)' }} />
            <div
              style={{
                width: '100%',
                flexGrow: 1,
                borderRadius: 8,
                marginTop: 4,
                background: 'linear-gradient(135deg, #2B5CE6 0%, rgba(43,92,230,0.22) 100%)',
              }}
            />
            <div style={{ width: '100%', height: '18%', borderRadius: 6, background: 'rgba(255,253,249,0.08)' }} />
          </div>
        </div>
        <Badge style={{ position: 'absolute', bottom: -16, right: -10 }}>{t.web.badge}</Badge>
      </motion.div>

      {/* AI agents — assistant card, top layer */}
      <motion.div
        variants={frameVariants}
        style={{
          position: 'absolute',
          left: '21%',
          top: 0,
          width: '36%',
          aspectRatio: '174 / 136',
          background: 'rgba(255,253,249,0.92)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(15,27,45,0.08)',
          borderRadius: 16,
          padding: '10% 9%',
          boxShadow: '0 26px 54px -22px rgba(15,27,45,0.32)',
          transform: 'rotate(2deg)',
          zIndex: 3,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
            <path d="M8 1.5 L9.1 6 L13.5 7 L9.1 8 L8 12.5 L6.9 8 L2.5 7 L6.9 6 Z" fill="#6E2F66" />
          </svg>
          <span
            className="mono"
            style={{ fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6E2F66', lineHeight: 1.4 }}
          >
            {t.ai.label}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 10 }}>
          <div style={{ alignSelf: 'flex-start', width: '75%', height: 12, borderRadius: '7px 7px 7px 2px', background: 'rgba(15,27,45,0.07)' }} />
          <div style={{ alignSelf: 'flex-end', width: '58%', height: 12, borderRadius: '7px 7px 2px 7px', background: '#6E2F66' }} />
          <div style={{ alignSelf: 'flex-start', width: '85%', height: 12, borderRadius: '7px 7px 7px 2px', background: 'rgba(15,27,45,0.07)' }} />
        </div>
        <Badge style={{ position: 'absolute', bottom: -16, left: -8 }}>{t.ai.badge}</Badge>
      </motion.div>

      {/* Mobile — phone frame, front layer */}
      <motion.div
        variants={frameVariants}
        style={{
          position: 'absolute',
          right: '1%',
          bottom: '2%',
          width: '34%',
          aspectRatio: '176 / 356',
          background: '#0F1B2D',
          borderRadius: 24,
          padding: '5%',
          boxShadow: '0 34px 70px -24px rgba(15,27,45,0.45)',
          transform: 'rotate(5deg)',
          zIndex: 2,
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(160deg, #FE5D1C 0%, #0F1B2D 68%)',
            borderRadius: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            padding: '10% 8%',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ width: '34%', height: 6, borderRadius: 3, background: 'rgba(255,253,249,0.9)' }} />
          <div style={{ width: '100%', height: '24%', borderRadius: 10, marginTop: 8, background: 'rgba(255,253,249,0.14)' }} />
          <div style={{ width: '100%', height: '10%', borderRadius: 8, background: 'rgba(255,253,249,0.1)' }} />
          <div style={{ width: '100%', height: '10%', borderRadius: 8, background: 'rgba(255,253,249,0.1)' }} />
        </div>
        <div style={{ position: 'absolute', bottom: -16, right: -6, display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
          <Badge>{t.mobile.appStore}</Badge>
          <Badge>{t.mobile.googlePlay}</Badge>
        </div>
      </motion.div>
    </motion.div>
  );
}
