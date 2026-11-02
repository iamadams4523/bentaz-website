import { SectionHead } from '@/components/ui/SectionHead';

const steps = [
  {
    title: 'Talk',
    text: 'Tell us about your business and what you want to change.',
  },
  {
    title: 'Scope',
    text: 'We agree what will be built, in what order, and what it involves.',
  },
  {
    title: 'Design',
    text: 'You review layouts and flows before anything is built.',
  },
  {
    title: 'Build',
    text: 'We build on a staging site and you approve at each gate.',
  },
  {
    title: 'Launch and support',
    text: 'We launch, hand over and train your team.',
  },
];

export function Process() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="process-title">
      <div className="mx-auto w-full max-w-310 px-5 sm:px-8">
        <SectionHead
          id="process-title"
          eyebrow="How we work"
          title="From first conversation to launch"
        />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="glass flex flex-col gap-3 rounded-[28px] p-6"
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
      </div>
    </section>
  );
}
