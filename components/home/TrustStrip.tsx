import { site } from '@/lib/site';

// Divider classes per cell: 1 column on phones, 2 on sm, 4 on lg.
const facts = [
  { k: 'Legal name', v: site.name, edge: '' },
  {
    k: 'Registration',
    v: `RC ${site.rcNumber}`,
    edge: 'max-sm:border-t sm:border-l lg:border-l',
  },
  {
    k: 'Based in',
    v: site.location,
    edge: 'max-sm:border-t sm:border-t lg:border-t-0 lg:border-l',
  },
  {
    k: 'Reach us',
    v: 'Form, WhatsApp or phone',
    edge: 'max-sm:border-t sm:border-t sm:border-l lg:border-t-0',
  },
];

/** Only verifiable company facts. No invented client counts or years of experience. */
export function TrustStrip() {
  return (
    <section className="py-8" aria-label="Company facts">
      <div className="mx-auto w-full max-w-310 px-5 sm:px-8">
        <dl className="glass grid rounded-[28px] p-2 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.k} className={`border-gborder px-6 py-4.5 ${f.edge}`}>
              <dt className="text-[13px] text-muted">{f.k}</dt>
              <dd className="mt-1 text-[17px] font-semibold leading-snug">
                {f.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
