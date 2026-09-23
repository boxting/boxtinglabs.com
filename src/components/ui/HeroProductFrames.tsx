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
        background: '#FFFDF9',
        border: '1px solid rgba(15,27,45,0.08)',
        borderRadius: 999,
        padding: '8px 14px',
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        color: '#0F1B2D',
        whiteSpace: 'nowrap',
        boxShadow: '0 14px 28px -14px rgba(15,27,45,0.4)',
        zIndex: 10,
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
      style={{ position: 'relative', width: '100%', maxWidth: 620, aspectRatio: '620 / 600', margin: '0 auto' }}
    >
      {/* Web — browser window, back layer */}
      <motion.div
        variants={frameVariants}
        style={{
          position: 'absolute',
          left: 0,
          top: '20%',
          width: '58%',
          aspectRatio: '340 / 210',
          transform: 'rotate(-3deg)',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#0F1B2D',
            borderRadius: 18,
            boxShadow: '0 34px 70px -28px rgba(15,27,45,0.4)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '19%',
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '0 14px',
              background: 'rgba(255,253,249,0.06)',
              borderBottom: '1px solid rgba(255,253,249,0.08)',
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FE5D1C' }} />
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ECE5D5' }} />
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4FA98A' }} />
          </div>
          <div style={{ padding: 14, display: 'flex', gap: 10, height: '81%', boxSizing: 'border-box' }}>
            <div style={{ width: '22%', borderRadius: 9, background: 'rgba(255,253,249,0.08)' }} />
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
              <div style={{ width: '40%', height: 7, borderRadius: 4, background: 'rgba(255,253,249,0.85)' }} />
              <div
                style={{
                  width: '100%',
                  flexGrow: 1,
                  borderRadius: 9,
                  marginTop: 4,
                  background: 'linear-gradient(135deg, #2B5CE6 0%, rgba(43,92,230,0.22) 100%)',
                }}
              />
              <div style={{ width: '100%', height: '18%', borderRadius: 7, background: 'rgba(255,253,249,0.08)' }} />
            </div>
          </div>
        </div>
        <Badge style={{ position: 'absolute', bottom: -18, right: -14 }}>{t.web.badge}</Badge>
      </motion.div>

      {/* AI agents — assistant card, top layer */}
      <motion.div
        variants={frameVariants}
        style={{
          position: 'absolute',
          left: '22%',
          top: 0,
          width: '38%',
          aspectRatio: '220 / 170',
          background: '#FFFDF9',
          border: '1px solid rgba(15,27,45,0.08)',
          borderRadius: 18,
          padding: '9% 8%',
          boxShadow: '0 26px 54px -22px rgba(15,27,45,0.32)',
          transform: 'rotate(2deg)',
          zIndex: 3,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
            <path d="M8 1.5 L9.1 6 L13.5 7 L9.1 8 L8 12.5 L6.9 8 L2.5 7 L6.9 6 Z" fill="#6E2F66" />
          </svg>
          <span
            className="mono"
            style={{ fontSize: 11, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#6E2F66', lineHeight: 1.4 }}
          >
            {t.ai.label}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
          <div style={{ alignSelf: 'flex-start', width: '75%', height: 14, borderRadius: '8px 8px 8px 2px', background: 'rgba(15,27,45,0.07)' }} />
          <div style={{ alignSelf: 'flex-end', width: '58%', height: 14, borderRadius: '8px 8px 2px 8px', background: '#6E2F66' }} />
          <div style={{ alignSelf: 'flex-start', width: '85%', height: 14, borderRadius: '8px 8px 8px 2px', background: 'rgba(15,27,45,0.07)' }} />
        </div>
        <Badge style={{ position: 'absolute', bottom: -18, left: -12 }}>{t.ai.badge}</Badge>
      </motion.div>

      {/* Mobile — phone frame, front layer */}
      <motion.div
        variants={frameVariants}
        style={{
          position: 'absolute',
          right: 0,
          bottom: '4%',
          width: '36%',
          aspectRatio: '220 / 440',
          background: '#0F1B2D',
          borderRadius: 28,
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
            borderRadius: 18,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            padding: '10% 8%',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ width: '34%', height: 7, borderRadius: 4, background: 'rgba(255,253,249,0.9)' }} />
          <div style={{ width: '100%', height: '24%', borderRadius: 12, marginTop: 8, background: 'rgba(255,253,249,0.14)' }} />
          <div style={{ width: '100%', height: '10%', borderRadius: 9, background: 'rgba(255,253,249,0.1)' }} />
          <div style={{ width: '100%', height: '10%', borderRadius: 9, background: 'rgba(255,253,249,0.1)' }} />
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: -18,
            right: -8,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            alignItems: 'flex-end',
          }}
        >
          <Badge style={{ position: 'static' }}>{t.mobile.appStore}</Badge>
          <Badge style={{ position: 'static' }}>{t.mobile.googlePlay}</Badge>
        </div>
      </motion.div>
    </motion.div>
  );
}
