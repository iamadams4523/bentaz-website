'use client';

import { useId, useMemo, useState } from 'react';
import {
  ArticleCard,
  type CardArticle,
} from '@/components/insights/ArticleCard';

type Cat = { slug: string; name: string };

/** Search box and category filter for the insights list. Works on the articles already sent to the page. */
export function ArticleBrowser({
  articles,
  categories,
}: {
  articles: CardArticle[];
  categories: Cat[];
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const inputId = useId();

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (category !== 'all' && a.category !== category) return false;
      if (!q) return true;
      const name = categories.find((c) => c.slug === a.category)?.name ?? '';
      return `${a.title} ${a.summary} ${name}`.toLowerCase().includes(q);
    });
  }, [articles, categories, query, category]);

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
      active
        ? 'border-brand bg-brand text-navy'
        : 'border-gborder bg-glass text-fg hover:border-brand'
    }`;

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor={inputId} className="sr-only">
            Search articles
          </label>
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles"
            className="w-full max-w-120 rounded-full border border-gborder bg-field px-5 py-3 text-fg placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          />
        </div>
        <div
          role="group"
          aria-label="Filter by category"
          className="flex flex-wrap gap-2.5"
        >
          <button
            type="button"
            className={chip(category === 'all')}
            aria-pressed={category === 'all'}
            onClick={() => setCategory('all')}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              className={chip(category === c.slug)}
              aria-pressed={category === c.slug}
              onClick={() => setCategory(c.slug)}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted" role="status" aria-live="polite">
        {shown.length === 1 ? '1 article' : `${shown.length} articles`}
      </p>

      {shown.length > 0 ? (
        <ul className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((a, i) => (
            <li key={a.slug} className="min-w-0">
              <ArticleCard article={a} index={i} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="glass mt-5 rounded-[28px] p-8">
          <p className="font-medium">No articles match that search.</p>
          <p className="mt-1 text-muted">
            Try a shorter word, or choose a different category.
          </p>
        </div>
      )}
    </div>
  );
}
