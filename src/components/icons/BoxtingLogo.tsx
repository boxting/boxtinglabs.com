import * as React from 'react';
import { cn } from '@/lib/utils';

const SVG_PATHS = {
  main: 'M67.0003 0.0578601C72.5113 -0.23714 77.8443 0.59586 83.0003 2.55786C98.0003 10.8909 113 19.2249 128 27.5579C135.709 31.5999 140.876 37.7669 143.5 46.0579C144.167 68.0579 144.167 90.0579 143.5 112.058C141.262 119.63 136.762 125.463 130 129.558C113.129 139.16 96.1293 148.493 79.0003 157.558C72.4463 158.639 66.1123 157.972 60.0003 155.558C43.5043 146.478 27.1712 137.144 11.0002 127.558C5.40525 122.967 1.90525 117.134 0.50025 110.058C-0.16675 89.0579 -0.16675 68.0579 0.50025 47.0579C3.80125 38.0889 9.63425 31.2549 18.0002 26.5579C34.1392 17.1589 50.4733 8.32486 67.0003 0.0578601Z',
  inner1: 'M34 0.0620786C38.014 -0.103921 42.014 0.0630785 46 0.562079C57.662 6.72408 68.996 13.3911 80 20.5621C68.082 28.0211 55.749 34.6871 43 40.5621C40.667 41.2291 38.333 41.2291 36 40.5621C23.837 33.9821 11.837 27.1481 0 20.0621C11.396 13.3691 22.73 6.70208 34 0.0620786Z',
  inner2: 'M0.157703 0C10.4637 5.821 20.7967 11.655 31.1577 17.5C34.3247 19.333 36.8247 21.833 38.6577 25C40.2687 38.264 40.6017 51.597 39.6577 65C29.3997 58.786 18.8997 52.953 8.1577 47.5C5.4387 45.903 3.2717 43.737 1.6577 41C0.211703 27.407 -0.288297 13.74 0.157703 0Z',
};

export interface BoxtingLogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'wordmark';
  colorScheme?: 'brand' | 'light' | 'dark';
}

export function BoxtingLogo({
  className,
  variant = 'full',
  colorScheme = 'brand',
}: BoxtingLogoProps) {
  const colors = {
    brand: {
      icon: '#FE5D1C',
      iconInner: '#F8F2EB',
      text: 'currentColor',
    },
    light: {
      icon: '#FE5D1C',
      iconInner: '#F8F2EB',
      text: '#1A202C',
    },
    dark: {
      icon: '#FE5D1C',
      iconInner: '#F8F2EB',
      text: '#F8FAFC',
    },
  };

  const c = colors[colorScheme];

  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 144 159"
        fill="none"
        className={cn('h-10 w-10', className)}
        aria-label="Boxting Labs"
      >
        <path d={SVG_PATHS.main} fill={c.icon} fillRule="evenodd" clipRule="evenodd" />
        <g transform="translate(24, 26)">
          <path d={SVG_PATHS.inner1} fill={c.iconInner} fillRule="evenodd" clipRule="evenodd" />
        </g>
        <g transform="translate(60, 66)">
          <path d={SVG_PATHS.inner2} fill={c.iconInner} fillRule="evenodd" clipRule="evenodd" />
        </g>
      </svg>
    );
  }

  if (variant === 'wordmark') {
    return (
      <span
        className={cn(
          'font-bold text-2xl tracking-tight',
          colorScheme === 'dark' && 'text-white',
          colorScheme === 'light' && 'text-brand-navy-900',
          className
        )}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        boxting<span className="text-brand-orange-500">labs</span>
      </span>
    );
  }

  // Full logo
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <svg
        viewBox="0 0 144 159"
        fill="none"
        className="h-10 w-auto"
        aria-hidden="true"
      >
        <path d={SVG_PATHS.main} fill={c.icon} fillRule="evenodd" clipRule="evenodd" />
        <g transform="translate(24, 26)">
          <path d={SVG_PATHS.inner1} fill={c.iconInner} fillRule="evenodd" clipRule="evenodd" />
        </g>
        <g transform="translate(60, 66)">
          <path d={SVG_PATHS.inner2} fill={c.iconInner} fillRule="evenodd" clipRule="evenodd" />
        </g>
      </svg>
      <span
        className={cn(
          'font-bold text-xl tracking-tight',
          colorScheme === 'dark' && 'text-white',
          colorScheme === 'light' && 'text-brand-navy-900'
        )}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        boxting<span className="text-brand-orange-500">labs</span>
      </span>
    </div>
  );
}
