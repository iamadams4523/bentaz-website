import { Icon, type IconName } from '@/components/ui/Icon';
import { SectionHead } from '@/components/ui/SectionHead';

const audiences: { title: string; text: string; icon: IconName }[] = [
  {
    title: 'SMEs and growing businesses',
    text: 'Websites, systems and automation that fit your size and grow with you.',
    icon: 'building',
  },
  {
    title: 'Schools, NGOs, associations and public bodies',
    text: 'Clear, dependable technology for organisations that serve people.',
    icon: 'institution',
  },
  {
    title: 'Owners adopting AI and automation',
    text: 'Practical first steps into AI, without the hype.',
    icon: 'ai',
  },
  {
    title: 'Students and professionals',
    text: 'Hands-on training through Bentaz Tech Academy.',
    icon: 'academy',
  },
];

export function Audiences() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="audiences-title">
      <div className="mx-auto w-full max-w-310 px-5 sm:px-8">
        <SectionHead
          id="audiences-title"
          eyebrow="Who we work with"
          title="Built for the people who run things"
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <li
              key={a.title}
              className="glass flex flex-col gap-3.5 rounded-[28px] p-7"
            >
              <span className="grid size-13 place-items-center rounded-2xl border border-brand/40 bg-[linear-gradient(145deg,rgba(255,106,0,0.26),rgba(255,106,0,0.07))] text-link">
                <Icon name={a.icon} size={26} />
              </span>
              <h3 className="text-[22px] font-semibold leading-snug tracking-tight">
                {a.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{a.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
