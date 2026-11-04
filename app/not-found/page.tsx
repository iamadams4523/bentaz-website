import type { Metadata } from 'next';
import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

const links = [
  { label: 'Services', href: '/services', text: 'What we build and support' },
  {
    label: 'Solutions',
    href: '/solutions',
    text: 'For SMEs, schools, NGOs and public bodies',
  },
  {
    label: 'Insights',
    href: '/insights',
    text: 'Practical articles, written plainly',
  },
  {
    label: 'Bentaz Tech Academy',
    href: '/academy',
    text: 'Digital skills training',
  },
];

export default function NotFound() {
  return (
    <section className="py-14 sm:py-24">
      <Container>
        <div className="mx-auto max-w-190 text-center">
          <p
            className="text-[96px] font-semibold leading-none tracking-tighter text-brand sm:text-[140px]"
            aria-hidden="true"
          >
            404
          </p>
          <h1 className="mt-2 text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[44px]">
            We could not find that page
          </h1>
          <p className="mx-auto mt-4 max-w-[48ch] text-[17px] leading-relaxed text-muted">
            The link may be old or mistyped. Try a search, or pick one of the
            places below.
          </p>

          <form
            action="/search"
            method="get"
            role="search"
            className="mx-auto mt-8 flex max-w-130 gap-2.5"
          >
            <label htmlFor="nf-q" className="sr-only">
              Search the site
            </label>
            <input
              id="nf-q"
              name="q"
              type="search"
              placeholder="Search the site"
              className="min-w-0 flex-1 rounded-full border border-gborder bg-field px-5 py-3 text-fg placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            />
            <button
              type="submit"
              className="inline-flex min-h-12 items-center rounded-full bg-brand px-6 font-semibold text-navy transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Search
            </button>
          </form>

          <ul className="mt-10 grid gap-4 text-left sm:grid-cols-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="glass flex h-full flex-col gap-1 rounded-[22px] p-5 text-fg transition-colors hover:border-brand"
                >
                  <span className="font-semibold">{l.label} →</span>
                  <span className="text-sm text-muted">{l.text}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap justify-center gap-3.5">
            <ButtonLink href="/">
              Back to the home page
              <Icon name="arrow" size={18} strokeWidth={2} />
            </ButtonLink>
            <ButtonLink href="/contact" variant="glass">
              Contact us
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
