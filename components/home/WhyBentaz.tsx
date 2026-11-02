import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/SectionHead';

const reasons = [
  {
    title: 'Plain-language scope',
    text: 'You will know what is being built, why, and what it involves before work begins.',
  },
  {
    title: 'Security from the start',
    text: 'Accounts, backups and access are planned in, not added at the end.',
  },
  {
    title: 'Built to be maintained',
    text: 'Simple, well-documented choices so your site or system stays easy to run.',
  },
  {
    title: 'You stay in control',
    text: 'Your domain, hosting and accounts belong to you, with clear handover.',
  },
];

export function WhyBentaz() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="why-title">
      <div className="mx-auto grid w-full max-w-310 items-center gap-8 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <Eyebrow>Why Bentaz</Eyebrow>
          <h2
            id="why-title"
            className="mt-4 text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl lg:text-[46px]"
          >
            Building technology businesses can trust
          </h2>
          <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted sm:text-xl">
            We keep the scope clear, the language plain and the security tight,
            so you always know what you are getting and who is accountable.
          </p>
          <div className="mt-8">
            <ButtonLink href="/about" variant="glass">
              About Bentaz
            </ButtonLink>
          </div>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2">
          {reasons.map((r) => (
            <li
              key={r.title}
              className="glass flex flex-col gap-2.5 rounded-[28px] p-7"
            >
              <h3 className="text-[19px] font-semibold leading-snug">
                {r.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{r.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
