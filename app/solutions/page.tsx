import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBand } from '@/components/home/CtaBand';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { solutions } from '@/lib/solutions';

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'Technology solutions for SMEs, schools, NGOs and public bodies in Nigeria from Bentaz Tech Solutions Ltd. in Abuja.',
};

export default function SolutionsPage() {
  return (
    <>
      <section className="pb-6 pt-10 sm:pt-16">
        <Container>
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Solutions' }]}
          />
          <h1 className="mt-5 max-w-[20ch] text-[36px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[46px] lg:text-[56px]">
            Solutions for the organisation you run
          </h1>
          <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted sm:text-xl">
            Every organisation has its own pressures. Choose the one closest to
            yours to see the problems we usually help with and where to start.
          </p>
        </Container>
      </section>

      <section className="py-8 sm:py-12" aria-label="All solutions">
        <Container>
          <ul className="grid gap-5 md:grid-cols-3">
            {solutions.map((s) => (
              <li key={s.slug} className="min-w-0">
                <Link
                  href={`/solutions/${s.slug}`}
                  className="glass flex h-full flex-col gap-3.5 rounded-[28px] p-7 text-fg transition-colors hover:border-brand"
                >
                  <span className="grid size-[52px] flex-none place-items-center rounded-2xl border border-brand/40 bg-[linear-gradient(145deg,rgba(255,106,0,0.26),rgba(255,106,0,0.07))] text-link">
                    <Icon name={s.icon} size={26} />
                  </span>
                  <h2 className="text-[22px] font-semibold leading-snug tracking-tight">
                    {s.short}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-muted">
                    {s.summary}
                  </p>
                  <span className="mt-auto pt-1.5 font-medium text-link">
                    See this solution →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        heading="Does your organisation not fit neatly?"
        text="Tell us what you do and what is getting in the way. We will suggest a sensible place to start."
        whatsappText="Hello Bentaz, I would like to talk about a solution for my organisation."
      />
    </>
  );
}
