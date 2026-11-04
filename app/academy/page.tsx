import type { Metadata } from 'next';
import { CtaBand } from '@/components/home/CtaBand';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/ui/JsonLd';
import { SectionHead } from '@/components/ui/SectionHead';
import {
  academyAudiences,
  academyCourses,
  academyFaqs,
  academyFormats,
  academySteps,
} from '@/lib/academy';
import { absoluteUrl, whatsappUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Bentaz Tech Academy',
  description:
    'Practical digital skills training for students, professionals and teams: digital basics, AI and automation, websites, cybersecurity and IT fundamentals.',
};

const iconBox =
  'grid flex-none place-items-center rounded-2xl border border-brand/40 bg-[linear-gradient(145deg,rgba(255,106,0,0.26),rgba(255,106,0,0.07))] text-link';

export default function AcademyPage() {
  const waText =
    'Hello Bentaz, I would like to enquire about training at Bentaz Tech Academy.';
  const enquiry = '/contact?service=bentaz-tech-academy';

  const home = absoluteUrl('/');
  const page = absoluteUrl('/academy');
  const breadcrumbLd =
    home && page
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: home },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Bentaz Tech Academy',
              item: page,
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
              { label: 'Bentaz Tech Academy' },
            ]}
          />
          <h1 className="mt-5 max-w-[22ch] text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[46px] lg:text-[56px]">
            Practical digital skills, taught by doing
          </h1>
          <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted sm:text-xl">
            Bentaz Tech Academy trains students, professionals and teams in the
            tools and habits modern work asks for, from digital basics to AI and
            automation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <ButtonLink href={enquiry} className="max-sm:w-full">
              Enquire about training
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

      <section className="py-10 sm:py-16" aria-labelledby="who-title">
        <Container>
          <SectionHead
            id="who-title"
            eyebrow="Who it is for"
            title="Learning that fits where you are"
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {academyAudiences.map((a) => (
              <li
                key={a.title}
                className="glass flex min-w-0 flex-col gap-3.5 rounded-[28px] p-7"
              >
                <span className={`${iconBox} size-13`}>
                  <Icon name={a.icon} size={26} />
                </span>
                <h3 className="text-[22px] font-semibold leading-snug tracking-tight">
                  {a.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{a.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-10 sm:py-16" aria-labelledby="courses-title">
        <Container>
          <SectionHead
            id="courses-title"
            eyebrow="Course categories"
            title="What you can learn"
            lead="Topics below show what each category can cover. Full course outlines are confirmed when you enquire. [CONFIRM: owner to approve course outlines]"
          />
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {academyCourses.map((c) => (
              <li
                key={c.title}
                className="glass flex min-w-0 flex-col gap-3.5 rounded-[28px] p-7"
              >
                <span className={`${iconBox} size-13`}>
                  <Icon name={c.icon} size={26} />
                </span>
                <h3 className="text-[22px] font-semibold leading-snug tracking-tight">
                  {c.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-muted">
                  {c.text}
                </p>
                <ul className="mt-1 flex flex-col gap-2 text-sm text-muted">
                  {c.topics.map((t) => (
                    <li key={t} className="flex items-start gap-2.5">
                      <span
                        className="flex-none font-semibold text-link"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-10 sm:py-16" aria-labelledby="formats-title">
        <Container>
          <SectionHead
            id="formats-title"
            eyebrow="Training formats"
            title="Choose the way you learn best"
          />
          <ul className="grid gap-5 sm:grid-cols-2">
            {academyFormats.map((f) => (
              <li key={f.title} className="glass min-w-0 rounded-[28px] p-7">
                <h3 className="text-[20px] font-semibold leading-snug">
                  {f.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{f.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-10 sm:py-16" aria-labelledby="how-title">
        <Container>
          <SectionHead
            id="how-title"
            eyebrow="How it works"
            title="From enquiry to first session"
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {academySteps.map((s, i) => (
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

      <section className="py-14 sm:py-20" aria-labelledby="faq-title">
        <Container>
          <SectionHead
            id="faq-title"
            center
            eyebrow="FAQs"
            title="Questions about the Academy"
          />
          <FaqAccordion items={academyFaqs} />
        </Container>
      </section>

      <CtaBand
        heading="Ready to start learning?"
        text="Tell us what you want to learn and we will suggest a course and format."
        contactHref={enquiry}
        whatsappText={waText}
      />
    </>
  );
}
