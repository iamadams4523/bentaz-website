import type { IconName } from '@/components/ui/Icon';

/**
 * Draft copy for the owner's approval (brief, section 7).
 * Only audiences with specific, useful content get a page. No invented clients, statistics or guarantees.
 * Anything only the owner can state is marked [CONFIRM].
 */

export type Solution = {
  slug: string;
  title: string;
  /** Short name used in cards and breadcrumbs. */
  short: string;
  summary: string;
  icon: IconName;
  metaDescription: string;
  challenges: { title: string; text: string }[];
  /** Each item links a need to the service that answers it. */
  help: { need: string; text: string; service: string }[];
  steps: { title: string; text: string }[];
  considerations: string[];
  faqs: { q: string; a: string }[];
  related: string[];
};

export const solutions: Solution[] = [
  {
    slug: 'smes-and-growing-businesses',
    title: 'Technology for SMEs and growing businesses',
    short: 'SMEs and growing businesses',
    summary:
      'A website that earns trust, systems that remove repeated work, and support when something breaks, sized for a business that is still growing.',
    icon: 'building',
    metaDescription:
      'Websites, custom systems, automation and IT support for small and growing businesses in Nigeria, from Bentaz Tech Solutions Ltd. in Abuja.',
    challenges: [
      {
        title: 'Customers cannot find or trust you online',
        text: 'No website, an outdated one, or a social page that does not answer the questions buyers ask before they call.',
      },
      {
        title: 'Work lives in notebooks and chat threads',
        text: 'Orders, stock, invoices and follow-ups are tracked by hand, so things get missed and the owner becomes the bottleneck.',
      },
      {
        title: 'Technology breaks at the wrong time',
        text: 'Slow computers, unreliable networks and unmanaged accounts cost time and leave the business exposed.',
      },
    ],
    help: [
      {
        need: 'Be easy to find and easy to contact',
        text: 'A clear business website with the details customers look for.',
        service: 'business-websites-and-landing-pages',
      },
      {
        need: 'Stop doing the same task twice',
        text: 'Automation for repeated steps such as enquiries, reminders and reports.',
        service: 'ai-and-business-automation',
      },
      {
        need: 'Run the business from one place',
        text: 'Custom systems for sales, stock, bookings or records, built around your process.',
        service: 'custom-software-and-business-systems',
      },
      {
        need: 'Keep devices and accounts working',
        text: 'Practical IT support and basic safety habits.',
        service: 'it-infrastructure-and-managed-it-support',
      },
    ],
    steps: [
      {
        title: 'Tell us what slows you down',
        text: 'A short conversation about your business and where time or customers are being lost.',
      },
      {
        title: 'Agree a small first step',
        text: 'We suggest the single change most worth making first, rather than a long list.',
      },
      {
        title: 'Build and hand over',
        text: 'We deliver the work and show your team how to use it.',
      },
      {
        title: 'Grow from there',
        text: 'Add the next piece when the business is ready for it.',
      },
    ],
    considerations: [
      'Start with one problem rather than a full overhaul.',
      'Pick tools your team will actually use day to day.',
      'Keep ownership of your domain, accounts and data. [CONFIRM: ownership and handover terms]',
    ],
    faqs: [
      {
        q: 'We are a very small business. Is this for us?',
        a: 'Yes. The work is sized to the business, and many first projects are a single website or one simple system.',
      },
      {
        q: 'Do we need to know about technology?',
        a: 'No. We explain choices in plain language and you decide what goes ahead.',
      },
      {
        q: 'Can we start with just one service?',
        a: 'Yes. Most businesses begin with one problem and add more later.',
      },
      {
        q: 'How much will it cost?',
        a: 'It depends on the scope. We give a written estimate after we understand what you need. [CONFIRM: how quotes are given]',
      },
    ],
    related: ['schools-and-education', 'ngos-and-public-bodies'],
  },
  {
    slug: 'schools-and-education',
    title: 'Technology for schools and education providers',
    short: 'Schools and education',
    summary:
      'Clear websites, simple records systems and practical training so schools and training providers can spend more time teaching.',
    icon: 'academy',
    metaDescription:
      'Websites, records systems, IT support and training for schools and education providers in Nigeria, from Bentaz Tech Solutions Ltd. in Abuja.',
    challenges: [
      {
        title: 'Parents cannot find basic information',
        text: 'Admissions details, fees, calendars and contacts are scattered across posts, flyers and phone calls.',
      },
      {
        title: 'Records are kept on paper or in separate files',
        text: 'Attendance, results and student details are hard to search, share or back up.',
      },
      {
        title: 'Staff need confidence with digital tools',
        text: 'New systems only help if teachers and administrators know how to use them.',
      },
    ],
    help: [
      {
        need: 'Give families one trusted place to look',
        text: 'A clear school website with admissions, contacts and announcements.',
        service: 'business-websites-and-landing-pages',
      },
      {
        need: 'Keep records organised',
        text: 'A records or portal system built around how your school works.',
        service: 'custom-software-and-business-systems',
      },
      {
        need: 'Build digital skills',
        text: 'Hands-on training for staff and learners.',
        service: 'bentaz-tech-academy',
      },
      {
        need: 'Keep the school network running',
        text: 'Support for computers, Wi-Fi and accounts.',
        service: 'it-infrastructure-and-managed-it-support',
      },
    ],
    steps: [
      {
        title: 'Understand the school',
        text: 'We learn how admissions, records and communication work today.',
      },
      {
        title: 'Choose what helps most',
        text: 'We recommend a small, workable first step, such as a website or records tool.',
      },
      {
        title: 'Set up and train',
        text: 'We deliver the work and train the people who will use it.',
      },
      {
        title: 'Review with you',
        text: 'We check what is working and what to improve next.',
      },
    ],
    considerations: [
      'Student information is personal data and needs careful handling.',
      'Choose tools that work on the devices and connectivity you have.',
      'Involve the staff who will use the system from the start.',
    ],
    faqs: [
      {
        q: 'Do you work with schools of every size?',
        a: 'We are happy to discuss schools and training providers of different sizes. [CONFIRM: whether there are any limits on the kind of institution]',
      },
      {
        q: 'How is student data protected?',
        a: 'We follow sensible access controls and discuss data protection with you before any system holds student records.',
      },
      {
        q: 'Can you train our teachers?',
        a: 'Yes, through Bentaz Tech Academy. [CONFIRM: format, schedule and fees]',
      },
    ],
    related: ['smes-and-growing-businesses', 'ngos-and-public-bodies'],
  },
  {
    slug: 'ngos-and-public-bodies',
    title: 'Technology for NGOs, associations and public bodies',
    short: 'NGOs and public bodies',
    summary:
      'Dependable websites, record keeping and digital safety for organisations that serve people and answer to funders, members and the public.',
    icon: 'institution',
    metaDescription:
      'Websites, systems and digital safety for NGOs, associations and public bodies in Nigeria, from Bentaz Tech Solutions Ltd. in Abuja.',
    challenges: [
      {
        title: 'Showing your work clearly',
        text: 'Funders, members and the public want to see what you do, who you serve and how to reach you.',
      },
      {
        title: 'Tracking programmes and members',
        text: 'Spreadsheets and shared folders become hard to manage as programmes and teams grow.',
      },
      {
        title: 'Protecting sensitive information',
        text: 'Beneficiary and member details need careful access and safe storage.',
      },
    ],
    help: [
      {
        need: 'Present your work credibly',
        text: 'A clear, accessible website that explains your mission and activities.',
        service: 'business-websites-and-landing-pages',
      },
      {
        need: 'Manage members, programmes and reports',
        text: 'A simple system for records and reporting.',
        service: 'custom-software-and-business-systems',
      },
      {
        need: 'Keep sensitive data safe',
        text: 'Practical security and safe-working habits for your team.',
        service: 'cybersecurity-and-digital-safety',
      },
      {
        need: 'Plan the move to digital',
        text: 'Advice on which processes to digitise first.',
        service: 'digital-transformation-and-systems-consulting',
      },
    ],
    steps: [
      {
        title: 'Listen to your mission',
        text: 'We learn who you serve and what you report on.',
      },
      {
        title: 'Map what you track',
        text: 'We list the records, reports and approvals you handle today.',
      },
      {
        title: 'Build in steps',
        text: 'We deliver the most useful piece first and expand from there.',
      },
      {
        title: 'Hand over',
        text: 'We document the work and train your team to run it.',
      },
    ],
    considerations: [
      'Decide who can see what before any data is entered.',
      'Keep reporting formats simple enough for the whole team.',
      'Plan for staff changes by documenting how things work.',
    ],
    faqs: [
      {
        q: 'Do you work with public bodies?',
        a: 'We can discuss it. [CONFIRM: any procurement or registration requirements Bentaz can meet]',
      },
      {
        q: 'Can you help with funder reporting?',
        a: 'We can build systems that collect the information you report on. We do not write reports or grant applications.',
      },
      {
        q: 'We have a small budget. Where do we start?',
        a: 'Usually with a clear website or one simple records tool. We will suggest the best first step after we hear your needs.',
      },
    ],
    related: ['smes-and-growing-businesses', 'schools-and-education'],
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
