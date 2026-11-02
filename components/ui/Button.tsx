import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'glass';
type Size = 'md' | 'sm';

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

const base =
  'inline-flex items-center justify-center gap-2.5 rounded-full border font-medium transition-colors';

const variants: Record<Variant, string> = {
  primary:
    'border-transparent bg-brand text-navy shadow-[0_12px_30px_-10px_rgba(255,106,0,0.6),inset_0_1px_0_rgba(255,255,255,0.5)] hover:bg-[#ff7d24]',
  glass:
    'border-gborder bg-glass-2 text-fg backdrop-blur-md hover:border-brand',
};

const sizes: Record<Size, string> = {
  md: 'min-h-12 px-7 text-base',
  sm: 'min-h-10 px-5 text-sm',
};

const isExternal = (href: string) => /^(https?:|mailto:|tel:|#)/.test(href);

/** A link that looks like a button. Internal paths use next/link; everything else is a plain anchor. */
export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
}: ButtonLinkProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (isExternal(href)) {
    const opensNewTab = href.startsWith('http');
    return (
      <a
        href={href}
        className={cls}
        {...(opensNewTab
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
