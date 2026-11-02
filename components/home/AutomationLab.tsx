'use client';

import { useId, useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { SectionHead } from '@/components/ui/SectionHead';
import {
  type AutomationPlan,
  type BusinessType,
  businessTypes,
  examplePlans,
  isAutomationPlan,
} from '@/lib/automation-plans';

const MAX_CHARS = 500;
const ENDPOINT = '/api/automation-lab'; // implemented in the backend phase; until then the example plan is shown.

export function AutomationLab() {
  const textId = useId();
  const [type, setType] = useState<BusinessType>(businessTypes[0]);
  const [text, setText] = useState('');
  const [live, setLive] = useState<AutomationPlan | null>(null);
  const [loading, setLoading] = useState(false);

  const plan = live ?? examplePlans[type];

  function pickType(t: BusinessType) {
    setType(t);
    setLive(null); // a plan made for another business type no longer applies
  }

  async function generate() {
    if (!text.trim()) {
      setLive(null); // nothing to personalise: show the example for this type
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessType: type, description: text.trim() }),
        signal: AbortSignal.timeout(20_000),
      });
      const data: unknown = res.ok ? await res.json() : null;
      setLive(isAutomationPlan(data) ? data : null);
    } catch {
      setLive(null); // live AI unavailable: fall back to the example plan
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-8 sm:py-12" aria-labelledby="lab-title">
      <div className="mx-auto w-full max-w-310 px-5 sm:px-8">
        <SectionHead
          id="lab-title"
          center
          eyebrow="AI Automation Lab"
          title="See what could run while you sleep"
          lead="Pick your business type, tell us what eats your team's time, and get a short starting plan."
        />

        <div className="glass grid gap-8 rounded-[28px] p-6 sm:rounded-[36px] sm:p-10 lg:grid-cols-[5fr_7fr]">
          {/* Inputs */}
          <div>
            <span
              id={`${textId}-types`}
              className="mb-2.5 block text-sm font-medium"
            >
              Your business type
            </span>
            <div
              role="group"
              aria-labelledby={`${textId}-types`}
              className="flex flex-wrap gap-2.5"
            >
              {businessTypes.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={t === type}
                  onClick={() => pickType(t)}
                  className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                    t === type
                      ? 'border-transparent bg-brand text-navy'
                      : 'border-gborder bg-glass text-fg hover:border-brand'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <label
              htmlFor={textId}
              className="mb-2.5 mt-6 block text-sm font-medium"
            >
              What takes most of your team&apos;s time?
            </label>
            <textarea
              id={textId}
              value={text}
              maxLength={MAX_CHARS}
              onChange={(e) => setText(e.target.value)}
              placeholder="For example: answering the same customer questions on WhatsApp, chasing payments, writing weekly reports."
              className="min-h-33 w-full resize-y rounded-2xl border border-gborder bg-field px-4 py-3.5 text-base leading-normal text-fg placeholder:text-muted"
            />
            <div className="mt-2 flex justify-between gap-3 text-[13px] text-muted">
              <span>
                Please don&apos;t enter personal or confidential information.
              </span>
              <span aria-live="polite">
                {text.length} / {MAX_CHARS}
              </span>
            </div>

            <button
              type="button"
              onClick={generate}
              disabled={loading}
              className="mt-6 inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full bg-brand px-7 font-medium text-navy shadow-[0_12px_30px_-10px_rgba(255,106,0,0.6)] transition-colors hover:bg-[#ff7d24] disabled:cursor-wait disabled:opacity-70 max-sm:w-full"
            >
              {loading ? 'Preparing your plan…' : 'Generate my plan'}
            </button>
          </div>

          {/* Plan */}
          <div
            className="glass-strong rounded-[28px] p-7"
            aria-live="polite"
            aria-busy={loading}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-brand/15 px-3 py-1 text-[13px] font-medium text-link">
                  {live ? 'Your plan' : 'Example plan'}
                </span>
                <h3 className="mt-3 text-[22px] font-semibold leading-snug">
                  {plan.name}
                </h3>
              </div>
              <span className="max-w-[18ch] text-right text-sm text-muted">
                A starting point, not a quote
              </span>
            </div>

            <h4 className="mt-6 text-[15px] font-semibold">
              Three things we could automate
            </h4>
            <ol className="mt-2">
              {plan.items.map((it, i) => (
                <li
                  key={it.title}
                  className={`flex gap-3.5 py-3.5 ${i > 0 ? 'border-t border-gborder' : ''}`}
                >
                  <span className="grid size-8.5 flex-none place-items-center rounded-full bg-brand text-sm font-semibold text-navy">
                    {i + 1}
                  </span>
                  <div>
                    <div className="font-semibold">{it.title}</div>
                    <p className="mt-0.5 text-[14.5px] leading-relaxed text-muted">
                      {it.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <h4 className="mt-6 text-[15px] font-semibold">Your night shift</h4>
            <ul className="ml-1.5 mt-3 border-l border-dashed border-(--ring)">
              {plan.night.map((n) => (
                <li
                  key={n.time + n.text}
                  className="relative pb-4 pl-5.5 text-[14.5px] leading-relaxed text-muted last:pb-0"
                >
                  <span
                    className="absolute -left-1.5 top-1.5 size-2.75 rounded-full bg-brand shadow-[0_0_0_4px_rgba(255,106,0,0.2)]"
                    aria-hidden="true"
                  />
                  <b className="mr-2 font-semibold text-fg">{n.time}</b>
                  {n.text}
                </li>
              ))}
            </ul>

            <h4 className="mt-6 text-[15px] font-semibold">
              How this improves your service
            </h4>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              {plan.gain}
            </p>

            <div className="mt-6">
              <ButtonLink href="/contact" size="sm">
                Send this plan to the enquiry form
              </ButtonLink>
            </div>
            {!live ? (
              <p className="mt-3 text-[13px] text-muted">
                Shown as an example while the live AI is unavailable or when no
                description is entered.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
