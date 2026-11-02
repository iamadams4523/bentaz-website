import { ButtonLink } from '@/components/ui/Button';
import { whatsappUrl } from '@/lib/site';
import { Orbit } from './Orbit';

type CtaBandProps = { heading?: string; text?: string };

/** Closing call to action. Reused across pages with different copy. */
export function CtaBand({
  heading = 'Ready to talk about your project?',
  text = 'Tell us what you need and we will help you work out the next step.',
}: CtaBandProps) {
  return (
    <section className="py-8 sm:py-12" aria-label="Get in touch">
      <div className="mx-auto w-full max-w-310 px-5 sm:px-8">
        <div className="glass relative overflow-hidden rounded-[30px] bg-[linear-gradient(120deg,rgba(255,106,0,0.2),var(--glass)_60%)] p-8 sm:rounded-[40px] sm:p-16">
          <Orbit
            className="hidden lg:block"
            style={{ left: '78%', opacity: 0.7 }}
          />
          <div className="relative z-1">
            <h2 className="max-w-[16ch] text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl lg:text-[46px]">
              {heading}
            </h2>
            <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted sm:text-xl">
              {text}
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5 sm:mt-8">
              <ButtonLink href="/contact" className="max-sm:w-full">
                Discuss a Project
              </ButtonLink>
              <ButtonLink
                href={whatsappUrl()}
                variant="glass"
                className="max-sm:w-full"
              >
                Chat on WhatsApp
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
