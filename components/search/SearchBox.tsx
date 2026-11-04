'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useId, useMemo, useState } from 'react';
import type { SearchItem } from '@/lib/search-index';
import Link from 'next/link';

const norm = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');

/** Scores an item: title matches count most, then description, then keywords. Every word must match somewhere. */
function score(item: SearchItem, words: string[]) {
  const title = norm(item.title);
  const desc = norm(item.description);
  const keys = norm(item.keywords);
  let total = 0;
  for (const w of words) {
    let s = 0;
    if (title.includes(w)) s += 10 + (title.startsWith(w) ? 3 : 0);
    if (desc.includes(w)) s += 4;
    if (keys.includes(w)) s += 2;
    if (s === 0) return 0;
    total += s;
  }
  return total;
}

export function SearchBox({ items }: { items: SearchItem[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get('q') ?? '';
  const [query, setQuery] = useState(initial);
  const id = useId();

  const results = useMemo(() => {
    // Long words are cut to their first five letters, so "automate" also finds "automation".
    const words = norm(query)
      .split(/\s+/)
      .filter((w) => w.length > 1)
      .map((w) => (w.length > 6 ? w.slice(0, 5) : w));
    if (words.length === 0) return [];
    return items
      .map((item) => ({ item, s: score(item, words) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((r) => r.item);
  }, [items, query]);

  const trimmed = query.trim();

  function onChange(v: string) {
    setQuery(v);
    const next = v.trim()
      ? `/search?q=${encodeURIComponent(v.trim())}`
      : '/search';
    router.replace(next, { scroll: false });
  }

  return (
    <div>
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="max-w-160"
      >
        <label htmlFor={id} className="sr-only">
          Search the site
        </label>
        <input
          id={id}
          type="search"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search services, articles and more"
          autoFocus
          className="w-full rounded-full border border-gborder bg-field px-6 py-4 text-lg text-fg placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        />
      </form>

      <p className="mt-6 text-sm text-muted" role="status" aria-live="polite">
        {trimmed.length < 2
          ? 'Type at least two letters to search.'
          : results.length === 0
            ? `No results for "${trimmed}".`
            : results.length === 1
              ? `1 result for "${trimmed}"`
              : `${results.length} results for "${trimmed}"`}
      </p>

      {results.length > 0 ? (
        <ul className="mt-5 grid gap-4">
          {results.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                className="glass flex flex-col gap-1.5 rounded-3xl p-6 text-fg transition-colors hover:border-brand"
              >
                <span className="text-[13px] font-medium text-link">
                  {r.kind}
                </span>
                <span className="text-xl font-semibold leading-snug">
                  {r.title}
                </span>
                <span className="text-[15px] leading-relaxed text-muted">
                  {r.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : trimmed.length >= 2 ? (
        <div className="glass mt-5 rounded-3xl p-7">
          <p className="font-medium">Nothing matched that search.</p>
          <p className="mt-1 text-muted">
            Try a different word, browse our{' '}
            <Link
              href="/services"
              className="font-medium text-link hover:underline"
            >
              services
            </Link>
            , or{' '}
            <Link
              href="/contact"
              className="font-medium text-link hover:underline"
            >
              ask us directly
            </Link>
            .
          </p>
        </div>
      ) : null}
    </div>
  );
}
