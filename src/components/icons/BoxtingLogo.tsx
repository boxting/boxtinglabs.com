import BoxtingLogoSvg from '@assets/images/boxting.svg';
import { cn } from '@/lib/utils';

const BoxtingLogoImage = ({ className }: { className?: string }) => (
  <img
    src={BoxtingLogoSvg.src}
    alt="Boxting Labs"
    className={className}
    aria-hidden="true"
  />
);

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
  if (variant === 'icon') {
    return (
      <BoxtingLogoImage className={cn('h-10 w-10', className)} />
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
        boxting <span className="text-brand-orange-500">labs</span>
      </span>
    );
  }

  // Full logo
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <BoxtingLogoImage className="h-10 w-auto" />
      <span
        className={cn(
          'font-bold text-xl tracking-tight',
          colorScheme === 'dark' && 'text-white',
          colorScheme === 'light' && 'text-brand-navy-900'
        )}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        boxting <span className="text-brand-orange-500">labs</span>
      </span>
    </div>
  );
}
