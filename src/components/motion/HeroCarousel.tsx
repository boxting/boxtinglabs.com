import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, type PanInfo } from 'motion/react';

export interface CarouselFrame {
  id: string;
  label: string;
  meta: string;
  tone: string;
}

interface Props {
  frames: CarouselFrame[];
  label: string;
  /** ms each frame stays in focus */
  interval?: number;
}

const TONES: Record<string, string> = {
  mint: '#7CD6B4',
  sky: '#7DA3FF',
  orange: '#FF9E68',
  plum: '#C77DBC',
  amber: '#FFC46B',
};

const spring = { type: 'spring', stiffness: 170, damping: 26, mass: 0.9 } as const;

/** Signed distance from the active slide, wrapped to [-n/2, n/2]. */
function relative(i: number, active: number, n: number) {
  let rel = (((i - active) % n) + n) % n;
  if (rel > n / 2) rel -= n;
  return rel;
}

/**
 * Always-on rotating strip of the scene frames. It only stops while off-screen or in a
 * hidden tab (nothing to watch) and for reduced-motion users.
 */
export default function HeroCarousel({ frames, label, interval = 3400 }: Props) {
  const n = frames.length;
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(1200);
  const [vh, setVh] = useState(900);
  const [inView, setInView] = useState(true);

  // Active index of the previous committed render — lets a slide that wraps from one edge
  // to the other jump instantly instead of flying across the row.
  const lastActive = useRef(active);
  useEffect(() => {
    lastActive.current = active;
  }, [active]);

  const running = !reduced && inView;

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
      setVh(window.innerHeight);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    const onVis = () => setInView(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  const go = (dir: number) => setActive((a) => (((a + dir) % n) + n) % n);

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % n), interval);
    return () => window.clearTimeout(id);
  }, [active, running, interval, n]);

  // Card geometry: the strip owns most of the first screen on desktop, sized by both axes;
  // phones focus on one card with neighbours peeking.
  const compact = width < 640;
  const byHeight = vh * 0.72 - 290;
  const cardW = compact
    ? Math.min(width * 0.78, 340)
    : Math.max(240, Math.min(440, width * 0.26, byHeight));
  const step = cardW + (compact ? 14 : 26);
  const cardH = Math.round(cardW * 0.75) + 72;

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = info.offset.x + info.velocity.x * 0.2;
    if (swipe < -40) go(1);
    else if (swipe > 40) go(-1);
  };

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className="relative w-full select-none"
    >
      <motion.div
        className="fade-x relative mx-auto cursor-grab active:cursor-grabbing"
        style={{ height: cardH + 32, perspective: 1600, touchAction: 'pan-y' }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        dragMomentum={false}
        onDragEnd={onDragEnd}
      >
        {frames.map((f, i) => {
          const rel = relative(i, active, n);
          const abs = Math.abs(rel);
          const wrapped = Math.abs(rel - relative(i, lastActive.current, n)) > n / 2;
          const tone = TONES[f.tone] ?? TONES.orange;
          const isActive = rel === 0;
          const hidden = abs > (compact ? 1 : 2);

          return (
            <motion.div
              key={f.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${n} · ${f.label} — ${f.meta}`}
              className="absolute left-1/2 top-4"
              style={{ width: cardW, marginLeft: -cardW / 2, zIndex: 10 - abs }}
              initial={false}
              animate={{
                x: rel * step,
                y: isActive ? -8 : 8,
                scale: isActive ? 1.06 : 1 - Math.min(abs, 3) * 0.07,
                rotateY: rel * -7,
                opacity: hidden ? 0 : 1 - abs * 0.3,
              }}
              transition={wrapped || reduced ? { duration: 0 } : spring}
              onClick={() => !isActive && setActive(i)}
            >
              <div
                className="relative overflow-hidden rounded-[22px] border p-4 backdrop-blur-md transition-[border-color,box-shadow] duration-500"
                style={{
                  height: cardH,
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.015))',
                  borderColor: isActive ? `${tone}66` : 'rgba(248,243,235,0.10)',
                  boxShadow: isActive
                    ? `0 36px 90px -30px ${tone}55, inset 0 1px 0 rgba(255,255,255,0.06)`
                    : 'inset 0 1px 0 rgba(255,255,255,0.04)',
                }}
              >
                <div className="flex items-center justify-between px-1">
                  <span className="mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em]" style={{ color: tone }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone }} />
                    {f.label}
                  </span>
                  <span className="mono text-[10.5px] text-cream/35">
                    {String(i + 1).padStart(2, '0')}/{String(n).padStart(2, '0')}
                  </span>
                </div>
                <img
                  src={`/svg/frames/${f.id}.svg`}
                  alt=""
                  width={320}
                  height={240}
                  draggable={false}
                  className="pointer-events-none mt-1 block w-full"
                  style={{ aspectRatio: '4 / 3' }}
                  loading={abs <= 2 ? 'eager' : 'lazy'}
                />
                <p className="mono absolute m-0 text-[12px] text-cream/45" style={{ left: 20, bottom: 16 }}>
                  {f.meta}
                </p>
                {isActive && running && (
                  <motion.span
                    key={`p-${active}`}
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[2px] origin-left"
                    style={{ width: '100%', background: tone }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: interval / 1000, ease: 'linear' }}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Position indicator */}
      <div className="mt-3 flex items-center justify-center gap-1.5" aria-hidden="true">
        {frames.map((f, i) => (
          <motion.span
            key={f.id}
            className="block h-1.5 rounded-full"
            animate={{ width: i === active ? 22 : 6, backgroundColor: i === active ? '#FE5D1C' : 'rgba(248,243,235,0.22)' }}
            transition={spring}
          />
        ))}
      </div>
    </div>
  );
}
