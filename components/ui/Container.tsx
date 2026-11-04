import type { ReactNode } from 'react';

/**
 * Page-width wrapper used by every section. `w-full` plus a max width means it can
 * shrink below the cap but never grow past the viewport, so it cannot cause sideways
 * scrolling. (A fixed `w-[1024px]` or `min-w-[...]` here is what would overflow a phone.)
 */
export function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-310 px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
