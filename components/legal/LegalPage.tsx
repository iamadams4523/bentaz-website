import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { LEGAL_APPROVED, LEGAL_DRAFT_DATE } from '@/lib/legal';

/** A paragraph (string) or a bullet list (array of strings). */
export type LegalBlock = string | string[];
export type LegalSection = { heading: string; blocks: LegalBlock[] };

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <section className="pb-16 pt-10 sm:pt-16">
      <Container>
        <div className="mx-auto max-w-190">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: title }]}
          />
          <h1 className="mt-5 text-[34px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[46px]">
            {title}
          </h1>
          <p className="mt-4 text-sm text-muted">
            {LEGAL_APPROVED ? 'Last updated' : 'Draft prepared'}{' '}
            {LEGAL_DRAFT_DATE}
          </p>

          {!LEGAL_APPROVED ? (
            <p className="glass mt-6 rounded-[20px] border-l-4 border-l-brand p-5 text-[15px] leading-relaxed">
              <strong>Draft for review.</strong> This text has not yet been
              approved by the owner or reviewed by a lawyer. Items in [CONFIRM]
              brackets need a decision before launch.
            </p>
          ) : null}

          <p className="mt-6 text-[17px] leading-[1.75] text-muted">{intro}</p>

          <nav aria-label="On this page" className="glass mt-8 rounded-3xl p-6">
            <h2 className="text-base font-semibold">On this page</h2>
            <ol className="mt-3 flex list-decimal flex-col gap-1.5 pl-5 text-[15px] marker:text-link">
              {sections.map((s) => (
                <li key={s.heading}>
                  <a
                    href={`#${slug(s.heading)}`}
                    className="text-link hover:underline"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-10 flex flex-col gap-10">
            {sections.map((s) => (
              <section
                key={s.heading}
                id={slug(s.heading)}
                className="scroll-mt-28"
              >
                <h2 className="text-[24px] font-semibold leading-tight tracking-[-0.02em] sm:text-[28px]">
                  {s.heading}
                </h2>
                <div className="mt-4 flex flex-col gap-4 text-[16.5px] leading-[1.75] text-muted">
                  {s.blocks.map((b, i) =>
                    typeof b === 'string' ? (
                      <p key={i}>{b}</p>
                    ) : (
                      <ul
                        key={i}
                        className="flex list-disc flex-col gap-2 pl-6 marker:text-link"
                      >
                        {b.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
