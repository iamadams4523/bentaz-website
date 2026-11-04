import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBand } from '@/components/home/CtaBand';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { SectionHead } from '@/components/ui/SectionHead';
import { getPublishedProjects } from '@/lib/projects';
import { getService } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    "Project write-ups from Bentaz Tech Solutions Ltd. in Abuja, Nigeria. Each one is published only with the client's permission and facts we can verify.",
};

const sections = [
  {
    title: 'The problem',
    text: 'What the client needed and what was getting in the way.',
  },
  {
    title: 'The solution',
    text: 'What we built or changed, in plain language.',
  },
  { title: 'The scope', text: 'Exactly what was and was not included.' },
  {
    title: 'Verified outcomes',
    text: 'Results the client has confirmed, with how we know.',
  },
];

export default function ProjectsPage() {
  const list = getPublishedProjects();

  return (
    <>
      <section className="pb-6 pt-10 sm:pt-16">
        <Container>
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Projects' }]}
          />
          <h1 className="mt-5 max-w-[20ch] text-[36px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[46px] lg:text-[56px]">
            Projects we can stand behind
          </h1>
          <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted sm:text-xl">
            We publish a project only when the client has given permission and
            the results can be verified. Nothing here is padded or borrowed.
          </p>
        </Container>
      </section>

      {list.length > 0 ? (
        <section className="py-8 sm:py-12" aria-label="All projects">
          <Container>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <li key={p.slug} className="min-w-0">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="glass flex h-full flex-col gap-3 rounded-[28px] p-7 text-fg transition-colors hover:border-brand"
                  >
                    <span className="text-[13px] font-medium text-link">
                      {p.sector}
                    </span>
                    <h2 className="text-[22px] font-semibold leading-snug tracking-tight">
                      {p.title}
                    </h2>
                    <p className="text-[15px] leading-relaxed text-muted">
                      {p.summary}
                    </p>
                    <ul className="flex flex-wrap gap-2 pt-1">
                      {p.services.map((s) => (
                        <li
                          key={s}
                          className="rounded-full border border-gborder bg-glass px-3 py-1 text-xs font-medium"
                        >
                          {getService(s)?.title ?? s}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto pt-1.5 font-medium text-link">
                      Read the project →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : (
        <section className="py-8 sm:py-12" aria-labelledby="empty-title">
          <Container>
            <div className="glass rounded-[28px] p-7 sm:rounded-[36px] sm:p-10">
              <span className="grid size-[52px] place-items-center rounded-2xl border border-brand/40 bg-[linear-gradient(145deg,rgba(255,106,0,0.26),rgba(255,106,0,0.07))] text-link">
                <Icon name="chart" size={26} />
              </span>
              <h2
                id="empty-title"
                className="mt-5 text-[26px] font-semibold tracking-[-0.02em] sm:text-[34px]"
              >
                Our first project write-ups are on the way
              </h2>
              <p className="mt-4 max-w-[62ch] leading-[1.7] text-muted">
                We would rather show nothing than show something we cannot back
                up. Project write-ups will appear here as clients confirm they
                are happy for them to be shared. [CONFIRM: owner to decide
                whether to name the first projects or describe them anonymously]
              </p>
            </div>
          </Container>
        </section>
      )}

      <section className="py-10 sm:py-16" aria-labelledby="format-title">
        <Container>
          <SectionHead
            id="format-title"
            eyebrow="How we write them"
            title="Every project follows the same honest format"
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sections.map((s, i) => (
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

      <CtaBand
        heading="Have a project in mind?"
        text="Tell us what you want to achieve and we will suggest a sensible first step."
        whatsappText="Hello Bentaz, I would like to talk about a project."
      />
    </>
  );
}
