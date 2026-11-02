import Link from 'next/link';
import { footerCompany, footerServices, site } from '@/lib/site';
import { CopyrightYear } from './CopyrightYear';
import { Logo } from './Logo';

const linkCls = 'text-[14.5px] text-muted transition-colors hover:text-fg';

function ContactLine({
  label,
  value,
  placeholder,
}: {
  label?: string;
  value: string | null;
  placeholder: string;
}) {
  return (
    <li className="text-[14.5px] text-muted">
      {label ? `${label}: ` : ''}
      {value ?? placeholder}
    </li>
  );
}

/** Glass footer panel. Four columns on desktop, two on tablet, one on phones. */
export function Footer() {
  const { contact } = site;

  return (
    <footer className="relative z-1 pb-10 pt-8">
      <div className="mx-auto w-full max-w-310 px-5 sm:px-8">
        <div className="glass rounded-[28px] p-7 sm:rounded-[36px] sm:p-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <Logo />
              <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-muted">
                {site.tagline}
              </p>
              <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-muted">
                {site.name} is a registered Nigerian company based in Abuja. RC:{' '}
                {site.rcNumber}.
              </p>
            </div>

            <nav aria-label="Services">
              <h2 className="mb-4 text-[15px] font-semibold">Services</h2>
              <ul className="flex flex-col gap-2.5">
                {footerServices.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={linkCls}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Company">
              <h2 className="mb-4 text-[15px] font-semibold">Company</h2>
              <ul className="flex flex-col gap-2.5">
                {footerCompany.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={linkCls}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="mb-4 text-[15px] font-semibold">Get in touch</h2>
              <ul className="flex flex-col gap-2.5">
                <ContactLine
                  label="Email"
                  value={contact.email}
                  placeholder="[BUSINESS EMAIL]"
                />
                <ContactLine
                  label="Phone"
                  value={contact.phone}
                  placeholder="[PHONE NUMBER]"
                />
                <ContactLine
                  label="WhatsApp"
                  value={contact.whatsapp}
                  placeholder="[WHATSAPP NUMBER]"
                />
                <ContactLine
                  value={contact.address}
                  placeholder="[ADDRESS OR SERVICE AREA]"
                />
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-gborder pt-6 text-[13.5px] text-muted">
            <span>
              © <CopyrightYear /> {site.name} RC {site.rcNumber}. All rights
              reserved.
            </span>
            <span>
              <Link href="/privacy" className="hover:text-fg">
                Privacy Policy
              </Link>
              {' · '}
              <Link href="/terms" className="hover:text-fg">
                Terms of Use
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
