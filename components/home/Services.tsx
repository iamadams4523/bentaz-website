import Link from 'next/link';
import { Icon, type IconName } from '@/components/ui/Icon';
import { ButtonLink } from '@/components/ui/Button';
import { SectionHead } from '@/components/ui/SectionHead';

type Service = {
  title: string;
  desc: string;
  icon: IconName;
  featured?: boolean;
};

const services: Service[] = [
  {
    title: 'AI and business automation',
    desc: 'Automations and AI tools that take repetitive work off your team and keep running after hours.',
    icon: 'ai',
    featured: true,
  },
  {
    title: 'Business websites and landing pages',
    desc: 'Fast, clear websites that earn trust and turn visitors into enquiries.',
    icon: 'web',
  },
  {
    title: 'Custom software and business systems',
    desc: 'Tools shaped around how your business really works.',
    icon: 'code',
  },
  {
    title: 'Cybersecurity and digital safety',
    desc: 'Protect your accounts, data and customers from everyday threats.',
    icon: 'shield',
  },
  {
    title: 'IT infrastructure and managed IT support',
    desc: 'Networks, devices and support that keep your team working.',
    icon: 'server',
  },
  {
    title: 'Digital transformation and consulting',
    desc: 'A clear plan for moving paper and guesswork onto reliable systems.',
    icon: 'transform',
  },
  {
    title: 'Digital marketing and SEO',
    desc: 'Be found by the people searching for what you offer.',
    icon: 'chart',
  },
  {
    title: 'Mobile applications',
    desc: 'Apps for Android and iOS that your customers or staff will actually use.',
    icon: 'mobile',
  },
  {
    title: 'Bentaz Tech Academy',
    desc: 'Training in digital skills for students and professionals.',
    icon: 'academy',
  },
];

const featuredPoints = [
  'Instant auto-reply to every enquiry',
  'Owner notification and a daily summary email',
  'Workflows that connect the tools you already use',
];

export function Services() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="services-title">
      <div className="mx-auto w-full max-w-310 px-5 sm:px-8">
        <SectionHead
          id="services-title"
          eyebrow="What we do"
          title="What we build for you"
          lead="From your first website to AI automation, we cover the technology your business runs on."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link
              key={s.title}
              href={
                s.featured
                  ? '/services/ai-and-business-automation'
                  : '/services'
              }
              className={`glass flex flex-col gap-3.5 rounded-[28px] p-7 text-fg transition-colors hover:border-brand ${
                s.featured
                  ? 'border-brand/45 bg-[linear-gradient(160deg,rgba(255,106,0,0.22),var(--glass)_55%)] sm:col-span-2 lg:row-span-2'
                  : ''
              }`}
            >
              <span className="grid size-13 flex-none place-items-center rounded-2xl border border-brand/40 bg-[linear-gradient(145deg,rgba(255,106,0,0.26),rgba(255,106,0,0.07))] text-link">
                <Icon name={s.icon} size={26} />
              </span>
              <h3
                className={`font-semibold tracking-tight ${s.featured ? 'text-2xl lg:text-[30px] lg:leading-tight' : 'text-[22px] leading-snug'}`}
              >
                {s.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-muted">{s.desc}</p>
              {s.featured ? (
                <ul className="flex flex-col gap-2.5">
                  {featuredPoints.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2.5 text-[15px] leading-relaxed text-muted"
                    >
                      <span
                        className="flex-none font-semibold text-link"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              ) : null}
              <span className="mt-auto pt-1.5 font-medium text-link">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <ButtonLink href="/services" variant="glass">
            View all services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
