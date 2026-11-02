import type { ReactNode } from 'react';

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="glass-strong inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-medium shadow-none!">
      <span
        className="size-2 flex-none rounded-full bg-brand"
        aria-hidden="true"
      />
      {children}
    </span>
  );
}

type SectionHeadProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  center?: boolean;
  id?: string;
};

export function SectionHead({
  eyebrow,
  title,
  lead,
  center = false,
  id,
}: SectionHeadProps) {
  return (
    <div className={`mb-12 max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className="mt-4 text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl lg:text-[46px]"
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted sm:text-xl ${center ? 'mx-auto' : ''}`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
