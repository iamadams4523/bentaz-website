import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBand } from '@/components/home/CtaBand';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { Icon, type IconName } from '@/components/ui/Icon';
import { JsonLd } from '@/components/ui/JsonLd';
import { SectionHead } from '@/components/ui/SectionHead';
import { services } from '@/lib/services';
import { absoluteUrl, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Bentaz Tech Solutions Ltd.',
  description:
    'Bentaz Tech Solutions Ltd. (RC 7444114) is a registered Nigerian company in Abuja that builds digital solutions to help businesses grow.',
};

/**
 * Draft copy for the owner's approval (brief, section 7).
 * No invented years of experience, client counts, team size or certifications.
 * Facts only the owner can state are marked [CONFIRM].
 */

const facts: [string, string][] = [
  ['Registered name', site.name],
  ['RC number', site.rcNumber],
  ['Location', site.location],
  [
    'What we do',
    'Websites, custom software, AI and business automation, cybersecurity, IT support, consulting, digital marketing, mobile apps and training',
  ],
  [
    'Who we serve',
    'SMEs and growing businesses, schools, NGOs, associations and public bodies, and people learning digital skills',
  ],
  ['Where we work', 'Nigeria first, and suitable clients elsewhere'],
];

const approach: { title: string; text: string }[] = [
  {
    title: 'Listen first',
    text: 'We start with your goal and your day-to-day reality, not with a product we want to sell.',
  },
  {
    title: 'Agree a clear scope',
    text: 'You know what is being built, why and what is included before work begins.',
  },
  {
    title: 'Build in small steps',
    text: 'We deliver something useful early and improve it, so you can see progress and steer.',
  },
  {
    title: 'Hand over properly',
    text: 'We document the work and show your team how to run it, so you are not dependent on us for everyday tasks.',
  },
];

const values: { title: string; text: string; icon: IconName }[] = [
  {
    title: 'Plain language',
    text: 'We explain choices without jargon so you can decide with confidence.',
    icon: 'chart',
  },
  {
    title: 'Security from the start',
    text: 'Accounts, backups and access are planned in, not added at the end.',
    icon: 'shield',
  },
  {
    title: 'Built to be maintained',
    text: 'Simple, well-documented choices keep your site or system easy to run.',
    icon: 'code',
  },
  {
    title: 'You stay in control',
    text: 'Your domain, hosting and accounts belong to you. [CONFIRM: ownership and handover terms]',
    icon: 'building',
  },
  {
    title: 'Honest claims',
    text: 'We say what we can do and what we cannot. We do not invent results or testimonials.',
    icon: 'check',
  },
  {
    title: 'Learning for everyone',
    text: 'Through Bentaz Tech Academy we help people build the skills technology asks for.',
    icon: 'academy',
  },
];

const iconBox =
  'grid flex-none place-items-center rounded-2xl border border-brand/40 bg-[linear-gradient(145deg,rgba(255,106,0,0.26),rgba(255,106,0,0.07))] text-link';

export default function AboutPage() {
  const url = absoluteUrl('/');
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    legalName: site.name,
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'RC number',
      value: site.rcNumber,
    },
    slogan: site.tagline,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Abuja',
      addressCountry: 'NG',
    },
    areaServed: { '@type': 'Country', name: 'Nigeria' },
    ...(url ? { url } : {}),
    ...(site.contact.email ? { email: site.contact.email } : {}),
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
  };
  const page = absoluteUrl('/about');
  const breadcrumbLd =
    url && page
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: url },
            { '@type': 'ListItem', position: 2, name: 'About', item: page },
          ],
        }
      : null;

  return (
    <>
      <JsonLd data={orgLd} />
      {breadcrumbLd ? <JsonLd data={breadcrumbLd} /> : null}

      <section className="pb-6 pt-10 sm:pt-16">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start lg:gap-12">
          <div className="min-w-0">
            <Breadcrumbs
              items={[{ label: 'Home', href: '/' }, { label: 'About' }]}
            />
            <h1 className="mt-5 text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[46px] lg:text-[56px]">
              We build digital solutions that help businesses grow
            </h1>
            <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted sm:text-xl">
              {site.name} is a registered Nigerian company based in Abuja. We
              build websites, systems and automation, keep them safe, and teach
              the skills that go with them.
            </p>
          </div>

          <div className="glass min-w-0 rounded-[28px] p-7">
            <h2 className="text-[19px] font-semibold">Company facts</h2>
            <dl className="mt-3">
              {facts.map(([k, v]) => (
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

      <section className="py-8 sm:py-12" aria-labelledby="story-title">
        <Container>
          <div className="glass rounded-[28px] p-7 sm:rounded-[36px] sm:p-10">
            <h2
              id="story-title"
              className="text-[26px] font-semibold tracking-[-0.02em] sm:text-[34px]"
            >
              Our story
            </h2>
            <div className="mt-4 flex max-w-[70ch] flex-col gap-4 leading-[1.75] text-muted">
              <p>
                Many businesses and organisations in Nigeria know technology
                could help them, but struggle to find a partner who explains
                things plainly, builds what was agreed and stays accountable
                afterwards. Bentaz exists to be that partner.
              </p>
              <p>
                We work with growing businesses, schools, NGOs and public
                bodies, and we run Bentaz Tech Academy for people who want to
                build their own digital skills.
              </p>
              <p>
                [CONFIRM: the owner&apos;s own account of why Bentaz was
                started, the year it was registered and who founded it. Do not
                publish years of experience, client numbers or certifications
                unless they can be verified.]
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-16" aria-labelledby="approach-title">
        <Container>
          <SectionHead
            id="approach-title"
            eyebrow="Our approach"
            title="How we work with you"
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((s, i) => (
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

      <section className="py-10 sm:py-16" aria-labelledby="values-title">
        <Container>
          <SectionHead
            id="values-title"
            eyebrow="Our values"
            title="What you can expect from us"
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <li
                key={v.title}
                className="glass flex min-w-0 flex-col gap-3.5 rounded-[28px] p-7"
              >
                <span className={`${iconBox} size-13`}>
                  <Icon name={v.icon} size={26} />
                </span>
                <h3 className="text-[22px] font-semibold leading-snug tracking-tight">
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{v.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-10 sm:py-16" aria-labelledby="do-title">
        <Container>
          <SectionHead
            id="do-title"
            eyebrow="What we do"
            title="Services at a glance"
          />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug} className="min-w-0">
                <Link
                  href={`/services/${s.slug}`}
                  className="glass flex items-center gap-3.5 rounded-[22px] p-4 text-fg transition-colors hover:border-brand"
                >
                  <span className={`${iconBox} size-11`}>
                    <Icon name={s.icon} size={22} />
                  </span>
                  <span className="font-medium leading-snug">{s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-muted">
            Looking for something closer to your type of organisation?{' '}
            <Link
              href="/solutions"
              className="font-medium text-link hover:underline"
            >
              See our solutions →
            </Link>
          </p>
        </Container>
      </section>

      <CtaBand
        heading="Let us talk about what you need"
        text="Tell us about your business and what you want to achieve. We will suggest a sensible first step."
        whatsappText="Hello Bentaz, I read your About page and would like to talk."
      />
    </>
  );
}
