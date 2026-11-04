import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { CtaBand } from '@/components/home/CtaBand';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/ui/JsonLd';
import { SectionHead } from '@/components/ui/SectionHead';
import { getProject, getPublishedProjects } from '@/lib/projects';
import { getService } from '@/lib/services';
import { absoluteUrl, site } from '@/lib/site';

// Cache Components needs at least one static param. With no published projects yet, a placeholder
// slug is used; it resolves to a 404 because no project matches it.
export function generateStaticParams() {
  const list = getPublishedProjects();
  return list.length > 0
    ? list.map((p) => ({ slug: p.slug }))
    : [{ slug: 'no-published-projects' }];
}

export async function generateMetadata({
  params,
}: PageProps<'/projects/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { robots: { index: false } };
  return { title: project.title, description: project.summary };
}

export default function ProjectPage(props: PageProps<'/projects/[slug]'>) {
  return (
    <Suspense fallback={<Skeleton />}>
      <ProjectContent params={props.params} />
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

function formatDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      });
}

async function ProjectContent({
  params,
}: {
  params: PageProps<'/projects/[slug]'>['params'];
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const pageUrl = absoluteUrl(`/projects/${project.slug}`);
  const home = absoluteUrl('/');
  const list = absoluteUrl('/projects');
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: project.title,
    description: project.summary,
    datePublished: project.publishedOn,
    ...(project.updatedOn ? { dateModified: project.updatedOn } : {}),
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@type': 'Organization', name: site.name },
    ...(pageUrl ? { mainEntityOfPage: pageUrl } : {}),
  };
  const breadcrumbLd =
    home && list && pageUrl
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: home },
            { '@type': 'ListItem', position: 2, name: 'Projects', item: list },
            {
              '@type': 'ListItem',
              position: 3,
              name: project.title,
              item: pageUrl,
            },
          ],
        }
      : null;

  const services = project.services
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <JsonLd data={articleLd} />
      {breadcrumbLd ? <JsonLd data={breadcrumbLd} /> : null}

      <section className="pb-6 pt-10 sm:pt-16">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-12">
          <div className="min-w-0">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Projects', href: '/projects' },
                { label: project.title },
              ]}
            />
            <h1 className="mt-5 text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[46px] lg:text-[54px]">
              {project.title}
            </h1>
            <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted sm:text-xl">
              {project.summary}
            </p>
          </div>
          <div className="glass min-w-0 rounded-[28px] p-7">
            <h2 className="text-[19px] font-semibold">Project details</h2>
            <dl className="mt-3">
              {[
                ['Client', project.client],
                ['Sector', project.sector],
                ['Published', formatDate(project.publishedOn)],
                ...(project.updatedOn
                  ? [['Updated', formatDate(project.updatedOn)]]
                  : []),
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex flex-col gap-1 border-t border-gborder py-3.5 first:border-t-0 first:pt-2"
                >
                  <dt className="text-[13px] text-muted">{k}</dt>
                  <dd className="font-medium leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className="py-8 sm:py-12" aria-label="Problem and solution">
        <Container className="grid gap-5 lg:grid-cols-2">
          {[
            ['The problem', project.problem],
            ['The solution', project.solution],
          ].map(([label, body]) => (
            <div
              key={label}
              className="glass min-w-0 rounded-[28px] p-7 sm:rounded-[36px] sm:p-10"
            >
              <h2 className="text-[26px] font-semibold tracking-[-0.02em] sm:text-[32px]">
                {label}
              </h2>
              <p className="mt-4 leading-[1.7] text-muted">{body}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-6 sm:py-8" aria-labelledby="scope-title">
        <Container className="grid gap-5 lg:grid-cols-2">
          <div className="glass min-w-0 rounded-[28px] p-7 sm:rounded-[36px] sm:p-10">
            <h2
              id="scope-title"
              className="text-[26px] font-semibold tracking-[-0.02em] sm:text-[32px]"
            >
              The scope
            </h2>
            <ul className="mt-5 flex flex-col gap-2.5">
              {project.scope.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2.5 leading-relaxed text-muted"
                >
                  <span
                    className="flex-none font-semibold text-link"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass min-w-0 rounded-[28px] p-7 sm:rounded-[36px] sm:p-10">
            <h2 className="text-[26px] font-semibold tracking-[-0.02em] sm:text-[32px]">
              Verified outcomes
            </h2>
            <ul className="mt-5 flex flex-col gap-4">
              {project.outcomes.map((o) => (
                <li key={o.text} className="leading-relaxed">
                  <span className="block font-medium">{o.text}</span>
                  <span className="block text-sm text-muted">
                    Verified: {o.source}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {project.visuals.length > 0 ? (
        <section className="py-10 sm:py-16" aria-labelledby="visuals-title">
          <Container>
            <SectionHead
              id="visuals-title"
              eyebrow="Approved visuals"
              title="What it looks like"
            />
            <ul className="grid gap-5 sm:grid-cols-2">
              {project.visuals.map((v) => (
                <li
                  key={v.src}
                  className="glass min-w-0 overflow-hidden rounded-[28px]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={v.src}
                    alt={v.alt}
                    loading="lazy"
                    className="h-auto w-full"
                  />
                  {v.caption ? (
                    <p className="p-4 text-sm text-muted">{v.caption}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {services.length > 0 ? (
        <section className="py-6 sm:py-8" aria-labelledby="svc-title">
          <Container>
            <h2
              id="svc-title"
              className="mb-5 text-[26px] font-semibold tracking-[-0.02em] sm:text-[32px]"
            >
              Services used
            </h2>
            <ul className="flex flex-wrap gap-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-gborder bg-glass px-4 py-2 text-sm font-medium transition-colors hover:border-brand"
                  >
                    <Icon name={s.icon} size={16} />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <CtaBand
        heading="Want a similar result?"
        text="Tell us what you are trying to achieve and we will suggest a sensible next step."
        whatsappText={`Hello Bentaz, I read the project "${project.title}" and would like to talk.`}
      />
    </>
  );
}
