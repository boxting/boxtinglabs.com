#!/usr/bin/env node
/**
 * Generates the static brand images (link previews, icons, Upwork banner) from
 * the same primitives as public/svg/frames and the hero's ambient field.
 *
 *   node tools/brand-images.mjs
 *
 * SVG sources land in assets/, rasters in public/ (served) or assets/ (uploads).
 * Rasterising uses headless Chrome so Google Fonts load exactly as on the site;
 * override the binary with CHROME_PATH.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

// ---- Brand primitives ------------------------------------------------------

const CUBE =
  'M67 .06C72.5-.24 77.8.6 83 2.56C98 10.89 113 19.22 128 27.56C135.7 31.6 140.9 37.77 143.5 46.06C144.2 68.06 144.2 90.06 143.5 112.06C141.3 119.63 136.8 125.46 130 129.56C113.1 139.16 96.1 148.49 79 157.56C72.4 158.64 66.1 157.97 60 155.56C43.5 146.48 27.2 137.14 11 127.56C5.4 122.97 1.9 117.13.5 110.06C-.17 89.06-.17 68.06.5 47.06C3.8 38.09 9.6 31.25 18 26.56C34.1 17.16 50.5 8.32 67 .06Z';
const TOP =
  'M66 26.06C70 25.89 74 26.06 78 26.56C89.7 32.72 101 39.39 112 46.56C100.1 54.02 87.7 60.68 75 66.56C72.7 67.22 70.3 67.22 68 66.56C55.8 59.98 43.8 53.14 32 46.06C43.4 39.36 54.7 32.7 66 26.06Z';
const LEFT =
  'M22 66.06C32.3 71.88 42.6 77.71 53 83.56C56.2 85.39 58.7 87.89 60.5 91.06C62.1 104.32 62.4 117.66 61.5 131.06C51.2 124.84 40.7 119.01 30 113.56C27.3 111.96 25.1 109.8 23.5 107.06C22.1 93.46 21.6 79.8 22 66.06Z';

const TONES = { orange: '#FE5D1C', sky: '#7DA3FF', mint: '#7CD6B4' };

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&amp;family=DM+Sans:opsz,wght@9..40,500;9..40,700&amp;family=Instrument+Serif:ital@0;1&amp;display=swap');
    .sans { font-family: 'DM Sans', system-ui, -apple-system, sans-serif; }
    .mono { font-family: 'DM Mono', ui-monospace, Menlo, monospace; }
    .serif { font-family: 'Instrument Serif', Georgia, serif; }`;

/** Colour mark (orange body, cream facets), 144×159 units scaled by `s`. */
const mark = (s, { body = '#FE5D1C', facet = '#F8F3EB' } = {}) => `
    <g transform="scale(${s})">
      <path d="${CUBE}" fill="${body}"/>
      <path d="${TOP}" fill="${facet}"/>
      <path d="${LEFT}" fill="${facet}"/>
    </g>`;

// Resting state of public/svg/frames/*, ids prefixed so several can share a document.
const FRAMES = {
  agent: `
  <circle cx="60" cy="46" r="13" fill="#FE5D1C" fill-opacity=".25"/>
  <path d="M60 36 L62.4 43.6 L70 46 L62.4 48.4 L60 56 L57.6 48.4 L50 46 L57.6 43.6 Z" fill="#FE5D1C"/>
  <rect x="80" y="40" width="58" height="5" rx="2.5" fill="#F8F3EB" fill-opacity=".85"/>
  <circle cx="84" cy="52" r="2.5" fill="#7CD6B4"/>
  <rect x="90" y="50.5" width="36" height="3" rx="1.5" fill="#F8F3EB" fill-opacity=".3"/>
  <path d="M36 68 H 284" stroke="#F8F3EB" stroke-opacity=".08"/>
  <rect x="52" y="80" width="140" height="24" rx="12" fill="#F8F3EB" fill-opacity=".09"/>
  <rect x="64" y="90" width="100" height="4" rx="2" fill="#F8F3EB" fill-opacity=".55"/>
  <rect x="156" y="112" width="112" height="24" rx="12" fill="#FE5D1C"/>
  <rect x="168" y="122" width="76" height="4" rx="2" fill="#08090B" fill-opacity=".7"/>
  <rect x="52" y="144" width="176" height="40" rx="12" fill="#F8F3EB" fill-opacity=".09"/>
  <rect x="64" y="154" width="130" height="4" rx="2" fill="#F8F3EB" fill-opacity=".6"/>
  <rect x="64" y="163" width="150" height="4" rx="2" fill="#F8F3EB" fill-opacity=".4"/>
  <rect x="64" y="172" width="84" height="4" rx="2" fill="#F8F3EB" fill-opacity=".4"/>
  <rect x="52" y="192" width="64" height="16" rx="8" stroke="#FE5D1C" stroke-opacity=".6"/>
  <rect x="62" y="198" width="44" height="4" rx="2" fill="#FF9E68"/>
  <rect x="122" y="192" width="56" height="16" rx="8" stroke="#F8F3EB" stroke-opacity=".2"/>
  <rect x="132" y="198" width="36" height="4" rx="2" fill="#F8F3EB" fill-opacity=".4"/>`,
  web: `
  <rect x="24" y="26" width="272" height="188" rx="12" fill="#F8F3EB" fill-opacity=".035" stroke="#F8F3EB" stroke-opacity=".14"/>
  <g clip-path="url(#web-win)">
    <path d="M24 50 H 296" stroke="#F8F3EB" stroke-opacity=".1"/>
    <circle cx="40" cy="38" r="3.5" fill="#FE5D1C"/>
    <circle cx="52" cy="38" r="3.5" fill="#F8F3EB" fill-opacity=".22"/>
    <circle cx="64" cy="38" r="3.5" fill="#F8F3EB" fill-opacity=".22"/>
    <rect x="96" y="32" width="128" height="12" rx="6" fill="#F8F3EB" fill-opacity=".06"/>
    <circle cx="106" cy="38" r="2.5" fill="#7CD6B4"/>
    <rect x="114" y="36.5" width="60" height="3" rx="1.5" fill="#F8F3EB" fill-opacity=".25"/>
    <rect x="40" y="64" width="240" height="64" rx="9" fill="url(#web-hero)"/>
    <rect x="54" y="80" width="104" height="8" rx="4" fill="#F8F3EB" fill-opacity=".9"/>
    <rect x="54" y="94" width="72" height="5" rx="2.5" fill="#F8F3EB" fill-opacity=".45"/>
    <rect x="54" y="140" width="68" height="20" rx="10" fill="#FE5D1C"/>
    <rect x="130" y="140" width="56" height="20" rx="10" stroke="#F8F3EB" stroke-opacity=".22"/>
    <rect x="40" y="172" width="74" height="30" rx="7" fill="#F8F3EB" fill-opacity=".06" stroke="#7DA3FF" stroke-opacity=".35"/>
    <rect x="123" y="172" width="74" height="30" rx="7" fill="#F8F3EB" fill-opacity=".06" stroke="#7DA3FF" stroke-opacity=".35"/>
    <rect x="206" y="172" width="74" height="30" rx="7" fill="#F8F3EB" fill-opacity=".06" stroke="#7DA3FF" stroke-opacity=".35"/>
    <rect x="60" y="26" width="120" height="188" fill="url(#web-shine)"/>
  </g>
  <path transform="translate(104 152)" d="M0 0 L0 15 L4 11 L7 18 L10 17 L7 10 L12 10 Z" fill="#F8F3EB" stroke="#08090B" stroke-width="1" stroke-linejoin="round"/>`,
  server: `${[
    [36, '#7CD6B4', 88, 1],
    [88, '#7CD6B4', 64, 1],
    [140, '#FE5D1C', 40, 0.7],
  ]
    .map(
      ([y, led, w, op]) => `
  <rect x="28" y="${y}" width="170" height="40" rx="9" fill="#F8F3EB" fill-opacity=".04" stroke="#F8F3EB" stroke-opacity=".14"/>
  <circle cx="46" cy="${y + 20}" r="3.5" fill="${led}"/>
  <rect x="60" y="${y + 17}" width="96" height="6" rx="3" fill="#F8F3EB" fill-opacity=".08"/>
  <rect x="60" y="${y + 17}" width="${w}" height="6" rx="3" fill="#4FA98A" fill-opacity="${op}"/>
  <path d="M168 ${y + 13}v14M174 ${y + 13}v14M180 ${y + 13}v14" stroke="#F8F3EB" stroke-opacity=".18" stroke-linecap="round"/>`
    )
    .join('')}
  <path d="M198 56 C 232 56, 236 108, 262 108" stroke="#7CD6B4" stroke-opacity=".7" stroke-width="1.4" stroke-dasharray="4 5"/>
  <path d="M198 108 H 262" stroke="#7CD6B4" stroke-opacity=".7" stroke-width="1.4" stroke-dasharray="4 5"/>
  <path d="M198 160 C 232 160, 236 108, 262 108" stroke="#7CD6B4" stroke-opacity=".7" stroke-width="1.4" stroke-dasharray="4 5"/>
  <circle cx="276" cy="108" r="20" stroke="#7CD6B4" stroke-opacity=".3" stroke-width="1.2"/>
  <circle cx="276" cy="108" r="14" fill="#10251E" stroke="#4FA98A" stroke-width="1.4"/>
  <path d="M270 108l4 4 8-8" stroke="#7CD6B4" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M28 214 H 292" stroke="#F8F3EB" stroke-opacity=".08"/>
  <path d="M28 210 L 60 206 L 84 208 L 110 199 L 134 203 L 160 194 L 186 198 L 212 190 L 240 193 L 266 186 L 292 188" stroke="#4FA98A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`,
  data: `
  <path d="M30 70 v96 c0 9 22 16 48 16 s48 -7 48 -16 v-96" fill="#F8F3EB" fill-opacity=".04" stroke="#F8F3EB" stroke-opacity=".18"/>
  <ellipse cx="78" cy="70" rx="48" ry="16" fill="#12192A" stroke="#7DA3FF" stroke-opacity=".6"/>
  <path d="M30 102 c0 9 22 16 48 16 s48 -7 48 -16" stroke="#7DA3FF" stroke-opacity=".6"/>
  <path d="M30 134 c0 9 22 16 48 16 s48 -7 48 -16" stroke="#7DA3FF" stroke-opacity=".6"/>
  <circle cx="108" cy="92" r="3" fill="#7CD6B4"/>
  <circle cx="108" cy="124" r="3" fill="#7CD6B4"/>
  <circle cx="108" cy="156" r="3" fill="#FE5D1C"/>
  <path d="M126 118 H 170" stroke="#7DA3FF" stroke-opacity=".7" stroke-width="1.4" stroke-dasharray="4 5"/>
  <rect x="170" y="44" width="124" height="152" rx="12" fill="#F8F3EB" fill-opacity=".04" stroke="#F8F3EB" stroke-opacity=".14"/>
  <rect x="184" y="58" width="44" height="5" rx="2.5" fill="#F8F3EB" fill-opacity=".6"/>
  <rect x="184" y="68" width="28" height="4" rx="2" fill="#F8F3EB" fill-opacity=".25"/>
  <path d="M184 180 H 280" stroke="#F8F3EB" stroke-opacity=".12"/>
  <rect x="186" y="138" width="10" height="42" rx="3" fill="#2B5CE6" fill-opacity=".55"/>
  <rect x="202" y="122" width="10" height="58" rx="3" fill="#2B5CE6" fill-opacity=".7"/>
  <rect x="218" y="130" width="10" height="50" rx="3" fill="#2B5CE6" fill-opacity=".55"/>
  <rect x="234" y="104" width="10" height="76" rx="3" fill="#2B5CE6" fill-opacity=".85"/>
  <rect x="250" y="112" width="10" height="68" rx="3" fill="#2B5CE6" fill-opacity=".7"/>
  <rect x="266" y="90" width="10" height="90" rx="3" fill="#FE5D1C"/>`,
};

/** Shared <defs>: ambient glows are positioned per canvas, the rest is fixed. */
const defs = ({ w, h, orange, sky, plum, fade }) => `
  <defs>
    <radialGradient id="glow-orange" cx="${orange.x}" cy="${orange.y}" r="${orange.r}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#FE5D1C" stop-opacity=".22"/>
      <stop offset=".45" stop-color="#FE5D1C" stop-opacity=".07"/>
      <stop offset="1" stop-color="#FE5D1C" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow-sky" cx="${sky.x}" cy="${sky.y}" r="${sky.r}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#2B5CE6" stop-opacity=".16"/>
      <stop offset="1" stop-color="#2B5CE6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow-plum" cx="${plum.x}" cy="${plum.y}" r="${plum.r}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#6E2F66" stop-opacity=".18"/>
      <stop offset="1" stop-color="#6E2F66" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="grid-fade" cx="${fade.x}" cy="${fade.y}" r="${fade.r}" gradientTransform="translate(0 ${(fade.y * 2) / 3}) scale(1 .333)" gradientUnits="userSpaceOnUse">
      <stop offset=".1" stop-color="#fff"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <mask id="grid-mask"><rect width="${w}" height="${h}" fill="url(#grid-fade)"/></mask>
    <linearGradient id="card-fill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F8F3EB" stop-opacity=".055"/>
      <stop offset="1" stop-color="#F8F3EB" stop-opacity=".02"/>
    </linearGradient>
    <linearGradient id="card-edge" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#F8F3EB" stop-opacity="0"/>
      <stop offset=".5" stop-color="#F8F3EB" stop-opacity=".35"/>
      <stop offset="1" stop-color="#F8F3EB" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="web-hero" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2B5CE6" stop-opacity=".75"/>
      <stop offset="1" stop-color="#2B5CE6" stop-opacity=".08"/>
    </linearGradient>
    <linearGradient id="web-shine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#F8F3EB" stop-opacity="0"/>
      <stop offset=".5" stop-color="#F8F3EB" stop-opacity=".12"/>
      <stop offset="1" stop-color="#F8F3EB" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="web-win"><rect x="24" y="26" width="272" height="188" rx="12"/></clipPath>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#FE5D1C"/>
      <stop offset="1" stop-color="#FF8D5C"/>
    </linearGradient>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .5 0"/>
    </filter>
  </defs>`;

/** Night surface + glows + perspective floor (mirrors .hero-grid). */
const field = ({ w, h, vp, floorTop, spacing }) => {
  let grid = '';
  const t = (floorTop - vp.y) / (h - vp.y);
  const n = Math.ceil(w / spacing) * 2;
  for (let i = -n; i <= n; i++) {
    const xb = vp.x + i * spacing;
    grid += `M${(vp.x + (xb - vp.x) * t).toFixed(1)} ${floorTop}L${xb} ${h}`;
  }
  for (let k = 0; k < 9; k++) grid += `M0 ${(floorTop + (h - floorTop) * Math.pow(k / 8, 1.8)).toFixed(1)}H${w}`;
  return `
  <rect width="${w}" height="${h}" fill="#08090B"/>
  <rect width="${w}" height="${h}" fill="url(#glow-sky)"/>
  <rect width="${w}" height="${h}" fill="url(#glow-plum)"/>
  <rect width="${w}" height="${h}" fill="url(#glow-orange)"/>
  <path d="${grid}" stroke="#F8F3EB" stroke-opacity=".07" mask="url(#grid-mask)"/>`;
};

/** Wireframe cubes from AmbientField. */
const wireCubes = (cubes) =>
  cubes
    .map(
      (c) => `
  <g transform="translate(${c.x} ${c.y}) rotate(${c.r}) scale(${c.s}) translate(-72 -79)" opacity="${c.o}">
    <path d="${CUBE}" stroke="#FE5D1C" stroke-opacity=".55" stroke-width="${(1.6 / c.s).toFixed(2)}"/>
    <path d="${TOP}" stroke="#F8F3EB" stroke-opacity=".3" stroke-width="${(1.4 / c.s).toFixed(2)}"/>
  </g>`
    )
    .join('');

/** Hero-carousel card: tone dot + label + meta over a frame drawn at `fs`. */
const card = ({ id, label, meta, tone, x, y, fs = 1.1 }) => {
  const w = Math.round(320 * fs + 48);
  const h = Math.round(240 * fs + 36);
  return `
  <g transform="translate(${x} ${y})">
    <rect width="${w}" height="${h}" rx="22" fill="url(#card-fill)" stroke="#F8F3EB" stroke-opacity=".1"/>
    <rect x="22" y=".5" width="${w - 44}" height="1" fill="url(#card-edge)"/>
    <circle cx="28" cy="32" r="4" fill="${TONES[tone]}"/>
    <text x="42" y="37" class="mono" font-size="15" font-weight="500" letter-spacing="2.4" fill="#F8F3EB" fill-opacity=".85">${label}</text>
    <text x="${w - 24}" y="37" text-anchor="end" class="mono" font-size="15" fill="#8A92A1">${meta}</text>
    <g transform="translate(24 40) scale(${fs}) translate(0 -14)">${FRAMES[id]}
    </g>
  </g>`;
};

const lockup = (x, y, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})">${mark(0.46)}
    <text x="90" y="46" class="sans" font-size="50" font-weight="700" letter-spacing="-1" fill="#F8F3EB">boxting</text>
    <text x="92" y="70" class="mono" font-size="15" font-weight="500" letter-spacing="7" fill="#FE5D1C">LABS</text>
  </g>`;

const doc = (w, h, comment, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">
  <!-- ${comment} Generated by tools/brand-images.mjs. -->
  <style>
    ${FONTS}
  </style>${body}
</svg>
`;

// ---- Compositions -----------------------------------------------------------

const COPY = {
  en: {
    lines: ['Software that bends', 'to your process.'],
    accent: 'Not the other way around.',
    strip: 'SOFTWARE · APPLIED AI · INFRASTRUCTURE',
    place: 'Lima, Peru',
    cards: [
      { id: 'agent', label: 'AI AGENT', meta: 'Always on, 24/7', tone: 'orange' },
      { id: 'server', label: 'SERVER', meta: 'AWS · GCP', tone: 'mint' },
    ],
  },
  es: {
    lines: ['El software se adapta', 'a tu proceso.'],
    accent: 'No al revés.',
    strip: 'SOFTWARE · IA APLICADA · INFRAESTRUCTURA',
    place: 'Lima, Perú',
    cards: [
      { id: 'agent', label: 'AGENTE IA', meta: 'Disponible 24/7', tone: 'orange' },
      { id: 'server', label: 'SERVIDOR', meta: 'AWS · GCP', tone: 'mint' },
    ],
  },
};

/** 1200×630 link preview (Open Graph / X summary_large_image). */
function ogImage(lang) {
  const w = 1200;
  const h = 630;
  const c = COPY[lang];
  const [agent, server] = c.cards;
  return doc(
    w,
    h,
    `Boxting Labs · link preview (${lang}) · 1200×630.`,
    `${defs({
      w,
      h,
      orange: { x: 960, y: 330, r: 720 },
      sky: { x: 180, y: -100, r: 620 },
      plum: { x: 560, y: 720, r: 420 },
      fade: { x: 600, y: 470, r: 720 },
    })}
  ${field({ w, h, vp: { x: 600, y: 400 }, floorTop: 470, spacing: 80 })}
  ${wireCubes([
    { x: 760, y: 560, s: 0.22, r: 22, o: 0.45 },
    { x: 700, y: 92, s: 0.16, r: -18, o: 0.4 },
  ])}

  <!-- what we build: staggered cards bleeding off the edge for depth -->
  ${card({ ...agent, x: 800, y: 58, fs: 1.02 })}
  ${card({ ...server, meta: '', x: 868, y: 356, fs: 1.02 })}

  ${lockup(64, 60, 0.82)}

  <text x="60" y="262" class="serif" font-size="72" letter-spacing="-1.2" fill="#F8F3EB">${c.lines[0]}</text>
  <text x="60" y="338" class="serif" font-size="72" letter-spacing="-1.2" fill="#F8F3EB">${c.lines[1]}</text>
  <text x="60" y="414" class="serif" font-size="72" font-style="italic" letter-spacing="-1.2" fill="url(#accent)">${c.accent}</text>

  <g transform="translate(66 528)">
    <circle cx="6" cy="-5" r="11" fill="#7CD6B4" fill-opacity=".15"/>
    <circle cx="6" cy="-5" r="4.5" fill="#7CD6B4"/>
    <text x="26" y="0" class="mono" font-size="15" letter-spacing="2.4" fill="#F8F3EB" fill-opacity=".72">${c.strip}</text>
    <text x="26" y="32" class="mono" font-size="17" font-weight="500" fill="#F8F3EB">boxtinglabs.com <tspan fill="#8A92A1" font-weight="400">· ${c.place}</tspan></text>
  </g>

  <rect width="${w}" height="${h}" filter="url(#grain)" opacity=".05"/>`
  );
}

/** 3200×800 Upwork agency profile banner. */
function upworkBanner() {
  const w = 3200;
  const h = 800;
  const cards = [
    { id: 'agent', label: 'AI AGENT', meta: 'Always on, 24/7', tone: 'orange', x: 1900, y: 76 },
    { id: 'web', label: 'WEB', meta: 'Apps and platforms', tone: 'sky', x: 2340, y: 76 },
    { id: 'server', label: 'SERVER', meta: 'AWS · GCP', tone: 'mint', x: 2120, y: 424 },
    { id: 'data', label: 'DATA', meta: 'Pipelines and reports', tone: 'sky', x: 2560, y: 424 },
  ];
  return doc(
    w,
    h,
    'Boxting Labs · Upwork agency banner · 3200×800.',
    `${defs({
      w,
      h,
      orange: { x: 2380, y: 400, r: 1100 },
      sky: { x: 620, y: -120, r: 900 },
      plum: { x: 1500, y: 900, r: 700 },
      fade: { x: 1600, y: 560, r: 1500 },
    })}
  ${field({ w, h, vp: { x: 1600, y: 470 }, floorTop: 560, spacing: 150 })}
  ${wireCubes([
    { x: 150, y: 110, s: 0.36, r: -12, o: 0.5 },
    { x: 120, y: 560, s: 0.62, r: 14, o: 0.55 },
    { x: 1745, y: 640, s: 0.28, r: 22, o: 0.4 },
    { x: 3010, y: 110, s: 0.46, r: 10, o: 0.5 },
    { x: 3040, y: 560, s: 0.3, r: -24, o: 0.4 },
    { x: 1790, y: 70, s: 0.2, r: 30, o: 0.35 },
  ])}
  ${lockup(360, 150)}

  <text x="352" y="382" class="serif" font-size="96" letter-spacing="-1.5" fill="#F8F3EB">Software that bends to your process.</text>
  <text x="352" y="484" class="serif" font-size="96" font-style="italic" letter-spacing="-1.5" fill="url(#accent)">Not the other way around.</text>

  <g transform="translate(360 580)">
    <circle cx="8" cy="-6" r="14" fill="#7CD6B4" fill-opacity=".15"/>
    <circle cx="8" cy="-6" r="6" fill="#7CD6B4"/>
    <text x="34" y="0" class="mono" font-size="19" letter-spacing="3.5" fill="#F8F3EB" fill-opacity=".72">SOFTWARE · APPLIED AI · INFRASTRUCTURE</text>
    <text x="34" y="40" class="mono" font-size="19" letter-spacing="1" fill="#8A92A1">boxtinglabs.com  ·  Lima, Peru → worldwide</text>
  </g>
  ${cards.map((c) => card(c)).join('')}

  <rect width="${w}" height="${h}" filter="url(#grain)" opacity=".05"/>`
  );
}

/** Square colour mark on transparent — schema.org Organization.logo. */
const logo = (size) =>
  doc(size, size, `Boxting Labs · logo · ${size}px.`, `
  <g transform="translate(${(size - 144 * (size / 200)) / 2} ${(size - 159 * (size / 200)) / 2})">${mark(size / 200)}
  </g>`);

/** app-icon variant (DESIGN.md §2.1): white cube, ink facets, orange field. iOS rounds it. */
const touchIcon = (size) =>
  doc(size, size, `Boxting Labs · apple-touch-icon · ${size}px.`, `
  <rect width="${size}" height="${size}" fill="#FE5D1C"/>
  <g transform="translate(${(size - 144 * (size / 260)) / 2} ${(size - 159 * (size / 260)) / 2})">${mark(size / 260, { body: '#FFFFFF', facet: '#0F1B2D' })}
  </g>`);

// ---- Output -----------------------------------------------------------------

const tmp = mkdtempSync(join(tmpdir(), 'brand-images-'));

async function render(svg, { svgOut, rasterOut, w, h, jpeg = false, transparent = false }) {
  if (svgOut) {
    mkdirSync(dirname(join(ROOT, svgOut)), { recursive: true });
    writeFileSync(join(ROOT, svgOut), svg);
  }
  const html = join(tmp, 'page.html');
  const png = join(tmp, 'shot.png');
  writeFileSync(
    html,
    `<!doctype html><html><head><style>html,body{margin:0;background:transparent}</style></head><body>${svg.replace('<svg ', '<svg style="display:block" ')}</body></html>`
  );
  execFileSync(
    CHROME,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      `--window-size=${w},${h}`,
      '--virtual-time-budget=5000',
      ...(transparent ? ['--default-background-color=00000000'] : []),
      `--screenshot=${png}`,
      `file://${html}`,
    ],
    { stdio: 'ignore' }
  );
  const out = join(ROOT, rasterOut);
  mkdirSync(dirname(out), { recursive: true });
  const img = sharp(png);
  await (jpeg ? img.flatten({ background: '#08090B' }).jpeg({ quality: 88, mozjpeg: true }) : img.png()).toFile(out);
  console.log(`✓ ${rasterOut}${svgOut ? `  (${svgOut})` : ''}`);
}

for (const lang of ['es', 'en']) {
  await render(ogImage(lang), {
    svgOut: `assets/og/og-image-${lang}.svg`,
    rasterOut: `public/og/og-image-${lang}.jpg`,
    w: 1200,
    h: 630,
    jpeg: true,
  });
}
await render(logo(512), { svgOut: 'assets/brand/logo.svg', rasterOut: 'public/logo.png', w: 512, h: 512, transparent: true });
await render(touchIcon(180), { rasterOut: 'public/apple-touch-icon.png', w: 180, h: 180 });
await render(upworkBanner(), {
  svgOut: 'assets/upwork/upwork-banner.svg',
  rasterOut: 'assets/upwork/upwork-banner.png',
  w: 3200,
  h: 800,
});

rmSync(tmp, { recursive: true, force: true });
