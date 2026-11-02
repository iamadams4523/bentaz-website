import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/SectionHead';
import { Icon, type IconName } from '@/components/ui/Icon';
import { site, whatsappUrl } from '@/lib/site';
import { Orbit } from './Orbit';

const deskRows: { title: string; sub: string; chip: string; icon: IconName }[] =
  [
    {
      title: 'Website for a private school',
      sub: 'New enquiry from a service page',
      chip: 'Auto-reply sent',
      icon: 'web',
    },
    {
      title: 'Plan from the Automation Lab',
      sub: 'Sent into the enquiry form',
      chip: 'New',
      icon: 'ai',
    },
    {
      title: 'Consultation request',
      sub: 'From a WhatsApp click',
      chip: 'Follow up',
      icon: 'whatsapp',
    },
  ];

const ticks = [
  'Based in Abuja, serving Nigeria first',
  'Able to serve suitable clients elsewhere',
  'Reach us by form, WhatsApp or phone',
];

function MiniIcon({ name }: { name: IconName }) {
  return (
    <span className="grid size-9.5 flex-none place-items-center rounded-xl bg-brand/15 text-link">
      <Icon name={name} size={20} strokeWidth={2} />
    </span>
  );
}

export function Hero() {
  return (
    <section className="overflow-x-clip pb-8 pt-10 sm:pt-16 lg:pb-14 lg:pt-18">
      <div className="mx-auto grid w-screen max-w-310 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[7fr_5fr] lg:gap-12">
        <div>
          <Eyebrow>
            {site.location} · Registered company RC {site.rcNumber}
          </Eyebrow>
          <h1 className="mt-5.5 text-[40px] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-[56px] xl:text-7xl">
            We build digital solutions that help businesses grow.
          </h1>
          <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted sm:text-xl">
            {site.tagline} Websites, software, AI automation, security and IT
            support, explained plainly and built to last.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <ButtonLink href="/contact" className="max-sm:w-full">
              Discuss a Project
              <Icon name="arrow" size={18} strokeWidth={2} />
            </ButtonLink>
            <ButtonLink
              href={whatsappUrl()}
              variant="glass"
              className="max-sm:w-full"
            >
              <Icon name="whatsapp" size={18} strokeWidth={2} />
              Chat on WhatsApp
            </ButtonLink>
          </div>
          <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
            {ticks.map((t) => (
              <li
                key={t}
                className="flex items-center gap-2.5 text-[15px] text-muted"
              >
                <span
                  className="size-2 flex-none rounded-full bg-brand"
                  aria-hidden="true"
                />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Illustrative product card: stacked on small screens, layered on lg+. */}
        <div
          className="relative grid gap-3.5 lg:block lg:h-140"
          aria-hidden="true"
        >
          <Orbit className="hidden lg:block" />

          <div className="glass rounded-[22px] px-4.5 py-4 lg:absolute lg:-right-1.5 lg:top-0 lg:w-62.5">
            <div className="flex items-center gap-3">
              <MiniIcon name="moon" />
              <div>
                <div className="text-sm font-semibold">Night shift</div>
                <div className="text-[12.5px] text-muted">
                  Automations run while you sleep
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-[30px] p-5.5 lg:absolute lg:inset-x-0 lg:left-8.5 lg:top-21">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-[15px] font-semibold">Enquiry desk</span>
              <span className="rounded-full bg-brand/15 px-3 py-1 text-[13px] font-medium text-link">
                Illustration
              </span>
            </div>
            {deskRows.map((r, i) => (
              <div
                key={r.title}
                className={`flex items-center gap-3 py-3 ${i > 0 ? 'border-t border-gborder' : ''}`}
              >
                <MiniIcon name={r.icon} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium leading-snug">
                    {r.title}
                  </div>
                  <div className="text-[12.5px] leading-snug text-muted">
                    {r.sub}
                  </div>
                </div>
                <span className="hidden rounded-full bg-brand/15 px-3 py-1 text-[13px] font-medium text-link sm:inline-block">
                  {r.chip}
                </span>
              </div>
            ))}
          </div>

          <div className="glass rounded-[22px] px-4.5 py-4 lg:absolute lg:-left-1.5 lg:bottom-4.5 lg:w-69">
            <div className="flex items-center gap-3">
              <MiniIcon name="check" />
              <div>
                <div className="text-sm font-semibold">Confirmation sent</div>
                <div className="text-[12.5px] text-muted">
                  Every visitor gets an automatic reply
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
