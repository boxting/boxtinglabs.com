import mixpanel, { type Dict } from 'mixpanel-browser';

const CONSENT_KEY = 'bx_analytics_consent';
const TOKEN = import.meta.env.PUBLIC_MIXPANEL_TOKEN as string | undefined;
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

function deriveSuperProps(): Dict {
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

function parseUtm(): Dict {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const out: Dict = {};
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
    const v = params.get(key);
    if (v) out[key] = v;
  }
  const ref = document.referrer || null;
  if (ref) {
    out.referrer = ref;
    try {
      out.referrer_host = new URL(ref).host;
    } catch {
      /* malformed referrer */
    }
  }
  return out;
}

export function initAnalytics(): boolean {
  if (initialized) return true;
  if (!IS_PROD) return false;
  if (!TOKEN) {
    console.warn('[analytics] PUBLIC_MIXPANEL_TOKEN not set; Mixpanel disabled.');
    return false;
  }

  mixpanel.init(TOKEN, {
    debug: false,
    track_pageview: false,
    persistence: 'localStorage',
    ignore_dnt: false,
    opt_out_tracking_by_default: true,
    api_host: 'https://api.mixpanel.com',
  });

  mixpanel.register(deriveSuperProps());
  mixpanel.register_once(parseUtm());

  const consent = readConsent();
  if (consent === 'granted') {
    mixpanel.opt_in_tracking();
  } else {
    mixpanel.opt_out_tracking();
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
    mixpanel.opt_in_tracking();
    mixpanel.register(deriveSuperProps());
  }
}

export function denyConsent() {
  writeConsent('denied');
  if (initialized) {
    mixpanel.opt_out_tracking();
  }
}

export function track(event: string, props?: Dict) {
  if (!initialized || !hasConsent()) return;
  mixpanel.track(event, props);
}

export function setSuperProps(props: Dict) {
  if (!initialized) return;
  mixpanel.register(props);
}
