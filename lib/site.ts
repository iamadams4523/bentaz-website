/**
 * Single source of truth for company details and navigation.
 *
 * Values typed as `null` are still to be confirmed by the owner. The UI
 * shows a bracketed placeholder (e.g. [PHONE NUMBER]) until they are set,
 * so nothing invented ever appears as fact.
 */

export const site = {
  name: 'Bentaz Tech Solutions Ltd.',
  shortName: 'Bentaz',
  tagline: 'Building Technology Businesses Can Trust.',
  rcNumber: '7444114',
  location: 'Abuja, Nigeria',
  contact: {
    email: null as string | null,
    phone: null as string | null,
    whatsapp: null as string | null, // digits only with country code, e.g. 234XXXXXXXXXX
    address: null as string | null,
  },
} as const;

/** WhatsApp click-to-chat. Pass a message to pre-fill it (e.g. the page or service name). */
export function whatsappUrl(message?: string): string {
  const n = site.contact.whatsapp;
  if (!n) return '#';
  return message
    ? `https://wa.me/${n}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${n}`;
}

/** Public site address, e.g. https://www.example.com (no trailing slash). Set NEXT_PUBLIC_SITE_URL in .env.local. */
export const siteUrl: string | null =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? null;

/** Absolute URL for a path, or null until the site address is configured. */
export function absoluteUrl(path: string): string | null {
  return siteUrl ? `${siteUrl}${path}` : null;
}

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Projects', href: '/projects' },
  { label: 'Insights', href: '/insights' },
  { label: 'Academy', href: '/academy' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const footerServices: NavItem[] = [
  { label: 'Business websites', href: '/services' },
  { label: 'Custom software', href: '/services' },
  { label: 'AI and automation', href: '/services' },
  { label: 'Cybersecurity', href: '/services' },
  { label: 'IT support', href: '/services' },
  { label: 'Digital marketing and SEO', href: '/services' },
];

export const footerCompany: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Insights', href: '/insights' },
  { label: 'Bentaz Tech Academy', href: '/academy' },
  { label: 'Contact', href: '/contact' },
];
