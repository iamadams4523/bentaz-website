'use client';

import { useSyncExternalStore } from 'react';
import { Icon } from '@/components/ui/Icon';

type Theme = 'dark' | 'light';
const STORAGE_KEY = 'bz-theme';

/** The <html data-theme> attribute is the source of truth (set before paint by the inline script in layout.tsx). */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
const getServerSnapshot = (): Theme => 'dark';

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const next: Theme = theme === 'dark' ? 'light' : 'dark';

  function toggle() {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (private mode); the theme still changes for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      className="grid size-11 flex-none cursor-pointer place-items-center rounded-full border border-gborder bg-glass text-fg transition-colors hover:border-brand"
    >
      <Icon
        name={theme === 'dark' ? 'sun' : 'moon'}
        size={20}
        strokeWidth={2}
      />
    </button>
  );
}
