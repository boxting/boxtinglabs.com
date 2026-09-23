import { useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';

const CUBE =
  'M67 .06C72.5-.24 77.8.6 83 2.56C98 10.89 113 19.22 128 27.56C135.7 31.6 140.9 37.77 143.5 46.06C144.2 68.06 144.2 90.06 143.5 112.06C141.3 119.63 136.8 125.46 130 129.56C113.1 139.16 96.1 148.49 79 157.56C72.4 158.64 66.1 157.97 60 155.56C43.5 146.48 27.2 137.14 11 127.56C5.4 122.97 1.9 117.13.5 110.06C-.17 89.06-.17 68.06.5 47.06C3.8 38.09 9.6 31.25 18 26.56C34.1 17.16 50.5 8.32 67 .06Z';
const TOP = 'M66 26.06C70 25.89 74 26.06 78 26.56C89.7 32.72 101 39.39 112 46.56C100.1 54.02 87.7 60.68 75 66.56C72.7 67.22 70.3 67.22 68 66.56C55.8 59.98 43.8 53.14 32 46.06C43.4 39.36 54.7 32.7 66 26.06Z';

/** Wireframe cubes scattered around the hero; depth drives parallax strength. */
const CUBES = [
  { x: '6%', y: '58%', size: 70, depth: 1.2, rot: -12, dur: 9 },
  { x: '15%', y: '82%', size: 34, depth: 0.6, rot: 18, dur: 7 },
  { x: '88%', y: '62%', size: 88, depth: 1.5, rot: 10, dur: 11 },
  { x: '79%', y: '86%', size: 40, depth: 0.8, rot: -20, dur: 8 },
  { x: '94%', y: '40%', size: 26, depth: 0.5, rot: 30, dur: 6 },
  { x: '3%', y: '36%', size: 22, depth: 0.4, rot: -30, dur: 7.5 },
];

function Cube({
  cube,
  px,
  py,
  scrollY,
  reduced,
}: {
  cube: (typeof CUBES)[number];
  px: MotionValue<number>;
  py: MotionValue<number>;
  scrollY: MotionValue<number>;
  reduced: boolean;
}) {
  const x = useTransform(px, (v) => v * cube.depth * 22);
  const pointerY = useTransform(py, (v) => v * cube.depth * 22);
  const scrollShift = useTransform(scrollY, [0, 900], [0, -140 * cube.depth]);
  const y = useTransform([pointerY, scrollShift] as MotionValue<number>[], ([a, b]: number[]) => a + b);

  return (
    <motion.div className="absolute" style={{ left: cube.x, top: cube.y, x, y }}>
      <motion.svg
        viewBox="-4 -4 152 167"
        width={cube.size}
        height={cube.size * 1.1}
        fill="none"
        initial={{ opacity: 0, scale: 0.6, rotate: cube.rot - 20 }}
        animate={
          reduced
            ? { opacity: 1, scale: 1, rotate: cube.rot }
            : { opacity: 1, scale: 1, rotate: [cube.rot, cube.rot + 8, cube.rot], y: [0, -14, 0] }
        }
        transition={{
          opacity: { duration: 1.2, delay: 0.9 + cube.depth * 0.3 },
          scale: { duration: 1.2, delay: 0.9 + cube.depth * 0.3, ease: [0.16, 1, 0.3, 1] },
          rotate: { duration: cube.dur, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: cube.dur * 0.8, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <path d={CUBE} stroke="rgba(248,243,235,0.16)" strokeWidth={144 / cube.size} />
        <path d={TOP} stroke="rgba(254,93,28,0.45)" strokeWidth={144 / cube.size} />
      </motion.svg>
    </motion.div>
  );
}

export default function AmbientField() {
  const reduced = !!useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  const { scrollY } = useScroll();

  // Spotlight follows the pointer in page pixels.
  const gx = useMotionValue(-1000);
  const gy = useMotionValue(-1000);
  const glowX = useSpring(gx, { stiffness: 90, damping: 22 });
  const glowY = useSpring(gy, { stiffness: 90, damping: 22 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
      gx.set(e.clientX - 300);
      gy.set(e.clientY + window.scrollY - 300);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced, px, py, gx, gy]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Perspective grid floor */}
      <div className="hero-grid absolute inset-x-0 bottom-0 h-[55%]" />

      {/* Breathing ambient glows — direction B */}
      <motion.div
        className="ambient"
        style={{
          left: '50%',
          top: -300,
          width: 1100,
          height: 700,
          marginLeft: -550,
          background: 'radial-gradient(closest-side, rgba(254,93,28,0.20), rgba(254,93,28,0) 100%)',
        }}
        animate={reduced ? undefined : { opacity: [0.75, 1, 0.75], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="ambient"
        style={{
          left: -180,
          top: 60,
          width: 440,
          height: 440,
          background: 'radial-gradient(closest-side, rgba(254,93,28,0.16), rgba(254,93,28,0))',
        }}
        animate={reduced ? undefined : { x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="ambient"
        style={{
          right: -200,
          top: 40,
          width: 480,
          height: 480,
          background: 'radial-gradient(closest-side, rgba(43,92,230,0.18), rgba(43,92,230,0))',
        }}
        animate={reduced ? undefined : { x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Pointer spotlight */}
      {!reduced && (
        <motion.div
          className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full"
          style={{
            x: glowX,
            y: glowY,
            background: 'radial-gradient(closest-side, rgba(254,93,28,0.10), rgba(254,93,28,0))',
          }}
        />
      )}

      {CUBES.map((c, i) => (
        <Cube key={i} cube={c} px={sx} py={sy} scrollY={scrollY} reduced={reduced} />
      ))}
    </div>
  );
}
