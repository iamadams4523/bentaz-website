'use client';

import { useState, useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const getHref = () => window.location.href;
const getServerHref = () => '';

/** Share links for an article. Uses the real page address in the browser. `url` overrides it when set. */
export function ShareButtons({
  title,
  url,
}: {
  title: string;
  url?: string | null;
}) {
  const browserUrl = useSyncExternalStore(subscribe, getHref, getServerHref);
  const href = url || browserUrl;
  const [copied, setCopied] = useState(false);

  const u = encodeURIComponent(href);
  const t = encodeURIComponent(title);
  const links = [
    { name: 'WhatsApp', href: `https://wa.me/?text=${t}%20${u}` },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    },
    { name: 'X', href: `https://twitter.com/intent/tweet?text=${t}&url=${u}` },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    },
  ];

  const base =
    'inline-flex min-h-10 items-center rounded-full border border-gborder bg-glass px-4 text-sm font-medium text-fg transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand';

  async function copy() {
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt('Copy this link', href);
    }
  }

  return (
    <div
      className="flex flex-wrap items-center gap-2.5"
      aria-label="Share this article"
      role="group"
    >
      <span className="text-sm text-muted">Share</span>
      {href
        ? links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className={base}
            >
              {l.name}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))
        : null}
      <button type="button" onClick={copy} className={base}>
        {copied ? 'Link copied' : 'Copy link'}
      </button>
    </div>
  );
}
