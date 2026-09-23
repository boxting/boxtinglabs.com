import posthog, { type Properties } from 'posthog-js';

const CONSENT_KEY = 'bx_analytics_consent';
const KEY = import.meta.env.PUBLIC_POSTHOG_KEY as string | undefined;
const HOST = (import.meta.env.PUBLIC_POSTHOG_HOST as string | undefined) || 'https://us.i.posthog.com';
const IS_PROD = import.meta.env.PROD;

export type ConsentState = 'granted' | 'denied' | 'unset';

let initialized = false;

function readConsent(): ConsentState {
  if (typeof localStorage === 'undefined') return 'unset';
  const v = localStorage.getItem(CONSENT_KEY);
  return v === 'granted' || v === 'denied' ? v : 'unset';
}

function writeConsent(state: Exclude<ConsentState, 'unset'>) {
  try {
    localStorage.setItem(CONSENT_KEY, state);
  } catch {
    /* localStorage blocked — silent */
  }
}

function deriveSuperProps(): Properties {
  const nav = typeof navigator !== 'undefined' ? navigator : undefined;
  const conn = nav && (nav as unknown as { connection?: { effectiveType?: string; saveData?: boolean } }).connection;
  const win = typeof window !== 'undefined' ? window : undefined;
  return {
    environment: IS_PROD ? 'production' : 'development',
    locale: document.documentElement.lang || nav?.language || 'unknown',
    viewport_width: win?.innerWidth ?? null,
    viewport_height: win?.innerHeight ?? null,
    device_pixel_ratio: win?.devicePixelRatio ?? null,
    connection_type: conn?.effectiveType ?? null,
    save_data: conn?.saveData ?? null,
    prefers_reduced_motion:
      win?.matchMedia('(prefers-reduced-motion: reduce)').matches ?? false,
    prefers_color_scheme: win?.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  };
}

// PostHog captures utm_* and referrer on its own; this collapses them into a
// single breakdown-friendly value: utm_source → referrer host → "direct".
function deriveTrafficSource(): string {
  const utm = new URLSearchParams(window.location.search).get('utm_source');
  if (utm) return utm;
  if (document.referrer) {
    try {
      const host = new URL(document.referrer).host;
      if (host !== window.location.host) return host;
    } catch {
      /* malformed referrer */
    }
  }
  return 'direct';
}

export function initAnalytics(): boolean {
  if (initialized) return true;
  if (!IS_PROD) return false;
  if (!KEY) {
    console.warn('[analytics] PUBLIC_POSTHOG_KEY not set; PostHog disabled.');
    return false;
  }

  posthog.init(KEY, {
    api_host: HOST,
    defaults: '2026-05-30',
    person_profiles: 'identified_only',
    persistence: 'localStorage',
    capture_pageview: 'history_change',
    capture_pageleave: true,
    disable_session_recording: true,
    // Unused features; skipping them keeps pre-consent network traffic minimal.
    disable_surveys: true,
    advanced_disable_flags: true,
    opt_out_capturing_by_default: true,
  });

  posthog.register(deriveSuperProps());
  posthog.register_once({ traffic_source: deriveTrafficSource() });

  if (readConsent() === 'granted') {
    posthog.opt_in_capturing({ captureEventName: null });
  } else {
    posthog.opt_out_capturing();
  }

  initialized = true;
  return true;
}

export function hasConsent(): boolean {
  return readConsent() === 'granted';
}

export function getConsent(): ConsentState {
  return readConsent();
}

export function grantConsent() {
  writeConsent('granted');
  if (initialized) {
    posthog.register(deriveSuperProps());
    // Also sends the initial $pageview that was held back while opted out.
    posthog.opt_in_capturing({ captureEventName: null });
  }
}

export function denyConsent() {
  writeConsent('denied');
  if (initialized) {
    posthog.opt_out_capturing();
  }
}

export function track(event: string, props?: Properties) {
  if (!initialized || !hasConsent()) return;
  posthog.capture(event, props);
}

export function setSuperProps(props: Properties) {
  if (!initialized) return;
  posthog.register(props);
}
