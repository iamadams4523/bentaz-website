import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';

// Shown after every form. Kept out of search results; conversion tracking attaches to this page later.
export const metadata: Metadata = {
  title: 'Thank you',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="glass mx-auto max-w-180 rounded-[28px] p-8 text-center sm:rounded-[36px] sm:p-12">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-brand text-navy">
            <Icon name="check" size={32} strokeWidth={2.4} />
          </span>
          <h1 className="mt-6 text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[44px]">
            Thank you, we have your message
          </h1>
          <p className="mx-auto mt-4 max-w-[48ch] text-[17px] leading-relaxed text-muted">
            We will read it and reply with a sensible next step. [CONFIRM: reply
            time, for example &quot;within one working day&quot;]
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <ButtonLink href="/services">Explore services</ButtonLink>
            <ButtonLink href="/insights" variant="glass">
              Read our insights
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
