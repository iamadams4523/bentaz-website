import Link from 'next/link';
import { formatDate, getCategory } from '@/lib/articles';

/** Soft gradient covers (no stock imagery). The index picks one so neighbouring cards differ. */
const covers = [
  'bg-[radial-gradient(circle_at_20%_30%,rgba(255,106,0,0.85),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(80,100,255,0.6),transparent_55%)]',
  'bg-[radial-gradient(circle_at_80%_20%,rgba(255,150,70,0.8),transparent_50%),radial-gradient(circle_at_15%_85%,rgba(120,80,255,0.55),transparent_55%)]',
  'bg-[radial-gradient(circle_at_50%_10%,rgba(255,106,0,0.7),transparent_50%),radial-gradient(circle_at_10%_90%,rgba(60,140,255,0.55),transparent_55%)]',
];

export type CardArticle = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  publishedOn: string;
};

export function ArticleCard({
  article,
  index = 0,
}: {
  article: CardArticle;
  index?: number;
}) {
  const cat = getCategory(article.category);
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="glass flex h-full flex-col gap-3.5 rounded-[28px] p-4.5 text-fg transition-colors hover:border-brand"
    >
      <div
        className={`h-42.5 rounded-[20px] border border-gborder bg-surface ${covers[index % covers.length]}`}
        aria-hidden="true"
      />
      <span className="self-start rounded-full bg-brand/15 px-3 py-1 text-[13px] font-medium text-link">
        {cat?.name ?? article.category}
      </span>
      <h3 className="text-xl font-semibold leading-snug tracking-tight">
        {article.title}
      </h3>
      <p className="text-[14.5px] leading-relaxed text-muted">
        {article.summary}
      </p>
      <span className="mt-auto text-[13px] text-muted">
        {article.author} · {formatDate(article.publishedOn)}
      </span>
    </Link>
  );
}
