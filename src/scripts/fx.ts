/**
 * Site-wide motion layer.
 *
 * anime.js drives choreography: the hero intro timeline, split-text headings,
 * scrambled eyebrows and SVG strokes drawn on scroll.
 * motion (vanilla) drives scroll-linked parallax.
 *
 * Every effect is opt-in through data attributes, so sections stay plain markup:
 *   [data-hero-intro]      hero root — runs the intro timeline once per page load
 *   [data-split]           heading — words rise from a clipped line when scrolled into view
 *   [data-scramble]        short mono label — text decodes when scrolled into view
 *   [data-draw]            svg — every path/line inside is drawn, synced to scroll
 *   [data-rise]            group — direct children stagger up when scrolled into view
 *   [data-parallax-y="n"]  element — drifts n px against the scroll across its section
 */
import {
  animate,
  createTimeline,
  onScroll,
  scrambleText,
  splitText,
  stagger,
  svg,
  utils,
  type Revertible,
} from 'animejs';
import { animate as motionAnimate, inView, scroll } from 'motion';

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type Cleanup = () => void;
let cleanups: Cleanup[] = [];

function track(r: Revertible | Cleanup | undefined | null) {
  if (!r) return;
  cleanups.push(typeof r === 'function' ? r : () => r.revert());
}

/**
 * One-shot reveals: start paused, play to completion the first time the element
 * enters the viewport. (anime's onScroll autoplay pauses on leave, which strands
 * half-finished reveals when someone scrolls fast.)
 */
function playWhenVisible(el: Element, anim: { play: () => unknown }) {
  track(inView(el, () => void anim.play(), { margin: '0px 0px -80px 0px' }));
}

/* ------------------------------------------------------------------ hero */

function heroIntro(root: HTMLElement) {
  const q = <T extends Element = HTMLElement>(sel: string) => root.querySelector<T>(sel);
  const qa = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));

  const title = q('[data-hero-title]');
  const reveal = qa('[data-hero-in]');

  if (prefersReduced()) {
    root.dataset.intro = 'done';
    return;
  }

  const words = title ? splitText(title, { words: { wrap: 'clip' } }).words : [];
  track(() => title && utils.remove(title));

  // Hide everything we are about to bring in before releasing the CSS guard.
  utils.set(words, { y: '110%' });
  utils.set(reveal, { opacity: 0, y: 18 });
  utils.set(['.hx-body', '.hx-top', '.hx-left'].map((s) => q(s)).filter(Boolean) as Element[], { opacity: 0 });
  root.dataset.intro = 'running';

  const outlinePath = q<SVGPathElement>('.hx-outline');
  const outline = outlinePath ? svg.createDrawable(outlinePath) : [];
  const eyebrow = q('[data-hero-eyebrow]');

  const tl = createTimeline({ defaults: { ease: 'outExpo', duration: 900 } });

  tl.add(outline, { draw: ['0 0', '0 1'], duration: 1000, ease: 'inOutQuad' }, 0)
    .add('.hx-body', { opacity: [0, 1], scale: [0.86, 1], duration: 700, ease: 'outBack(1.6)' }, 700)
    .add('.hx-top', { opacity: [0, 1], y: [-22, 0], duration: 700, ease: 'outBack(2.2)' }, 900)
    .add('.hx-left', { opacity: [0, 1], x: [-18, 0], y: [12, 0], duration: 700, ease: 'outBack(2.2)' }, 1020)
    .add(outline, { opacity: [1, 0], duration: 400 }, 1200)
    .add(reveal, { opacity: [0, 1], y: [18, 0], delay: stagger(90) }, 600)
    .add(words, { y: ['110%', '0%'], duration: 1100, delay: stagger(55) }, 760);

  if (eyebrow) {
    tl.add(eyebrow, { innerHTML: scrambleText({ chars: 'uppercase', override: '' }), duration: 1100, ease: 'linear' }, 650);
  }
  tl.then(() => {
    root.dataset.intro = 'done';
  });
  track(tl);

  // Idle: the emblem's lid bobs once in a while so the mark feels alive.
  const idle = animate('.hx-top', {
    y: [0, -4, 0],
    duration: 1400,
    delay: 2600,
    loopDelay: 4200,
    loop: true,
    ease: 'inOutSine',
  });
  track(idle);
}

/* --------------------------------------------------------- scroll effects */

function splitHeadings() {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const split = splitText(el, { words: { wrap: 'clip' } });
    utils.set(split.words, { y: '105%' });
    const anim = animate(split.words, {
      y: ['105%', '0%'],
      duration: 1000,
      delay: stagger(45),
      ease: 'outExpo',
      autoplay: false,
    });
    playWhenVisible(el, anim);
    track(anim);
    track(split);
  });
}

function scrambles() {
  document.querySelectorAll<HTMLElement>('[data-scramble]').forEach((el) => {
    const anim = animate(el, {
      innerHTML: scrambleText({ chars: 'uppercase', override: '' }),
      duration: 900,
      ease: 'linear',
      autoplay: false,
    });
    playWhenVisible(el, anim);
    track(anim);
  });
}

function drawOnScroll() {
  document.querySelectorAll<SVGElement>('[data-draw]').forEach((el) => {
    const shapes = el.querySelectorAll<SVGGeometryElement>('path, line, polyline, circle, rect');
    const drawables = svg.createDrawable(shapes);
    const anim = animate(drawables, {
      draw: ['0 0', '0 1'],
      ease: 'inOutSine',
      delay: stagger(80),
      autoplay: onScroll({
        target: el,
        enter: 'bottom top',
        leave: 'center center',
        sync: 0.6,
      }),
    });
    track(anim);
  });
}

function rises() {
  document.querySelectorAll<HTMLElement>('[data-rise]').forEach((group) => {
    const items = Array.from(group.children) as HTMLElement[];
    utils.set(items, { opacity: 0, y: 28 });
    const anim = animate(items, {
      opacity: [0, 1],
      y: [28, 0],
      duration: 900,
      delay: stagger(Number(group.dataset.rise) || 90),
      ease: 'outExpo',
      autoplay: false,
    });
    playWhenVisible(group, anim);
    track(anim);
  });
}

function parallax() {
  document.querySelectorAll<HTMLElement>('[data-parallax-y]').forEach((el) => {
    const dist = Number(el.dataset.parallaxY) || 40;
    const target = el.closest('section') ?? el;
    const stop = scroll(motionAnimate(el, { y: [dist, -dist] }, { ease: 'linear' }), {
      target,
      offset: ['start end', 'end start'],
    });
    track(stop);
  });
}

/* --------------------------------------------------------------- lifecycle */

export function initFx() {
  destroyFx();
  const hero = document.querySelector<HTMLElement>('[data-hero-intro]');
  if (hero) {
    try {
      heroIntro(hero);
    } catch (err) {
      // Never leave the hero hidden behind the CSS guard.
      hero.dataset.intro = 'done';
      console.error(err);
    }
  }

  if (prefersReduced()) return;
  splitHeadings();
  scrambles();
  drawOnScroll();
  rises();
  parallax();
}

export function destroyFx() {
  cleanups.forEach((fn) => {
    try {
      fn();
    } catch {
      /* already reverted */
    }
  });
  cleanups = [];
}
