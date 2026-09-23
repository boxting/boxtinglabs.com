import * as React from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

export interface WorkProject {
  key: string;
  client: string;
  title: string;
  industry: string;
  role: string;
  year: string;
  outcome: string;
  accent: 'plum' | 'sky' | 'orange';
  images?: string[];
}

interface MetaLabels {
  industry: string;
  role: string;
}

interface StickyWorkShowcaseProps {
  projects: WorkProject[];
  metaLabels: MetaLabels;
}

const ACCENT_TEXT: Record<WorkProject['accent'], string> = {
  plum: 'text-plum',
  sky: 'text-sky',
  orange: 'text-orange',
};

const ACCENT_BG: Record<WorkProject['accent'], string> = {
  plum: '#6E2F66',
  sky: '#2B5CE6',
  orange: '#FE5D1C',
};

const SPRING = { type: 'spring' as const, stiffness: 400, damping: 30 };

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  return isDesktop;
}

/* ===== Static fallback — mobile & reduced-motion ===== */
function WorkFallbackList({ projects, metaLabels }: StickyWorkShowcaseProps) {
  return (
    <div className="flex flex-col gap-6">
      {projects.map((p) => (
        <article
          key={p.key}
          className="lift glass relative overflow-hidden rounded-lg p-6 md:p-7"
          style={{ borderRadius: 18 }}
        >
          <div
            aria-hidden="true"
            className="iso-pattern pointer-events-none absolute inset-0 -z-10 opacity-70"
            style={{ backgroundColor: `${ACCENT_BG[p.accent]}1a` }}
          />
          {p.images?.[0] && (
            <img
              src={p.images[0]}
              alt=""
              aria-hidden="true"
              className="mb-5 h-40 w-auto rounded-md object-cover object-top shadow-2"
            />
          )}
          <div className="flex items-baseline justify-between gap-4">
            <p className={`mono text-caption ${ACCENT_TEXT[p.accent]}`}>{p.client}</p>
            <span className="mono text-caption text-fog shrink-0">{p.year}</span>
          </div>
          <h3
            className="mt-4 text-ink font-semibold"
            style={{ fontSize: 30, lineHeight: 1.1, letterSpacing: '-0.028em' }}
          >
            {p.title}
          </h3>
          <p className="mt-4 text-body text-steel max-w-prose">{p.outcome}</p>
          <dl className="hairline mt-6 grid grid-cols-1 gap-2 border-t pt-5">
            <div className="flex items-baseline justify-between gap-5">
              <dt className="mono text-caption text-fog shrink-0">{metaLabels.industry}</dt>
              <dd className="text-small text-ink text-right">{p.industry}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-5">
              <dt className="mono text-caption text-fog shrink-0">{metaLabels.role}</dt>
              <dd className="text-small text-ink text-right">{p.role}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}

/* ===== Pinned scroll-driven showcase — desktop ===== */
function PinnedShowcase({ projects, metaLabels }: StickyWorkShowcaseProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const n = projects.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(n - 1, Math.max(0, Math.floor(v * n)));
    setActiveIndex((prev) => (prev === idx ? prev : idx));
  });

  return (
    <div ref={containerRef} style={{ height: `${n * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="page grid h-full grid-cols-12 items-center gap-6 py-8">
          {/* Pinned visual */}
          <div className="col-span-6 relative h-[68vh]">
            {projects.map((p, i) => (
              <ProjectVisual
                key={p.key}
                project={p}
                index={i}
                n={n}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          {/* Sliding detail pane */}
          <div className="col-span-6 relative h-[68vh]">
            {projects.map((p, i) => (
              <ProjectDetail
                key={p.key}
                project={p}
                index={i}
                n={n}
                metaLabels={metaLabels}
                scrollYProgress={scrollYProgress}
              />
            ))}

            {/* Progress rail */}
            <div className="absolute -left-8 top-1/2 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
              {projects.map((p, i) => (
                <div key={p.key} className="relative h-2 w-2">
                  {activeIndex === i && (
                    <motion.span
                      layoutId="work-active-dot"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: ACCENT_BG[p.accent] }}
                      transition={SPRING}
                    />
                  )}
                  {activeIndex !== i && (
                    <span className="absolute inset-0 rounded-full bg-ink/15" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function segmentRange(index: number, n: number) {
  // Fade windows sit strictly inside each segment and touch neighbors only
  // at the shared boundary point, so two panels are never both partially
  // visible at once (which reads as garbled double-exposed text).
  const pad = Math.min(0.05, 1 / n / 3);
  const start = index / n;
  const end = (index + 1) / n;
  return {
    fadeInStart: start,
    fadeInEnd: start + pad,
    fadeOutStart: end - pad,
    fadeOutEnd: end,
    isFirst: index === 0,
    isLast: index === n - 1,
  };
}

function ProjectVisual({
  project,
  index,
  n,
  scrollYProgress,
}: {
  project: WorkProject;
  index: number;
  n: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const { fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd, isFirst, isLast } = segmentRange(
    index,
    n
  );
  const opacity = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0.96, 1, 1, 1.04]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl"
      style={{ opacity, scale, backgroundColor: `${ACCENT_BG[project.accent]}14` }}
    >
      <div
        aria-hidden="true"
        className="iso-pattern absolute inset-0 opacity-60"
        style={{ backgroundColor: `${ACCENT_BG[project.accent]}0d` }}
      />
      {project.images?.length ? (
        <div className="relative flex gap-4 px-6">
          {project.images.slice(0, 3).map((src, i) => (
            <div
              key={src}
              className="w-[150px] shrink-0 overflow-hidden rounded-md bg-ink shadow-3"
              style={{
                aspectRatio: '9 / 19',
                transform: `translateY(${i % 2 === 0 ? '0' : '18px'})`,
              }}
            >
              <img src={src} alt="" className="h-full w-full object-cover object-top" />
            </div>
          ))}
        </div>
      ) : (
        <span
          className="relative font-semibold"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 'clamp(96px, 12vw, 180px)',
            letterSpacing: '-0.04em',
            color: ACCENT_BG[project.accent],
            opacity: 0.9,
          }}
        >
          {project.title.charAt(0)}
        </span>
      )}
    </motion.div>
  );
}

function ProjectDetail({
  project,
  index,
  n,
  metaLabels,
  scrollYProgress,
}: {
  project: WorkProject;
  index: number;
  n: number;
  metaLabels: MetaLabels;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const { fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd, isFirst, isLast } = segmentRange(
    index,
    n
  );
  const opacity = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0]
  );
  const y = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [24, 0, 0, -24]
  );

  return (
    <motion.div className="absolute inset-0 flex flex-col justify-center" style={{ opacity, y }}>
      <div className="flex items-baseline justify-between gap-4">
        <p className={`mono text-caption ${ACCENT_TEXT[project.accent]}`}>{project.client}</p>
        <span className="mono text-caption text-fog shrink-0">{project.year}</span>
      </div>
      <h3
        className="mt-4 text-ink font-semibold"
        style={{ fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: 1.08, letterSpacing: '-0.03em' }}
      >
        {project.title}
      </h3>
      <p className="mt-5 text-body text-steel max-w-prose">{project.outcome}</p>
      <dl className="hairline mt-7 grid grid-cols-1 gap-3 border-t pt-6">
        <div className="flex items-baseline justify-between gap-5">
          <dt className="mono text-caption text-fog shrink-0">{metaLabels.industry}</dt>
          <dd className="text-small text-ink text-right">{project.industry}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-5">
          <dt className="mono text-caption text-fog shrink-0">{metaLabels.role}</dt>
          <dd className="text-small text-ink text-right">{project.role}</dd>
        </div>
      </dl>
    </motion.div>
  );
}

export default function StickyWorkShowcase({ projects, metaLabels }: StickyWorkShowcaseProps) {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();

  if (prefersReducedMotion || !isDesktop) {
    return <WorkFallbackList projects={projects} metaLabels={metaLabels} />;
  }

  return <PinnedShowcase projects={projects} metaLabels={metaLabels} />;
}
