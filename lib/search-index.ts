import { academyCourses } from '@/lib/academy';
import { getPublishedArticles, getCategory } from '@/lib/articles';
import { getPublishedProjects } from '@/lib/projects';
import { services } from '@/lib/services';
import { solutions } from '@/lib/solutions';

export type SearchKind =
  | 'Service'
  | 'Solution'
  | 'Article'
  | 'Project'
  | 'Page';

export type SearchItem = {
  title: string;
  description: string;
  href: string;
  kind: SearchKind;
  /** Extra words that should find this item. Lower case is applied when searching. */
  keywords: string;
};

/** Everything visitors can find, built from the same data that powers the pages. */
export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const s of services) {
    items.push({
      title: s.title,
      description: s.summary,
      href: `/services/${s.slug}`,
      kind: 'Service',
      keywords: [
        s.glance.bestFor,
        s.glance.youGet,
        ...s.gets,
        ...s.suits,
        ...s.faqs.map((f) => f.q),
      ].join(' '),
    });
  }

  for (const s of solutions) {
    items.push({
      title: s.title,
      description: s.summary,
      href: `/solutions/${s.slug}`,
      kind: 'Solution',
      keywords: [
        s.short,
        ...s.challenges.map((c) => c.title),
        ...s.help.map((h) => h.need),
      ].join(' '),
    });
  }

  for (const a of getPublishedArticles()) {
    items.push({
      title: a.title,
      description: a.summary,
      href: `/insights/${a.slug}`,
      kind: 'Article',
      keywords: [
        getCategory(a.category)?.name ?? '',
        ...a.body
          .filter((b) => b.type === 'h2')
          .map((b) => ('text' in b ? b.text : '')),
      ].join(' '),
    });
  }

  for (const p of getPublishedProjects()) {
    items.push({
      title: p.title,
      description: p.summary,
      href: `/projects/${p.slug}`,
      kind: 'Project',
      keywords: [p.sector, p.client].join(' '),
    });
  }

  items.push(
    {
      title: 'Bentaz Tech Academy',
      description:
        'Practical digital skills training for students, professionals and teams.',
      href: '/academy',
      kind: 'Page',
      keywords: [
        'training courses learn students classes workshops',
        ...academyCourses.map((c) => c.title),
      ].join(' '),
    },
    {
      title: 'About Bentaz',
      description:
        'Who we are, how we work and our registered company details.',
      href: '/about',
      kind: 'Page',
      keywords: 'company story values approach rc number registered abuja',
    },
    {
      title: 'Contact',
      description: 'Send an enquiry or reach us by email, phone or WhatsApp.',
      href: '/contact',
      kind: 'Page',
      keywords: 'enquiry quote email phone whatsapp message get in touch',
    },
    {
      title: 'Privacy Policy',
      description: 'How we collect, use and protect personal information.',
      href: '/privacy',
      kind: 'Page',
      keywords: 'data protection cookies rights',
    },
    {
      title: 'Terms of Use',
      description: 'The terms for using this website.',
      href: '/terms',
      kind: 'Page',
      keywords: 'legal conditions',
    },
  );

  return items;
}
