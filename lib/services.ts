import type { IconName } from '@/components/ui/Icon';

/**
 * Draft copy for the owner's approval (brief, section 7).
 * Rules followed: no invented statistics, prices, timelines, clients or guarantees.
 * Anything only the owner can state is marked [CONFIRM].
 */

export type Service = {
  slug: string;
  title: string;
  summary: string;
  icon: IconName;
  /** SEO meta description for the service page (kept under about 160 characters). */
  metaDescription: string;
  glance: { bestFor: string; youGet: string; startsWith: string };
  problem: { heading: string; body: string };
  gets: string[];
  steps: { title: string; text: string }[];
  suits: string[];
  faqs: { q: string; a: string }[];
  /** Slugs of related services. */
  related: string[];
  /** Overrides the default "Request a Consultation" button. */
  primaryCta?: { label: string; href: string };
};

export const services: Service[] = [
  {
    slug: 'business-websites-and-landing-pages',
    title: 'Business websites and landing pages',
    summary: 'Fast, clear websites that build trust and bring in enquiries.',
    icon: 'web',
    metaDescription:
      'Business websites and landing pages from Bentaz Tech Solutions Ltd. in Abuja: clear, fast and built to turn visitors into enquiries.',
    glance: {
      bestFor: 'Businesses that need to be found and trusted online',
      youGet: 'A fast, clear site with a way to enquire',
      startsWith: 'A conversation about your goals',
    },
    problem: {
      heading: 'Visitors arrive, then leave without getting in touch',
      body: 'A website that is slow, confusing on a phone or vague about what you offer loses people in seconds. Many businesses also have no clear way to enquire, so interest never turns into a conversation.',
    },
    gets: [
      'A site that reads clearly on phones and computers',
      'Pages that explain each service in plain language',
      'An enquiry form and WhatsApp button where they matter',
      'Basic search visibility set up from the start',
    ],
    steps: [
      {
        title: 'Talk',
        text: 'We learn about your business, your customers and what you want the site to do.',
      },
      {
        title: 'Plan',
        text: 'We agree the pages and the wording before any design work starts.',
      },
      {
        title: 'Design and build',
        text: 'You review the design and a working preview before launch.',
      },
      {
        title: 'Launch and hand over',
        text: 'We publish the site and show you how to keep it up to date.',
      },
    ],
    suits: [
      'Businesses with no website yet',
      'Owners with an outdated site',
      'Schools and organisations',
      'Anyone running a campaign or event',
    ],
    faqs: [
      {
        q: 'What is the difference between a website and a landing page?',
        a: 'A website has several pages that cover your whole business. A landing page is one focused page built for a single offer or campaign, with one clear action.',
      },
      {
        q: 'Will it work well on phones?',
        a: 'Yes. Every page is designed to read and work well on a phone, because many visitors browse that way.',
      },
      {
        q: 'Will the website be registered in my name?',
        a: 'Your domain and accounts should be registered in your name. [CONFIRM: handover and ownership terms.]',
      },
    ],
    related: [
      'digital-marketing-and-seo',
      'ai-and-business-automation',
      'custom-software-and-business-systems',
    ],
  },
  {
    slug: 'custom-software-and-business-systems',
    title: 'Custom software and business systems',
    summary: 'Tools shaped around how your business really works.',
    icon: 'code',
    metaDescription:
      'Custom software and business systems from Bentaz Tech Solutions Ltd.: tools built around how your business works, for teams outgrowing spreadsheets.',
    glance: {
      bestFor: 'Teams whose process does not fit ready-made tools',
      youGet: 'A working system, documented for your team',
      startsWith: 'Mapping how work moves today',
    },
    problem: {
      heading: 'Spreadsheets and chat threads stop keeping up',
      body: 'As a business grows, orders, customers and records spread across spreadsheets, notebooks and messages. Information gets lost, work is repeated, and only one person knows how things really run.',
    },
    gets: [
      'A system built around your actual process',
      'Access for the right people, with different permissions',
      'Reports that show what is happening without manual counting',
      'Documentation and a walkthrough for your team',
    ],
    steps: [
      {
        title: 'Map',
        text: 'We study how work moves through your business today and where it gets stuck.',
      },
      {
        title: 'Choose a first step',
        text: 'We agree the most useful part to build first.',
      },
      {
        title: 'Build in stages',
        text: 'You try each stage and tell us what to change before we continue.',
      },
      {
        title: 'Launch and refine',
        text: 'We train your team, then improve the system as you use it.',
      },
    ],
    suits: [
      'Businesses outgrowing spreadsheets',
      'Schools and clinics managing records',
      'Shops and distributors tracking stock and orders',
      'Organisations with a process no ready-made tool fits',
    ],
    faqs: [
      {
        q: 'When is custom software better than ready-made tools?',
        a: 'When your process is specific enough that ready-made tools force workarounds, or when you need several tools to work together. If an existing tool fits well, we will say so.',
      },
      {
        q: 'Can it start small?',
        a: 'Yes. We usually recommend building the most useful part first, using it, and then adding to it.',
      },
      {
        q: 'Who owns the software?',
        a: '[CONFIRM: ownership, licensing and source code terms.]',
      },
    ],
    related: [
      'digital-transformation-and-systems-consulting',
      'ai-and-business-automation',
      'mobile-applications',
    ],
  },
  {
    slug: 'ai-and-business-automation',
    title: 'AI and business automation',
    summary:
      'Take repetitive work off your team with automations that keep running.',
    icon: 'ai',
    metaDescription:
      'AI and business automation from Bentaz Tech Solutions Ltd.: automations that handle repetitive work such as enquiries, reminders and reports.',
    glance: {
      bestFor: 'Teams buried in repeat tasks',
      youGet: 'Working automations, documented',
      startsWith: 'A conversation about your workflow',
    },
    problem: {
      heading: 'Too much time goes on work a system could do',
      body: 'Replying to the same questions, copying details between tools, chasing reminders and building weekly reports all take hours that could go to customers. Mistakes creep in and enquiries wait until someone is free.',
    },
    gets: [
      'A short map of which tasks are worth automating first',
      'Working automations connected to the tools you already use',
      'Clear limits on what any AI feature will and will not do',
      'Documentation and a walkthrough for your team',
    ],
    steps: [
      {
        title: 'Map the workflow',
        text: 'We look at how work moves through your team and where time is lost.',
      },
      {
        title: 'Pick what to automate',
        text: 'We choose a few tasks that are repetitive, frequent and low risk.',
      },
      {
        title: 'Build and test',
        text: 'We build the automations and test them with real cases.',
      },
      {
        title: 'Hand over',
        text: 'We document everything and show your team how it works.',
      },
    ],
    suits: [
      'Owner-run businesses',
      'Schools and NGOs',
      'Professional practices',
      'Retail and logistics',
      'Teams using WhatsApp and spreadsheets',
    ],
    faqs: [
      {
        q: 'Do I need to change the tools I already use?',
        a: 'Usually not. Most automations connect the tools you already have, such as forms, spreadsheets, email and WhatsApp.',
      },
      {
        q: 'Will AI make decisions without me?',
        a: 'Only where you choose. We design a review step for anything important, and AI features are kept to clearly defined tasks.',
      },
      {
        q: 'Can you tell me what it will cost before I commit?',
        a: 'Yes. After we understand your workflow we put scope and cost in writing before work begins.',
      },
    ],
    related: [
      'custom-software-and-business-systems',
      'digital-transformation-and-systems-consulting',
      'bentaz-tech-academy',
    ],
  },
  {
    slug: 'cybersecurity-and-digital-safety',
    title: 'Cybersecurity and digital safety',
    summary: 'Protect accounts, data and customers from everyday threats.',
    icon: 'shield',
    metaDescription:
      'Cybersecurity and digital safety from Bentaz Tech Solutions Ltd.: practical reviews, fixes and staff guidance that protect accounts, data and customers.',
    glance: {
      bestFor: 'Businesses that hold customer or member details',
      youGet: 'A prioritised list of fixes and practical set-up',
      startsWith: 'A review of accounts, devices and access',
    },
    problem: {
      heading: 'One weak password can stop a business',
      body: 'Shared passwords, unpatched devices and a single email scam can expose customer data or lock a team out of its own accounts. Most incidents start with ordinary habits, not advanced attacks.',
    },
    gets: [
      'A review of your accounts, devices and who has access',
      'A short, prioritised list of what to fix first',
      'Practical set-up such as multi-factor sign-in and backups',
      'Simple staff guidance on scams and safe habits',
    ],
    steps: [
      {
        title: 'Review',
        text: 'We look at what you have and who can reach it.',
      },
      {
        title: 'Rank the risks',
        text: 'We explain the risks in plain language and put them in order.',
      },
      {
        title: 'Fix the gaps',
        text: 'We close the most important gaps first.',
      },
      {
        title: 'Agree habits and a plan',
        text: 'We agree day-to-day habits and what to do if something goes wrong.',
      },
    ],
    suits: [
      'Businesses holding customer details',
      'Schools and NGOs with student or member records',
      'Teams that share accounts and passwords',
      'Owners who have already had a scare',
    ],
    faqs: [
      {
        q: 'Can you guarantee we will never be hacked?',
        a: 'No one can. The aim is to make an incident much less likely and to limit the damage if one happens.',
      },
      {
        q: 'Do you only help before something goes wrong?',
        a: 'We focus on prevention. If something has already happened, contact us and we will advise on next steps.',
      },
      {
        q: 'Will this slow my team down?',
        a: 'Good security should be simple enough to use every day. We choose measures your team can keep up.',
      },
    ],
    related: [
      'it-infrastructure-and-managed-it-support',
      'digital-transformation-and-systems-consulting',
      'bentaz-tech-academy',
    ],
  },
  {
    slug: 'it-infrastructure-and-managed-it-support',
    title: 'IT infrastructure and managed IT support',
    summary: 'Networks, devices and support that keep your team working.',
    icon: 'server',
    metaDescription:
      'IT infrastructure and managed IT support from Bentaz Tech Solutions Ltd.: networks, devices and ongoing support that keep your team working.',
    glance: {
      bestFor: 'Offices and growing teams with no IT person',
      youGet: 'A set-up that works and support when it does not',
      startsWith: 'Taking stock of what you have',
    },
    problem: {
      heading: 'When IT breaks, work stops',
      body: 'Slow networks, failing devices and unclear ownership of who fixes what cost small teams hours every week. Problems get patched instead of solved, and nobody has a full picture of what you own.',
    },
    gets: [
      'A clear list of your devices, accounts and network',
      'Set-up of networks, devices and shared tools',
      'Ongoing support so every problem has an owner',
      'Advice before you buy hardware or software',
    ],
    steps: [
      {
        title: 'Take stock',
        text: 'We record what you have and how it is connected.',
      },
      {
        title: 'Fix what slows people down',
        text: 'We deal with the problems your team feels most.',
      },
      {
        title: 'Set up support',
        text: 'We agree how to ask for help and who responds.',
      },
      {
        title: 'Review and plan',
        text: 'We check in regularly and plan upgrades before they become emergencies.',
      },
    ],
    suits: [
      'Offices and shops with several computers',
      'Schools and clinics',
      'Growing teams with no IT person',
      'Businesses moving to a new location',
    ],
    faqs: [
      {
        q: 'What does managed IT support mean?',
        a: 'It means we look after your IT on an agreed basis instead of only when something breaks. [CONFIRM: what is covered, support hours and how requests are made.]',
      },
      {
        q: 'Do you work on site?',
        a: '[CONFIRM: on-site coverage and service area.] Many issues can be handled remotely.',
      },
      {
        q: 'Can you advise me before I buy equipment?',
        a: 'Yes. Getting advice before you buy helps you avoid equipment that does not fit your needs.',
      },
    ],
    related: [
      'cybersecurity-and-digital-safety',
      'digital-transformation-and-systems-consulting',
      'custom-software-and-business-systems',
    ],
  },
  {
    slug: 'digital-transformation-and-systems-consulting',
    title: 'Digital transformation and systems consulting',
    summary:
      'A clear plan for moving from paper and guesswork to reliable systems.',
    icon: 'transform',
    metaDescription:
      'Digital transformation and systems consulting from Bentaz Tech Solutions Ltd.: a clear, ordered plan for moving your organisation onto reliable systems.',
    glance: {
      bestFor: 'Organisations unsure what to change first',
      youGet: 'A short, ordered plan you can act on',
      startsWith: 'Listening and observing how work happens',
    },
    problem: {
      heading: 'Moving off paper and guesswork is hard to start',
      body: 'Many organisations know their processes are slow but are not sure what to change first, which tools to choose or how to bring staff along. Buying software without a plan often adds to the mess.',
    },
    gets: [
      'A map of how your work flows today',
      'A short plan that says what to change and in what order',
      'Honest advice on which tools to use, build or avoid',
      'Help introducing the change to your team',
    ],
    steps: [
      {
        title: 'Listen and observe',
        text: 'We talk to the people who do the work, not only the people who manage it.',
      },
      {
        title: 'Map the process',
        text: 'We draw how work flows and mark the bottlenecks.',
      },
      {
        title: 'Agree a plan',
        text: 'We put the changes in priority order and keep the plan short.',
      },
      {
        title: 'Support the first steps',
        text: 'We help your team start, so the plan does not stay on paper.',
      },
    ],
    suits: [
      'Organisations still running on paper',
      'Leaders unsure which tool to choose',
      'Teams that bought software nobody uses',
      'Public bodies and associations modernising records',
    ],
    faqs: [
      {
        q: 'Do I have to buy new software?',
        a: 'Not necessarily. Sometimes the best change is to use an existing tool better. We will tell you if that is the case.',
      },
      {
        q: 'How long does a consulting engagement take?',
        a: 'It depends on the size of the organisation and what you want to look at. [CONFIRM: typical engagement format.]',
      },
      {
        q: 'Will you also build what you recommend?',
        a: 'We can, if you want us to. The plan is yours either way.',
      },
    ],
    related: [
      'custom-software-and-business-systems',
      'ai-and-business-automation',
      'it-infrastructure-and-managed-it-support',
    ],
  },
  {
    slug: 'digital-marketing-and-seo',
    title: 'Digital marketing and SEO',
    summary: 'Be found by the people searching for what you offer.',
    icon: 'chart',
    metaDescription:
      'Digital marketing and SEO from Bentaz Tech Solutions Ltd.: sound search practice, clear content and consistent listings so customers can find you.',
    glance: {
      bestFor: 'Businesses that want more of the right enquiries',
      youGet: 'Better visibility built on sound practice',
      startsWith: 'A check of how visible you are today',
    },
    problem: {
      heading: 'Good businesses are hard to find online',
      body: 'Customers search for what you offer, but if your website is slow, unclear or missing from the places they look, they find someone else. Posting without a plan rarely brings steady enquiries.',
    },
    gets: [
      'A check of how visible you are today',
      'Search-friendly pages with clear titles and descriptions',
      'Business listings set up and kept consistent',
      'A simple content plan based on what customers ask',
    ],
    steps: [
      {
        title: 'Check',
        text: 'We look at your site, your listings and what customers search for.',
      },
      {
        title: 'Fix the basics',
        text: 'We correct the technical and wording problems that hold your pages back.',
      },
      {
        title: 'Create useful content',
        text: 'We write and publish pages and articles that answer real questions.',
      },
      {
        title: 'Measure and adjust',
        text: 'We track what changes and adjust the plan.',
      },
    ],
    suits: [
      'Local businesses wanting more enquiries',
      'Owners whose site gets little traffic',
      'Schools and organisations',
      'Businesses launching a new service',
    ],
    faqs: [
      {
        q: 'Can you guarantee first place on Google?',
        a: 'No. No one can guarantee rankings. We follow sound practice and measure what changes.',
      },
      {
        q: 'How long does SEO take?',
        a: 'It usually takes months to see steady results, and it depends on competition and where you start.',
      },
      {
        q: 'Do you also write the content?',
        a: 'Yes, where it is useful. Every fact is checked and we avoid thin or copied text.',
      },
    ],
    related: [
      'business-websites-and-landing-pages',
      'ai-and-business-automation',
      'bentaz-tech-academy',
    ],
  },
  {
    slug: 'mobile-applications',
    title: 'Mobile applications',
    summary: 'Android and iOS apps your customers or staff will use.',
    icon: 'mobile',
    metaDescription:
      'Mobile applications from Bentaz Tech Solutions Ltd.: Android and iOS apps for customers or staff, planned carefully and tested on real phones.',
    glance: {
      bestFor: 'Daily tasks that suit a phone better than a browser',
      youGet: 'An app planned, built and tested with real users',
      startsWith: 'Deciding whether you need an app at all',
    },
    problem: {
      heading: 'Some jobs need an app, not a website',
      body: 'If customers or staff do the same task every day, such as booking, ordering, tracking or reporting from the field, an app can make it faster than a web page. It is also a bigger commitment, so it should be planned carefully.',
    },
    gets: [
      'Advice on whether you need an app, a web app or neither',
      'Screens designed and tested on real phones',
      'An app for Android, iOS or both, as your plan requires',
      'Help getting the app published in the app stores',
    ],
    steps: [
      {
        title: 'Define',
        text: 'We agree who will use the app and what they need to do.',
      },
      {
        title: 'Design',
        text: 'We design the screens and the flow, and you try them before we build.',
      },
      {
        title: 'Build and test',
        text: 'We build in stages and test with real users.',
      },
      {
        title: 'Publish and improve',
        text: 'We help you publish and then improve it from real use.',
      },
    ],
    suits: [
      'Businesses whose customers order or book often',
      'Field teams who record work on the go',
      'Organisations with members or students to keep informed',
      'Founders testing an idea',
    ],
    faqs: [
      {
        q: 'Do I need an app or will a website do?',
        a: 'Often a well-built website or web app is enough. We will tell you plainly if an app is not worth building yet.',
      },
      {
        q: 'Should it be Android, iOS or both?',
        a: 'It depends on who your users are and your budget. We help you choose where to start.',
      },
      {
        q: 'What about app store rules and fees?',
        a: 'App stores have their own requirements and charges. [CONFIRM: what Bentaz handles and what the client pays for.]',
      },
    ],
    related: [
      'custom-software-and-business-systems',
      'business-websites-and-landing-pages',
      'digital-transformation-and-systems-consulting',
    ],
  },
  {
    slug: 'bentaz-tech-academy',
    title: 'Bentaz Tech Academy',
    summary: 'Training in digital skills for students and professionals.',
    icon: 'academy',
    metaDescription:
      'Bentaz Tech Academy: practical digital skills training for students, professionals and teams, from digital basics to AI and automation.',
    glance: {
      bestFor: 'Students, professionals and teams',
      youGet: 'Hands-on training built around real tasks',
      startsWith: 'Telling us what you want to learn',
    },
    problem: {
      heading: 'Technology moves faster than most people can learn it alone',
      body: 'Students and working professionals want practical skills but find courses that are too theoretical or too general. Teams adopt new tools and then struggle to use them well.',
    },
    gets: [
      'Hands-on sessions built around real tasks',
      'Courses from digital basics to AI and automation',
      'Group training shaped around your tools',
      'Clear guidance on what each course covers',
    ],
    steps: [
      { title: 'Tell us', text: 'Tell us what you want to learn and why.' },
      {
        title: 'Choose a format',
        text: 'We suggest the format that fits you or your team.',
      },
      {
        title: 'Learn by doing',
        text: 'Sessions focus on doing the task, not only hearing about it.',
      },
      {
        title: 'Apply it',
        text: 'You practise on your own work so the skill sticks.',
      },
    ],
    suits: [
      'Students',
      'Working professionals',
      'Teams and organisations',
      'Business owners',
    ],
    faqs: [
      {
        q: 'How do I register?',
        a: 'Send an enquiry through the Academy page. We will confirm course details directly with you.',
      },
      {
        q: 'Are there fixed dates and fees?',
        a: '[CONFIRM: schedule, delivery format and fees.]',
      },
      {
        q: 'Can you train my team on the tools we use?',
        a: "We can shape group sessions around your team's tools. [CONFIRM.]",
      },
    ],
    related: [
      'ai-and-business-automation',
      'cybersecurity-and-digital-safety',
      'digital-marketing-and-seo',
    ],
    primaryCta: { label: 'Enquire about training', href: '/academy' },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
