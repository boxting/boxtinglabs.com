/**
 * Tailwind config — Boxting Labs · DESIGN.md v1.0
 * Tokens are the source of truth. If a value isn't here, it isn't brand.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // §3.1 primary
        orange: {
          DEFAULT: '#FE5D1C',
          100: '#FFDCC8',
          300: '#FF8D5C',
          500: '#FE5D1C',
          700: '#D63F00',
        },
        ink: '#0F1B2D',
        cream: '#F8F3EB',
        // §3.3 neutrals
        paper: '#FFFDF9',
        sand: '#ECE5D5',
        steel: '#4A5468',
        fog: '#8A92A1',
        // §3.2 accents
        sky: '#2B5CE6',
        mint: '#4FA98A',
        plum: '#6E2F66',
        // §3.5 semantic
        danger: '#C03030',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      // §4.3 type scale
      fontSize: {
        display: ['80px', { lineHeight: '80px', letterSpacing: '-0.045em', fontWeight: '700' }],
        h1: ['48px', { lineHeight: '52px', letterSpacing: '-0.035em', fontWeight: '700' }],
        h2: ['32px', { lineHeight: '40px', letterSpacing: '-0.025em', fontWeight: '600' }],
        h3: ['22px', { lineHeight: '30px', letterSpacing: '-0.020em', fontWeight: '600' }],
        body: ['17px', { lineHeight: '26px', letterSpacing: '-0.005em' }],
        small: ['14px', { lineHeight: '20px' }],
        caption: ['13px', { lineHeight: '18px', letterSpacing: '0.06em' }],
        code: ['14px', { lineHeight: '22px' }],
      },
      // §5.1 spacing (8 px base)
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '24px',
        6: '32px',
        7: '48px',
        8: '64px',
        9: '96px',
        10: '128px',
      },
      // §5.2 radius
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '18px',
        xl: '28px',
        full: '9999px',
      },
      // §5.3 shadow
      boxShadow: {
        1: '0 1px 2px rgba(15,27,45,0.06)',
        2: '0 4px 12px rgba(15,27,45,0.08)',
        3: '0 20px 40px rgba(15,27,45,0.12), 0 2px 6px rgba(15,27,45,0.06)',
        orange: '0 8px 24px rgba(254,93,28,0.30)',
      },
      // §5.4 motion
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.4, 0, 0.2, 1)',
        entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        quick: '120ms',
        base: '220ms',
        entrance: '360ms',
      },
      maxWidth: {
        prose: '64ch',
        page: '1200px',
      },
    },
  },
  plugins: [],
};
