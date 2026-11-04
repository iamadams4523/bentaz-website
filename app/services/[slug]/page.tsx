import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { CtaBand } from '@/components/home/CtaBand';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/ui/JsonLd';
import { SectionHead } from '@/components/ui/SectionHead';
import { getService, services } from '@/lib/services';
import { absoluteUrl, site, whatsappUrl } from '@/lib/site';

// With Cache Components, every known slug is prerendered at build time. Anything else is a 404.
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/services/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.title, description: service.metaDescription };
}

// Reading `params` must happen inside a <Suspense> boundary (Cache Components). The fallback is a light placeholder.
export default function ServicePage(props: PageProps<'/services/[slug]'>) {
  return (
    <Suspense fallback={<ServiceSkeleton />}>
      <ServiceContent params={props.params} />
    </Suspense>
  );
}

function ServiceSkeleton() {
  return (
    <section className="pb-6 pt-10 sm:pt-16" aria-hidden="true">
      <Container>
        <div className="h-4 w-48 rounded-full bg-glass" />
        <div className="mt-6 h-14 max-w-[640px] rounded-2xl bg-glass" />
        <div className="mt-5 h-20 max-w-[560px] rounded-2xl bg-glass" />
      </Container>
    </section>
  );
}

async function ServiceContent({
  params,
}: {
  params: PageProps<'/services/[slug]'>['params'];
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const cta = service.primaryCta ?? {
    label: 'Request a Consultation',
    href: `/contact?service=${service.slug}`,
  };
  const waText = `Hello Bentaz, I would like to talk about: ${service.title}`;
  const related = service.related
    .map((r) => getService(r))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const pageUrl = absoluteUrl(`/services/${service.slug}`);
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.metaDescription,
    provider: { '@type': 'Organization', name: site.name },
    areaServed: { '@type': 'Country', name: 'Nigeria' },
    ...(pageUrl ? { url: pageUrl } : {}),
  };
  // BreadcrumbList needs absolute URLs, so it is only emitted once NEXT_PUBLIC_SITE_URL is set.
  const home = absoluteUrl('/');
  const list = absoluteUrl('/services');
  const breadcrumbLd =
    home && list && pageUrl
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: home },
            { '@type': 'ListItem', position: 2, name: 'Services', item: list },
            {
              '@type': 'ListItem',
              position: 3,
              name: service.title,
              item: pageUrl,
            },
          ],
        }
      : null;

  return (
    <>
      <JsonLd data={serviceLd} />
      {breadcrumbLd ? <JsonLd data={breadcrumbLd} /> : null}

      {/* Summary */}
      <section className="pb-6 pt-10 sm:pt-16">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-12">
          <div className="min-w-0">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: service.title },
              ]}
            />
            <h1 className="mt-5 text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[46px] lg:text-[56px]">
              {service.title}
            </h1>
            <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted sm:text-xl">
              {service.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <ButtonLink href={cta.href} className="max-sm:w-full">
                {cta.label}
                <Icon name="arrow" size={18} strokeWidth={2} />
              </ButtonLink>
              <ButtonLink
                href={whatsappUrl(waText)}
                variant="glass"
                className="max-sm:w-full"
              >
                <Icon name="whatsapp" size={18} strokeWidth={2} />
                Chat on WhatsApp
              </ButtonLink>
            </div>
          </div>

          <div className="glass min-w-0 rounded-[28px] p-7">
            <h2 className="text-[19px] font-semibold">At a glance</h2>
            <dl className="mt-3">
              {[
                ['Best for', service.glance.bestFor],
                ['You get', service.glance.youGet],
                ['Starts with', service.glance.startsWith],
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

      {/* Problem solved + what you get */}
      <section
        className="py-8 sm:py-12"
        aria-label="The problem and what you get"
      >
        <Container className="grid gap-5 lg:grid-cols-2">
          <div className="glass min-w-0 rounded-[28px] p-7 sm:rounded-[36px] sm:p-10">
            <span className="rounded-full bg-brand/15 px-3 py-1 text-[13px] font-medium text-link">
              The problem
            </span>
            <h2 className="mt-4 text-[26px] font-semibold leading-tight tracking-[-0.02em] sm:text-[34px]">
              {service.problem.heading}
            </h2>
            <p className="mt-4 leading-[1.7] text-muted">
              {service.problem.body}
            </p>
          </div>
          <div className="glass min-w-0 rounded-[28px] p-7 sm:rounded-[36px] sm:p-10">
            <span className="rounded-full bg-brand/15 px-3 py-1 text-[13px] font-medium text-link">
              What you get
            </span>
            <h2 className="mt-4 text-[26px] font-semibold leading-tight tracking-[-0.02em] sm:text-[34px]">
              Clear results you can use
            </h2>
            <ul className="mt-5 flex flex-col gap-2.5">
              {service.gets.map((g) => (
                <li
                  key={g}
                  className="flex items-start gap-2.5 leading-relaxed text-muted"
                >
                  <span
                    className="flex-none font-semibold text-link"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-10 sm:py-16" aria-labelledby="how-title">
        <Container>
          <SectionHead
            id="how-title"
            eyebrow="How it works"
            title="From first conversation to finished work"
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.steps.map((s, i) => (
              <li
                key={s.title}
                className="glass flex min-w-0 flex-col gap-3 rounded-[28px] p-6"
              >
                <span className="grid size-11 place-items-center rounded-full bg-brand font-semibold text-navy">
                  {i + 1}
                </span>
                <h3 className="text-[19px] font-semibold leading-snug">
                  {s.title}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-muted">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Who it suits */}
      <section className="py-6 sm:py-8" aria-labelledby="suits-title">
        <Container>
          <div className="glass rounded-[28px] p-7 sm:rounded-[36px] sm:p-10">
            <h2
              id="suits-title"
              className="text-[26px] font-semibold tracking-[-0.02em] sm:text-[32px]"
            >
              Who this suits
            </h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {service.suits.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-gborder bg-glass px-4 py-2 text-sm font-medium"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section className="py-14 sm:py-20" aria-labelledby="faq-title">
        <Container>
          <SectionHead
            id="faq-title"
            center
            eyebrow="FAQs"
            title={`Questions about ${service.title.toLowerCase()}`}
          />
          <FaqAccordion items={service.faqs} />
        </Container>
      </section>

      {/* Related services */}
      <section className="py-6 sm:py-8" aria-labelledby="related-title">
        <Container>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2
              id="related-title"
              className="text-[26px] font-semibold tracking-[-0.02em] sm:text-[32px]"
            >
              Related services
            </h2>
            <Link
              href="/services"
              className="font-medium text-link hover:underline"
            >
              All services →
            </Link>
          </div>
          <ul className="grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug} className="min-w-0">
                <Link
                  href={`/services/${r.slug}`}
                  className="glass flex h-full flex-col gap-3 rounded-[28px] p-6 text-fg transition-colors hover:border-brand"
                >
                  <span className="grid size-11 place-items-center rounded-2xl border border-brand/40 bg-[linear-gradient(145deg,rgba(255,106,0,0.26),rgba(255,106,0,0.07))] text-link">
                    <Icon name={r.icon} size={22} />
                  </span>
                  <h3 className="text-lg font-semibold leading-snug">
                    {r.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {r.summary}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        heading={`Want to talk about ${service.title.toLowerCase()}?`}
        text="Tell us what you are trying to achieve and we will suggest a sensible next step."
        contactHref={cta.href}
        whatsappText={waText}
      />
    </>
  );
}
