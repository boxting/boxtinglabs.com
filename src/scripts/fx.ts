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
 *   [data-manifesto]       manifesto — pinned cube builds as the principles scroll in
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
  root.dataset.intro = 'running';

  const tl = createTimeline({ defaults: { ease: 'outExpo', duration: 900 } });

  tl.add(reveal, { opacity: [0, 1], y: [18, 0], delay: stagger(110) }, 100)
    .add(words, { y: ['110%', '0%'], duration: 1100, delay: stagger(55) }, 300);
  tl.then(() => {
    root.dataset.intro = 'done';
  });
  track(tl);
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

/* ------------------------------------------------------------- manifesto */

/**
 * Pinned manifesto: each principle slides in from the right, scrubbed to its own
 * scroll position (motion), while the pinned cube builds in step (anime timeline
 * synced to the list): outline → lid → side facet → filled mark.
 */
function manifestoScroll() {
  const root = document.querySelector<HTMLElement>('[data-manifesto]');
  if (!root) return;
  const q = (sel: string) => root.querySelector<SVGElement>(sel);
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-principle]'));
  const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'));
  const list = root.querySelector<HTMLElement>('.principles');

  items.forEach((item, i) => {
    track(
      scroll(
        motionAnimate(item, { opacity: [0.06, 1], x: [96, 0], filter: ['blur(8px)', 'blur(0px)'] }, { ease: 'linear' }),
        { target: item, offset: ['start end', 'start 55%'] },
      ),
    );
    const bar = item.querySelector<HTMLElement>('.principle-bar');
    if (bar) {
      track(scroll(motionAnimate(bar, { scaleX: [0, 1] }, { ease: 'linear' }), { target: item, offset: ['start 70%', 'start 35%'] }));
    }
    track(scroll((p: number) => steps[i]?.classList.toggle('is-on', p > 0.5), { target: item, offset: ['start 70%', 'start 35%'] }));
  });

  const outline = q('.mc-outline');
  const lid = q('.mc-top');
  const side = q('.mc-left');
  if (!list || !outline || !lid || !side) return;

  const tl = createTimeline({
    defaults: { ease: 'inOutSine' },
    autoplay: onScroll({ target: list, enter: 'bottom top', leave: 'center bottom', sync: 0.35 }),
  });
  tl.add(q('.mc-guides')!, { opacity: [0, 1], duration: 600 }, 0)
    .add(svg.createDrawable(outline), { draw: ['0 0', '0 1'], duration: 1000 }, 0)
    .add(svg.createDrawable(lid), { draw: ['0 0', '0 1'], duration: 600 }, 1000)
    .add(lid, { y: [-36, 0], ease: 'outBack(1.4)', duration: 800 }, 1000)
    .add(svg.createDrawable(side), { draw: ['0 0', '0 1'], duration: 600 }, 2000)
    .add(side, { x: [-30, 0], y: [16, 0], ease: 'outBack(1.4)', duration: 800 }, 2000)
    .add(q('.mc-fill')!, { opacity: [0, 1], duration: 500 }, 3000)
    .add([q('.mc-top-fill')!, q('.mc-left-fill')!], { opacity: [0, 1], duration: 500 }, 3200)
    .add([outline, lid, side], { opacity: [1, 0], duration: 400 }, 3300)
    .add(q('.mc-guides')!, { opacity: [1, 0.35], duration: 400 }, 3300);
  track(tl);
}

/** Reduced motion: show the finished mark instead of the build-up. */
function manifestoStatic() {
  document
    .querySelectorAll<SVGElement>('[data-manifesto] .mc-fill, [data-manifesto] .mc-top-fill, [data-manifesto] .mc-left-fill')
    .forEach((el) => el.setAttribute('opacity', '1'));
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

  if (prefersReduced()) {
    manifestoStatic();
    return;
  }
  splitHeadings();
  scrambles();
  rises();
  parallax();
  manifestoScroll();
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
