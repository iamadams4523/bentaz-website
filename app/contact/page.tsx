import type { Metadata } from 'next';
import { Suspense } from 'react';
import { EnquiryForm } from '@/components/contact/EnquiryForm';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/ui/JsonLd';
import { absoluteUrl, site, whatsappUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Bentaz Tech Solutions Ltd. in Abuja, Nigeria. Send an enquiry, email, call or message us on WhatsApp.',
};

export default function ContactPage() {
  const { contact } = site;
  const rows: { label: string; value: string; href?: string }[] = [
    {
      label: 'Email',
      value: contact.email ?? '[BUSINESS EMAIL]',
      href: contact.email ? `mailto:${contact.email}` : undefined,
    },
    {
      label: 'Phone',
      value: contact.phone ?? '[PHONE NUMBER]',
      href: contact.phone
        ? `tel:${contact.phone.replace(/\s/g, '')}`
        : undefined,
    },
    {
      label: 'Location',
      value: contact.address ?? '[ADDRESS OR SERVICE AREA]',
    },
    {
      label: 'Opening hours',
      value: '[CONFIRM: opening hours and reply time]',
    },
  ];

  const home = absoluteUrl('/');
  const page = absoluteUrl('/contact');
  const breadcrumbLd =
    home && page
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: home },
            { '@type': 'ListItem', position: 2, name: 'Contact', item: page },
          ],
        }
      : null;

  return (
    <>
      {breadcrumbLd ? <JsonLd data={breadcrumbLd} /> : null}

      <section className="pb-6 pt-10 sm:pt-16">
        <Container>
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
          />
          <h1 className="mt-5 max-w-[20ch] text-[36px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[46px] lg:text-[56px]">
            Tell us what you need
          </h1>
          <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted sm:text-xl">
            Send an enquiry and we will reply with a sensible next step. You can
            also reach us by email, phone or WhatsApp.
          </p>
        </Container>
      </section>

      <section
        className="py-8 sm:py-12"
        aria-label="Enquiry form and contact details"
      >
        <Container className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-8">
          <Suspense
            fallback={
              <div className="glass h-140 rounded-[36px]" aria-hidden="true" />
            }
          >
            <EnquiryForm />
          </Suspense>

          <aside
            className="glass min-w-0 rounded-[28px] p-7"
            aria-labelledby="details-title"
          >
            <h2 id="details-title" className="text-[19px] font-semibold">
              Contact details
            </h2>
            <dl className="mt-3">
              {rows.map((r) => (
                <div
                  key={r.label}
                  className="flex flex-col gap-1 border-t border-gborder py-3.5 first:border-t-0 first:pt-2"
                >
                  <dt className="text-[13px] text-muted">{r.label}</dt>
                  <dd className="font-medium leading-snug">
                    {r.href ? (
                      <a href={r.href} className="text-link hover:underline">
                        {r.value}
                      </a>
                    ) : (
                      r.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-4">
              <ButtonLink
                href={whatsappUrl(
                  'Hello Bentaz, I would like to make an enquiry.',
                )}
                variant="glass"
                className="w-full"
              >
                <Icon name="whatsapp" size={18} strokeWidth={2} />
                Chat on WhatsApp
              </ButtonLink>
            </div>
            <p className="mt-5 text-[13px] leading-relaxed text-muted">
              {site.name} · RC {site.rcNumber} · {site.location}
            </p>
          </aside>
        </Container>
      </section>
    </>
  );
}
