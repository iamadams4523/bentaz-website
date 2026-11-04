'use client';

import { useId, useState } from 'react';
import { Icon } from '@/components/ui/Icon';

type FaqItem = { q: string; a: string };

/** Reusable accordion. All answers are real text in the HTML flow; only the open one is shown. */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto flex max-w-[860px] flex-col gap-3">
      {items.map((f, i) => {
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
                className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-[22px] px-5 py-[18px] text-left text-base font-medium leading-snug text-fg sm:px-[26px] sm:py-[22px] sm:text-lg"
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
            <div
              id={panelId}
              hidden={!isOpen}
              className="max-w-[70ch] px-5 pb-5 leading-[1.7] text-muted sm:px-[26px] sm:pb-6"
            >
              {f.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
