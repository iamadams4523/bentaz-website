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
import { getService } from '@/lib/services';
import { absoluteUrl, whatsappUrl } from '@/lib/site';
import { getSolution, solutions } from '@/lib/solutions';

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/solutions/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};
  return { title: solution.title, description: solution.metaDescription };
}

// Reading `params` must happen inside a <Suspense> boundary (Cache Components).
export default function SolutionPage(props: PageProps<'/solutions/[slug]'>) {
  return (
    <Suspense fallback={<Skeleton />}>
      <SolutionContent params={props.params} />
    </Suspense>
  );
}

function Skeleton() {
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

async function SolutionContent({
  params,
}: {
  params: PageProps<'/solutions/[slug]'>['params'];
}) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const waText = `Hello Bentaz, I would like to talk about: ${solution.short}`;
  const others = solution.related
    .map((r) => getSolution(r))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const pageUrl = absoluteUrl(`/solutions/${solution.slug}`);
  const home = absoluteUrl('/');
  const list = absoluteUrl('/solutions');
  const breadcrumbLd =
    home && list && pageUrl
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: home },
            { '@type': 'ListItem', position: 2, name: 'Solutions', item: list },
            {
              '@type': 'ListItem',
              position: 3,
              name: solution.short,
              item: pageUrl,
            },
          ],
        }
      : null;

  return (
    <>
      {breadcrumbLd ? <JsonLd data={breadcrumbLd} /> : null}

      <section className="pb-6 pt-10 sm:pt-16">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Solutions', href: '/solutions' },
              { label: solution.short },
            ]}
          />
          <h1 className="mt-5 max-w-[22ch] text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[46px] lg:text-[56px]">
            {solution.title}
          </h1>
          <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted sm:text-xl">
            {solution.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <ButtonLink href="/contact" className="max-sm:w-full">
              Request a Consultation
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
        </Container>
      </section>

      <section className="py-10 sm:py-16" aria-labelledby="challenges-title">
        <Container>
          <SectionHead
            id="challenges-title"
            eyebrow="Common challenges"
            title="What usually gets in the way"
          />
          <ul className="grid gap-5 md:grid-cols-3">
            {solution.challenges.map((c) => (
              <li key={c.title} className="glass min-w-0 rounded-[28px] p-7">
                <h3 className="text-[20px] font-semibold leading-snug">
                  {c.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {c.text}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-10 sm:py-16" aria-labelledby="help-title">
        <Container>
          <SectionHead
            id="help-title"
            eyebrow="How we help"
            title="The services that fit"
          />
          <ul className="grid gap-5 sm:grid-cols-2">
            {solution.help.map((h) => {
              const svc = getService(h.service);
              if (!svc) return null;
              return (
                <li key={h.service} className="min-w-0">
                  <Link
                    href={`/services/${svc.slug}`}
                    className="glass flex h-full gap-4 rounded-[28px] p-6 text-fg transition-colors hover:border-brand"
                  >
                    <span className="grid size-11 flex-none place-items-center rounded-2xl border border-brand/40 bg-[linear-gradient(145deg,rgba(255,106,0,0.26),rgba(255,106,0,0.07))] text-link">
                      <Icon name={svc.icon} size={22} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-lg font-semibold leading-snug">
                        {h.need}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-muted">
                        {h.text}
                      </span>
                      <span className="mt-3 block text-sm font-medium text-link">
                        {svc.title} →
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className="py-10 sm:py-16" aria-labelledby="steps-title">
        <Container>
          <SectionHead
            id="steps-title"
            eyebrow="How it works"
            title="A simple path from first call to finished work"
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {solution.steps.map((s, i) => (
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

      <section className="py-6 sm:py-8" aria-labelledby="consider-title">
        <Container>
          <div className="glass rounded-[28px] p-7 sm:rounded-[36px] sm:p-10">
            <h2
              id="consider-title"
              className="text-[26px] font-semibold tracking-[-0.02em] sm:text-[32px]"
            >
              Worth considering
            </h2>
            <ul className="mt-5 flex flex-col gap-2.5">
              {solution.considerations.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-2.5 leading-relaxed text-muted"
                >
                  <span
                    className="flex-none font-semibold text-link"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="faq-title">
        <Container>
          <SectionHead
            id="faq-title"
            center
            eyebrow="FAQs"
            title="Common questions"
          />
          <FaqAccordion items={solution.faqs} />
        </Container>
      </section>

      <section className="py-6 sm:py-8" aria-labelledby="other-title">
        <Container>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2
              id="other-title"
              className="text-[26px] font-semibold tracking-[-0.02em] sm:text-[32px]"
            >
              Other solutions
            </h2>
            <Link
              href="/solutions"
              className="font-medium text-link hover:underline"
            >
              All solutions →
            </Link>
          </div>
          <ul className="grid gap-5 md:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug} className="min-w-0">
                <Link
                  href={`/solutions/${o.slug}`}
                  className="glass flex h-full flex-col gap-3 rounded-[28px] p-6 text-fg transition-colors hover:border-brand"
                >
                  <span className="grid size-11 place-items-center rounded-2xl border border-brand/40 bg-[linear-gradient(145deg,rgba(255,106,0,0.26),rgba(255,106,0,0.07))] text-link">
                    <Icon name={o.icon} size={22} />
                  </span>
                  <h3 className="text-lg font-semibold leading-snug">
                    {o.short}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {o.summary}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        heading={`Want to talk about ${solution.short.toLowerCase()}?`}
        text="Tell us what you are trying to achieve and we will suggest a sensible next step."
        whatsappText={waText}
      />
    </>
  );
}
