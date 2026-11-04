import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBand } from '@/components/home/CtaBand';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { services } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Websites, custom software, AI and automation, cybersecurity, IT support, digital marketing and SEO, mobile apps and training from Bentaz Tech Solutions Ltd. in Abuja, Nigeria.',
};

export default function ServicesPage() {
  return (
    <>
      <section className="pb-6 pt-10 sm:pt-16">
        <Container>
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
          />
          <h1 className="mt-5 max-w-[20ch] text-[36px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[46px] lg:text-[56px]">
            Services built around how your business works
          </h1>
          <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted sm:text-xl">
            Nine ways we can help, from a first website to AI automation and
            training. Each page explains the problem, what you get and how it
            works.
          </p>
        </Container>
      </section>

      <section className="py-8 sm:py-12" aria-label="All services">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug} className="min-w-0">
                <Link
                  href={`/services/${s.slug}`}
                  className="glass flex h-full flex-col gap-3.5 rounded-[28px] p-7 text-fg transition-colors hover:border-brand"
                >
                  <span className="grid size-[52px] flex-none place-items-center rounded-2xl border border-brand/40 bg-[linear-gradient(145deg,rgba(255,106,0,0.26),rgba(255,106,0,0.07))] text-link">
                    <Icon name={s.icon} size={26} />
                  </span>
                  <h2 className="text-[22px] font-semibold leading-snug tracking-tight">
                    {s.title}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-muted">
                    {s.summary}
                  </p>
                  <span className="mt-auto pt-1.5 font-medium text-link">
                    Explore this service →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        heading="Not sure which service you need?"
        text="Describe the problem and we will point you to the right starting place."
      />
    </>
  );
}
