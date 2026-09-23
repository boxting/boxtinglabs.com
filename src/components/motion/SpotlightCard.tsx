import { useRef, type PointerEvent, type ReactNode } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';

interface Props {
  children?: ReactNode;
  className?: string;
  /** Accent used for the spotlight and hover border, as an "r,g,b" triplet. */
  rgb?: string;
  /** Max tilt in degrees. 0 disables tilt. */
  tilt?: number;
  /** Base background tint, any CSS color. */
  tint?: string;
}

export default function SpotlightCard({
  children,
  className = '',
  rgb = '254,93,28',
  tilt = 5,
  tint = 'rgba(255,255,255,0.03)',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const nx = useMotionValue(0.5);
  const ny = useMotionValue(0.5);
  const hover = useSpring(0, { stiffness: 200, damping: 30 });

  const rotateX = useSpring(useTransform(ny, [0, 1], [tilt, -tilt]), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(nx, [0, 1], [-tilt, tilt]), { stiffness: 180, damping: 22 });

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(${rgb},0.14), transparent 60%)`;
  const ring = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, rgba(${rgb},0.55), transparent 70%)`;

  const onMove = (e: PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
    nx.set((e.clientX - r.left) / r.width);
    ny.set((e.clientY - r.top) / r.height);
  };

  const onLeave = () => {
    hover.set(0);
    nx.set(0.5);
    ny.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={() => hover.set(1)}
      onPointerLeave={onLeave}
      style={reduced || !tilt ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className={`group relative h-full rounded-[18px] ${className}`}
    >
      {/* Hover border — a masked gradient ring that tracks the pointer */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-[19px]"
        style={{
          background: ring,
          opacity: hover,
          padding: 1,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <div
        className="relative h-full overflow-hidden rounded-[18px] border border-cream/10"
        style={{ background: tint }}
      >
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: spotlight, opacity: hover }} />
        <div className="relative h-full">{children}</div>
      </div>
    </motion.div>
  );
}
