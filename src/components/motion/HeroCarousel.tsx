import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { motion, useReducedMotion, type PanInfo } from 'motion/react';

export interface CarouselFrame {
  id: string;
  label: string;
  meta: string;
  tone: string;
}

interface Props {
  frames: CarouselFrame[];
  labels: { region: string; prev: string; next: string; pause: string; play: string };
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

export default function HeroCarousel({ frames, labels, interval = 3400 }: Props) {
  const n = frames.length;
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(1200);
  const [vh, setVh] = useState(900);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(true);

  // Active index of the previous committed render — lets a slide that wraps from one edge
  // to the other jump instantly instead of flying across the row.
  const lastActive = useRef(active);
  useEffect(() => {
    lastActive.current = active;
  }, [active]);

  const paused = !!reduced || hovered || focused || userPaused || !inView;

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

  const go = useCallback((dir: number) => setActive((a) => (((a + dir) % n) + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => go(1), interval);
    return () => window.clearTimeout(id);
  }, [active, paused, interval, go]);

  // Card geometry: wide screens show ~5 frames, phones focus on one with neighbours peeking.
  const compact = width < 640;
  // On desktop the strip shares the first screen with the statement, so short viewports get smaller cards.
  const byHeight = vh * 0.62 - 320;
  const cardW = compact
    ? Math.min(width * 0.72, 300)
    : Math.max(200, Math.min(320, width * 0.2, byHeight));
  const step = cardW + (compact ? 14 : 22);
  const cardH = Math.round(cardW * 0.75) + 64;

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = info.offset.x + info.velocity.x * 0.2;
    if (swipe < -40) go(1);
    else if (swipe > 40) go(-1);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    }
  };

  const current = frames[active];

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
      }}
      onKeyDown={onKeyDown}
      className="relative w-full select-none"
    >
      <motion.div
        className="fade-x relative mx-auto cursor-grab active:cursor-grabbing"
        style={{ height: cardH + 28, perspective: 1400, touchAction: 'pan-y' }}
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
              aria-label={`${i + 1} / ${n} · ${f.label}`}
              aria-hidden={!isActive}
              className="absolute left-1/2 top-3"
              style={{ width: cardW, marginLeft: -cardW / 2, zIndex: 10 - abs }}
              initial={false}
              animate={{
                x: rel * step,
                y: isActive ? -6 : 6,
                scale: isActive ? 1.06 : 1 - Math.min(abs, 3) * 0.07,
                rotateY: rel * -7,
                opacity: hidden ? 0 : 1 - abs * 0.3,
              }}
              transition={wrapped || reduced ? { duration: 0 } : spring}
              onClick={() => !isActive && setActive(i)}
            >
              <div
                className="relative overflow-hidden rounded-[20px] border p-3.5 backdrop-blur-md transition-[border-color,box-shadow] duration-500"
                style={{
                  height: cardH,
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.015))',
                  borderColor: isActive ? `${tone}66` : 'rgba(248,243,235,0.10)',
                  boxShadow: isActive
                    ? `0 30px 80px -30px ${tone}55, inset 0 1px 0 rgba(255,255,255,0.06)`
                    : 'inset 0 1px 0 rgba(255,255,255,0.04)',
                }}
              >
                <div className="flex items-center justify-between px-1">
                  <span className="mono inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.12em]" style={{ color: tone }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone }} />
                    {f.label}
                  </span>
                  <span className="mono text-[10px] text-cream/35">
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
                <p className="mono absolute m-0 text-[11px] text-cream/45" style={{ left: 18, bottom: 14 }}>
                  {f.meta}
                </p>
                {isActive && !paused && (
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

      {/* Controls */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <button type="button" onClick={() => go(-1)} aria-label={labels.prev} className="carousel-btn">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M12 7 H2 M2 7 L6.5 2.5 M2 7 L6.5 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex items-center gap-1.5">
          {frames.map((f, i) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={f.label}
              aria-current={i === active}
              className="group flex h-6 items-center px-0.5"
            >
              <motion.span
                className="block h-1.5 rounded-full"
                animate={{ width: i === active ? 22 : 6, backgroundColor: i === active ? '#FE5D1C' : 'rgba(248,243,235,0.25)' }}
                transition={spring}
              />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label={labels.next} className="carousel-btn">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7 H12 M12 7 L7.5 2.5 M12 7 L7.5 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-label={userPaused ? labels.play : labels.pause}
          aria-pressed={userPaused}
          className="carousel-btn"
        >
          {userPaused ? (
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5 L10 6 L3 10.5 Z" fill="currentColor" /></svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5 V10.5 M9 1.5 V10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          )}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">{focused || userPaused ? `${current.label} — ${current.meta}` : ''}</p>
    </div>
  );
}
