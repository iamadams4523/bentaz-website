import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/SectionHead';

/** Placeholder articles from the approved design; replaced by real CMS/MDX content in the backend phase. */
const posts = [
  {
    category: 'Practical AI and automation',
    title: 'What to automate first in a small business',
    text: 'Start with the tasks that repeat daily and carry little risk.',
    date: '19 Oct 2026',
    art: 'bg-[radial-gradient(circle_at_20%_30%,rgba(255,106,0,0.85),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(80,100,255,0.6),transparent_55%)]',
  },
  {
    category: 'Cybersecurity and digital safety',
    title: 'A simple security checklist for growing companies',
    text: 'Six habits that close the most common doors.',
    date: '12 Oct 2026',
    art: 'bg-[radial-gradient(circle_at_80%_20%,rgba(255,150,70,0.8),transparent_50%),radial-gradient(circle_at_15%_85%,rgba(120,80,255,0.55),transparent_55%)]',
  },
  {
    category: 'Websites and lead generation',
    title: 'Why your website is not producing enquiries',
    text: 'Common reasons visitors leave without getting in touch.',
    date: '5 Oct 2026',
    art: 'bg-[radial-gradient(circle_at_50%_10%,rgba(255,106,0,0.7),transparent_50%),radial-gradient(circle_at_10%_90%,rgba(60,140,255,0.55),transparent_55%)]',
  },
];

export function InsightsPreview() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="insights-title">
      <div className="mx-auto w-full max-w-310 px-5 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <Eyebrow>Recent insights</Eyebrow>
            <h2
              id="insights-title"
              className="mt-4 text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl lg:text-[46px]"
            >
              Useful ideas, written plainly
            </h2>
          </div>
          <ButtonLink href="/insights" variant="glass">
            All insights
          </ButtonLink>
        </div>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.title}>
              <Link
                href="/insights"
                className="glass flex h-full flex-col gap-3.5 rounded-[28px] p-4.5 text-fg transition-colors hover:border-brand"
              >
                <div
                  className={`h-47.5 rounded-[20px] border border-gborder bg-surface ${p.art}`}
                  aria-hidden="true"
                />
                <span className="self-start rounded-full bg-brand/15 px-3 py-1 text-[13px] font-medium text-link">
                  {p.category}
                </span>
                <h3 className="text-xl font-semibold leading-snug tracking-tight">
                  {p.title}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-muted">
                  {p.text}
                </p>
                <span className="mt-auto text-[13px] text-muted">
                  Bentaz team · {p.date}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
