'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { navItems, whatsappUrl } from '@/lib/site';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

const isActive = (pathname: string, href: string) =>
  href === '/'
    ? pathname === '/'
    : pathname === href || pathname.startsWith(`${href}/`);

/**
 * Floating glass pill. Desktop (lg and up): inline links + CTA.
 * Below lg: logo, theme toggle and a burger that opens a glass sheet.
 */
export function NavBar() {
  const pathname = usePathname();
  const menuId = useId();
  const [open, setOpen] = useState(false);

  // Close the sheet whenever the route changes (including back/forward).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-3 z-50 mt-3 px-3 sm:px-4">
      <div className="relative mx-auto max-w-310">
        <div className="glass-strong flex items-center gap-5 rounded-full py-2.5 pl-5 pr-2.5 sm:pl-6">
          <Logo onClick={() => setOpen(false)} />

          <nav
            aria-label="Main"
            className="mx-auto hidden items-center gap-0.5 lg:flex"
          >
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-full px-3.5 py-2.5 text-[15px] font-medium transition-colors ${
                    active
                      ? 'bg-glass-2 text-fg shadow-[inset_0_0_0_1px_var(--gb)]'
                      : 'text-muted hover:text-fg'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2.5 lg:ml-0">
            <ThemeToggle />
            <div className="hidden lg:block">
              <ButtonLink href="/contact">Discuss a Project</ButtonLink>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? 'Close the menu' : 'Open the menu'}
              className="grid size-11 flex-none cursor-pointer place-items-center rounded-full border border-gborder bg-glass text-fg lg:hidden"
            >
              <Icon name={open ? 'close' : 'menu'} size={20} strokeWidth={2} />
            </button>
          </div>
        </div>

        {open ? (
          <div
            id={menuId}
            className="absolute inset-x-0 top-[calc(100%+10px)] flex flex-col gap-1 rounded-[28px] border border-gborder bg-bg/90 p-3.5 shadow-(--sh) backdrop-blur-2xl lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {navItems.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`rounded-2xl px-4 py-3.5 font-medium text-fg ${active ? 'bg-glass' : ''}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-2 flex flex-col gap-2.5">
              <ButtonLink href="/contact">Discuss a Project</ButtonLink>
              <ButtonLink href={whatsappUrl()} variant="glass">
                <Icon name="whatsapp" size={18} strokeWidth={2} />
                Chat on WhatsApp
              </ButtonLink>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
