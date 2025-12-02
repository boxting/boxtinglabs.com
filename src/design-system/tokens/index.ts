/**
 * Design Tokens
 *
 * Single source of truth for all design values.
 * These tokens are used across the application for consistency.
 */

export const colors = {
  brand: {
    orange: {
      50: '#FFF7ED',
      100: '#FFEDD5',
      200: '#FED7AA',
      300: '#FDBA74',
      400: '#FB923C',
      500: '#F97316', // Primary
      600: '#EA580C',
      700: '#C2410C',
      800: '#9A3412',
      900: '#7C2D12',
    },
    navy: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A', // Primary dark
      950: '#020617',
    },
  },
  semantic: {
    light: {
      background: '#F8FAFC',
      foreground: '#1A202C',
      muted: '#64748B',
      border: '#E2E8F0',
      card: '#FFFFFF',
    },
    dark: {
      background: '#0F172A',
      foreground: '#F8FAFC',
      muted: '#94A3B8',
      border: '#334155',
      card: '#1E293B',
    },
  },
} as const;

export const typography = {
  fontFamily: {
    sans: "'DM Sans', system-ui, sans-serif",
  },
  fontSize: {
    'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
    'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
    'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
    'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
    'display-sm': ['1.875rem', { lineHeight: '1.3' }],
    'heading-lg': ['1.5rem', { lineHeight: '1.4' }],
    'heading-md': ['1.25rem', { lineHeight: '1.4' }],
    'heading-sm': ['1.125rem', { lineHeight: '1.5' }],
    'body-lg': ['1.125rem', { lineHeight: '1.6' }],
    'body-md': ['1rem', { lineHeight: '1.6' }],
    'body-sm': ['0.875rem', { lineHeight: '1.5' }],
    caption: ['0.75rem', { lineHeight: '1.5' }],
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export const spacing = {
  section: {
    sm: '3rem',
    md: '6rem',
    lg: '8rem',
  },
  container: {
    padding: '1.5rem',
    maxWidth: '80rem',
  },
} as const;

export const animation = {
  duration: {
    fast: '150ms',
    base: '300ms',
    slow: '500ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const shadows = {
  soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
  softLg: '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 2px 10px -2px rgba(0, 0, 0, 0.04)',
  glowOrange: '0 0 40px -10px rgba(249, 115, 22, 0.3)',
  glowOrangeLg: '0 0 60px -10px rgba(249, 115, 22, 0.4)',
} as const;

export const radii = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  full: '9999px',
} as const;
