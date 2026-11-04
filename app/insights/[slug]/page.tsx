import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { CtaBand } from '@/components/home/CtaBand';
import { ArticleCard } from '@/components/insights/ArticleCard';
import { ShareButtons } from '@/components/insights/ShareButtons';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { JsonLd } from '@/components/ui/JsonLd';
import {
  formatDate,
  getArticle,
  getCategory,
  getPublishedArticles,
  readingMinutes,
  relatedArticles,
  type Block,
} from '@/lib/articles';
import { getService } from '@/lib/services';
import { absoluteUrl, site } from '@/lib/site';

// Cache Components needs at least one static param; with no published articles a placeholder resolves to 404.
export function generateStaticParams() {
  const list = getPublishedArticles();
  return list.length > 0
    ? list.map((a) => ({ slug: a.slug }))
    : [{ slug: 'no-published-articles' }];
}

export async function generateMetadata({
  params,
}: PageProps<'/insights/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { robots: { index: false } };
  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.summary,
      publishedTime: article.publishedOn,
      ...(article.updatedOn ? { modifiedTime: article.updatedOn } : {}),
    },
  };
}

export default function ArticlePage(props: PageProps<'/insights/[slug]'>) {
  return (
    <Suspense fallback={<Skeleton />}>
      <ArticleContent params={props.params} />
    </Suspense>
  );
}

function Skeleton() {
  return (
    <section className="pb-6 pt-10 sm:pt-16" aria-hidden="true">
      <Container>
        <div className="h-4 w-48 rounded-full bg-glass" />
        <div className="mt-6 h-14 max-w-160 rounded-2xl bg-glass" />
        <div className="mt-5 h-20 max-w-140 rounded-2xl bg-glass" />
      </Container>
    </section>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function Body({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-5 text-[17px] leading-[1.75]">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h2':
            return (
              <h2
                key={i}
                id={slugify(b.text)}
                className="mt-6 scroll-mt-28 text-[26px] font-semibold leading-tight tracking-[-0.02em] sm:text-[30px]"
              >
                {b.text}
              </h2>
            );
          case 'p':
            return (
              <p key={i} className="text-muted">
                {b.text}
              </p>
            );
          case 'ul':
            return (
              <ul
                key={i}
                className="flex list-disc flex-col gap-2 pl-6 text-muted marker:text-link"
              >
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol
                key={i}
                className="flex list-decimal flex-col gap-2 pl-6 text-muted marker:font-semibold marker:text-link"
              >
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ol>
            );
          case 'note':
            return (
              <p
                key={i}
                className="glass rounded-[20px] border-l-4 border-l-brand p-5 font-medium"
              >
                {b.text}
              </p>
            );
        }
      })}
    </div>
  );
}

async function ArticleContent({
  params,
}: {
  params: PageProps<'/insights/[slug]'>['params'];
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const cat = getCategory(article.category);
  const service = getService(article.service);
  const related = relatedArticles(article);
  const headings = article.body.filter(
    (b): b is Extract<Block, { type: 'h2' }> => b.type === 'h2',
  );
  const minutes = readingMinutes(article);

  const pageUrl = absoluteUrl(`/insights/${article.slug}`);
  const home = absoluteUrl('/');
  const list = absoluteUrl('/insights');
  const postLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedOn,
    dateModified: article.updatedOn ?? article.publishedOn,
    author: {
      '@type': 'Organization',
      name: article.author === 'Bentaz Tech team' ? site.name : article.author,
    },
    publisher: { '@type': 'Organization', name: site.name },
    ...(pageUrl ? { mainEntityOfPage: pageUrl, url: pageUrl } : {}),
  };
  const breadcrumbLd =
    home && list && pageUrl
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: home },
            { '@type': 'ListItem', position: 2, name: 'Insights', item: list },
            {
              '@type': 'ListItem',
              position: 3,
              name: article.title,
              item: pageUrl,
            },
          ],
        }
      : null;

  return (
    <>
      <JsonLd data={postLd} />
      {breadcrumbLd ? <JsonLd data={breadcrumbLd} /> : null}

      <article>
        <header className="pb-6 pt-10 sm:pt-16">
          <Container>
            <div className="mx-auto max-w-190">
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Insights', href: '/insights' },
                  { label: article.title },
                ]}
              />
              <span className="mt-5 inline-block rounded-full bg-brand/15 px-3 py-1 text-[13px] font-medium text-link">
                {cat?.name ?? article.category}
              </span>
              <h1 className="mt-4 text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[44px] lg:text-[52px]">
                {article.title}
              </h1>
              <p className="mt-5 text-[17px] leading-relaxed text-muted sm:text-xl">
                {article.summary}
              </p>
              <p className="mt-6 text-sm text-muted">
                By <span className="font-medium text-fg">{article.author}</span>{' '}
                · Published{' '}
                <time dateTime={article.publishedOn}>
                  {formatDate(article.publishedOn)}
                </time>
                {article.updatedOn ? (
                  <>
                    {' '}
                    · Updated{' '}
                    <time dateTime={article.updatedOn}>
                      {formatDate(article.updatedOn)}
                    </time>
                  </>
                ) : null}{' '}
                · {minutes} min read
              </p>
              <div className="mt-5">
                <ShareButtons title={article.title} url={pageUrl} />
              </div>
            </div>
          </Container>
        </header>

        <Container className="py-8 sm:py-10">
          <div className="mx-auto max-w-190">
            {headings.length > 2 ? (
              <nav
                aria-label="In this article"
                className="glass mb-8 rounded-3xl p-6"
              >
                <h2 className="text-base font-semibold">In this article</h2>
                <ul className="mt-3 flex flex-col gap-1.5 text-[15px]">
                  {headings.map((h) => (
                    <li key={h.text}>
                      <a
                        href={`#${slugify(h.text)}`}
                        className="text-link hover:underline"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}

            <Body blocks={article.body} />

            {article.sources && article.sources.length > 0 ? (
              <section className="mt-10" aria-labelledby="sources-title">
                <h2 id="sources-title" className="text-xl font-semibold">
                  Sources
                </h2>
                <ul className="mt-3 flex flex-col gap-1.5 text-[15px]">
                  {article.sources.map((s) => (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link hover:underline"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {service ? (
              <aside
                className="glass mt-12 rounded-[28px] p-7"
                aria-labelledby="next-title"
              >
                <h2
                  id="next-title"
                  className="text-[22px] font-semibold leading-snug"
                >
                  A sensible next step
                </h2>
                <p className="mt-2 text-muted">
                  If this is something you are working on, our{' '}
                  <Link
                    href={`/services/${service.slug}`}
                    className="font-medium text-link hover:underline"
                  >
                    {service.title.toLowerCase()}
                  </Link>{' '}
                  service explains how we can help.
                </p>
              </aside>
            ) : null}

            <div className="mt-8 border-t border-gborder pt-6">
              <ShareButtons title={article.title} url={pageUrl} />
            </div>
          </div>
        </Container>
      </article>

      {related.length > 0 ? (
        <section className="py-10 sm:py-14" aria-labelledby="related-title">
          <Container>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2
                id="related-title"
                className="text-[26px] font-semibold tracking-[-0.02em] sm:text-[32px]"
              >
                Related articles
              </h2>
              <Link
                href="/insights"
                className="font-medium text-link hover:underline"
              >
                All insights →
              </Link>
            </div>
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <li key={r.slug} className="min-w-0">
                  <ArticleCard article={r} index={i + 1} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <CtaBand
        heading="Want help putting this into practice?"
        text="Tell us what you are working on and we will suggest a sensible next step."
        whatsappText={`Hello Bentaz, I read "${article.title}" and would like to talk.`}
      />
    </>
  );
}
