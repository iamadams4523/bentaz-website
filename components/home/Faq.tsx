'use client';

import { useId, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { SectionHead } from '@/components/ui/SectionHead';

const faqs = [
  {
    q: 'What kinds of businesses do you work with?',
    a: 'SMEs and growing businesses, schools, NGOs, associations and public bodies, and owners adopting AI and automation. We are based in Abuja, serve Nigeria first and can work with suitable clients elsewhere.',
  },
  {
    q: 'How do I start a project?',
    a: 'Send an enquiry through the form, WhatsApp or phone and tell us what you want to achieve. We will come back to you to talk through the next step.',
  },
  {
    q: 'Do you only build websites?',
    a: 'No. We cover websites and landing pages, custom software, AI and automation, cybersecurity, IT infrastructure and support, digital transformation consulting, digital marketing and SEO, mobile apps and training.',
  },
  {
    q: 'Can AI really help a small business?',
    a: 'Often, for repetitive work such as acknowledging enquiries, sending reminders and producing daily summaries. The AI Automation Lab above gives you a starting point. It is not a quote.',
  },
  {
    q: 'Do you offer training?',
    a: 'Yes, through Bentaz Tech Academy, for students and professionals. Visit the Academy page to make an enquiry.',
  },
];

export function Faq() {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-24" aria-labelledby="faq-title">
      <div className="mx-auto w-full max-w-310 px-5 sm:px-8">
        <SectionHead
          id="faq-title"
          center
          eyebrow="Common questions"
          title="Before you get in touch"
        />
        <div className="mx-auto flex max-w-215 flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            return (
              <div key={f.q} className="glass rounded-[22px]">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-[22px] px-5 py-4.5 text-left text-base font-medium leading-snug text-fg sm:px-6.5 sm:py-5.5 sm:text-lg"
                  >
                    <span>{f.q}</span>
                    <span className="grid size-8 flex-none place-items-center rounded-full border border-gborder bg-glass-2 text-link">
                      <Icon
                        name={isOpen ? 'minus' : 'plus'}
                        size={16}
                        strokeWidth={2.2}
                      />
                    </span>
                  </button>
                </h3>
                {isOpen ? (
                  <div
                    id={panelId}
                    className="max-w-[70ch] px-5 pb-5 leading-[1.7] text-muted sm:px-6.5 sm:pb-6"
                  >
                    {f.a}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
