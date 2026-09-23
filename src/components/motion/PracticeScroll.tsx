import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import SpotlightCard from './SpotlightCard';

export interface PracticeItem {
  n: string;
  title: string;
  body: string;
  tags: string[];
}

interface Props {
  items: PracticeItem[];
  /** Section heading, pinned above the stage (Astro `slot="intro"`). */
  intro?: ReactNode;
}

/** Per-practice art direction: animated icon in public/svg/practice/ and accent. */
const PRACTICE = [
  { icon: 'software', rgb: '254,93,28', hex: '#FE5D1C' },
  { icon: 'ai', rgb: '255,158,104', hex: '#FF9E68' },
  { icon: 'cloud', rgb: '125,163,255', hex: '#7DA3FF' },
  { icon: 'consulting', rgb: '124,214,180', hex: '#7CD6B4' },
];

/** Where keyword tags float around the icon, alternating sides. */
const SLOTS: CSSProperties[] = [
  { left: '7%', top: '20%' },
  { right: '7%', top: '32%' },
  { left: '9%', bottom: '24%' },
  { right: '9%', bottom: '16%' },
];

const ease = [0.16, 1, 0.3, 1] as const;

/** Height of the fixed site nav — the pinned column centres in the space below it. */
const NAV = 68;

function PracticeCard({
  item,
  index,
  active,
  desktop,
  reduced,
  cardRef,
}: {
  item: PracticeItem;
  index: number;
  active: boolean;
  desktop: boolean;
  reduced: boolean;
  cardRef: (el: HTMLLIElement | null) => void;
}) {
  const ref = useRef<HTMLLIElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 60%'] });
  const x = useTransform(scrollYProgress, [0, 1], [-88, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.05, 1]);
  const filter = useTransform(scrollYProgress, (v) => `blur(${((1 - v) * 8).toFixed(2)}px)`);
  const p = PRACTICE[index % PRACTICE.length];
  // A hovered card lights up even when it isn't the one in focus.
  const [hover, setHover] = useState(false);
  const lit = active || hover || !desktop;

  return (
    <motion.li
      ref={(el) => {
        ref.current = el;
        cardRef(el);
      }}
      style={reduced ? undefined : { x, opacity, filter }}
    >
      <motion.div
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        animate={{ opacity: lit ? 1 : 0.42, scale: lit ? 1 : 0.975 }}
        transition={{ duration: 0.4, ease }}
      >
        <SpotlightCard rgb={p.rgb} tilt={3}>
          <article className="practice-card" data-active={active || undefined}>
            <div className="practice-card-top">
              <img
                src={`/svg/practice/${p.icon}.svg`}
                alt=""
                width={64}
                height={64}
                className="practice-card-icon"
                loading="lazy"
              />
              <span className="mono practice-card-n" style={{ color: p.hex }}>
                {item.n}
              </span>
            </div>
            <h3 className="practice-card-title">{item.title}</h3>
            <p className="practice-card-body">{item.body}</p>
          </article>
        </SpotlightCard>
      </motion.div>
    </motion.li>
  );
}

export default function PracticeScroll({ items, intro }: Props) {
  const reduced = !!useReducedMotion();
  const cards = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [desktop, setDesktop] = useState(true);
  const { scrollY } = useScroll();

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 960px)');
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // The card whose centre is nearest the focus line drives the stage. The line sits in the
  // middle of the area under the fixed nav, where the pinned column is centred too.
  const pick = useCallback(() => {
    const line = NAV + (window.innerHeight - NAV) / 2;
    let best = 0;
    let bestDist = Infinity;
    cards.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - line);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  }, []);

  useEffect(pick, [pick]);
  useMotionValueEvent(scrollY, 'change', pick);

  const goTo = (i: number) =>
    cards.current[i]?.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' });

  const item = items[active];
  const p = PRACTICE[active % PRACTICE.length];

  return (
    <div className="practice-grid">
      <ol className="practice-list">
        {items.map((it, i) => (
          <PracticeCard
            key={it.n}
            item={it}
            index={i}
            active={i === active}
            desktop={desktop}
            reduced={reduced}
            cardRef={(el) => {
              cards.current[i] = el;
            }}
          />
        ))}
      </ol>

      {/* Pinned column: section heading + a decorative stage mirroring the card in focus */}
      <aside className="practice-stage-wrap">
        <div className="practice-aside">
          {intro && <div className="practice-intro">{intro}</div>}
          <div
            className="practice-stage"
            aria-hidden="true"
            style={{ ['--tone' as string]: p.hex, ['--tone-rgb' as string]: p.rgb }}
          >
            <div className="practice-stage-head">
              <span className="mono">
                <span style={{ color: p.hex }}>{item.n}</span> /{' '}
                {String(items.length).padStart(2, '0')}
              </span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={item.n}
                  className="mono practice-stage-label"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  {item.title}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="practice-stage-art">
              <div className="practice-stage-glow" />
              <div className="practice-ring practice-ring-1" />
              <div className="practice-ring practice-ring-2" />
              <div className="practice-ring practice-ring-3" />

              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={p.icon}
                  src={`/svg/practice/${p.icon}.svg`}
                  alt=""
                  className="practice-stage-icon"
                  initial={
                    reduced
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.7, rotate: -8, filter: 'blur(14px)' }
                  }
                  animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
                  exit={
                    reduced
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 1.25, rotate: 6, filter: 'blur(14px)' }
                  }
                  transition={{ duration: 0.6, ease }}
                />
              </AnimatePresence>

              <AnimatePresence initial={false}>
                {item.tags.map((tag, i) => (
                  <motion.span
                    key={`${item.n}-${tag}`}
                    className="practice-tag mono"
                    style={SLOTS[i % SLOTS.length]}
                    initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: [0, -6, 0], filter: 'blur(0px)' }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      filter: 'blur(6px)',
                      transition: { duration: 0.25 },
                    }}
                    transition={{
                      opacity: { duration: 0.45, delay: 0.12 + i * 0.07 },
                      filter: { duration: 0.45, delay: 0.12 + i * 0.07 },
                      y: reduced
                        ? { duration: 0 }
                        : { duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 },
                    }}
                  >
                    <span className="practice-tag-dot" />
                    {tag}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>

            <div className="practice-rail">
              {items.map((it, i) => (
                <button
                  key={it.n}
                  type="button"
                  tabIndex={-1}
                  onClick={() => goTo(i)}
                  className="practice-rail-seg"
                  data-on={i <= active || undefined}
                >
                  <motion.span
                    className="practice-rail-fill"
                    initial={false}
                    animate={{ scaleX: i <= active ? 1 : 0 }}
                    transition={{ duration: 0.5, ease }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
