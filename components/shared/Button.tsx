import type {ButtonHTMLAttributes, CSSProperties, ReactNode} from 'react';

type Variant = 'primary' | 'outline' | 'ghost' | 'soft';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary: 'text-white font-semibold shadow-[0_8px_32px_rgba(0,255,255,0.25)] hover:opacity-90',
  outline: 'border border-text/15 text-text hover:border-text/25 hover:bg-surface',
  ghost: 'text-text hover:bg-surface',
  soft: 'border border-accent/30 bg-accent/10 text-text hover:border-[#00D4FF] hover:bg-[#00D4FF]/35'
};

const variantStyles: Partial<Record<Variant, CSSProperties>> = {
  primary: {
    borderRadius: '900px',
    background: 'linear-gradient(100deg, #00D4FF -8.86%, #2EE0B4 104.42%)'
  }
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base'
};

export function Button({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  className = '',
  style,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}) {
  return (
    <button
      className={[base, variants[variant], sizes[size], className]
        .filter(Boolean)
        .join(' ')}
      style={{...variantStyles[variant], ...style}}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}

