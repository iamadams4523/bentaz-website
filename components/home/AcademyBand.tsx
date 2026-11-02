import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/SectionHead';

const courses = [
  'Digital skills',
  'AI and automation basics',
  'Websites and digital marketing',
  'Cybersecurity awareness',
  'IT fundamentals',
  'Software and tools',
];

export function AcademyBand() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="academy-title">
      <div className="mx-auto w-full max-w-310 px-5 sm:px-8">
        <div className="glass grid items-center gap-8 overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,rgba(255,106,0,0.2),var(--glass)_55%)] p-6 sm:rounded-[36px] sm:p-10 lg:grid-cols-2 lg:gap-8">
          <div>
            <Eyebrow>Bentaz Tech Academy</Eyebrow>
            <h2
              id="academy-title"
              className="mt-4 text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl lg:text-[46px]"
            >
              Practical digital skills for students and professionals
            </h2>
            <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted sm:text-xl">
              Training in the tools and habits that modern work asks for, from
              digital basics to AI and automation.
            </p>
            <div className="mt-8">
              <ButtonLink href="/academy" className="max-sm:w-full">
                Explore the Academy
              </ButtonLink>
            </div>
          </div>
          <ul className="flex flex-wrap gap-3">
            {courses.map((c) => (
              <li
                key={c}
                className="rounded-full border border-gborder bg-glass px-4 py-2 text-sm font-medium"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
