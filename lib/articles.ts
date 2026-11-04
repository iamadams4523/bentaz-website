import type { Service } from '@/lib/services';

/**
 * Launch articles: drafts for the owner's approval (brief, section 7).
 * Rules followed: no invented statistics, clients or case studies; every claim is general, practical advice.
 * Items only the owner can state are marked [CONFIRM]. Replace with CMS or MDX content in the backend phase.
 */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'note'; text: string };

export type Category = { slug: string; name: string };

export const categories: Category[] = [
  {
    slug: 'business-technology-and-systems',
    name: 'Business technology and systems',
  },
  { slug: 'practical-ai-and-automation', name: 'Practical AI and automation' },
  {
    slug: 'websites-and-lead-generation',
    name: 'Websites and lead generation',
  },
  {
    slug: 'cybersecurity-and-digital-safety',
    name: 'Cybersecurity and digital safety',
  },
  { slug: 'it-tips', name: 'IT tips' },
  { slug: 'software-and-tools', name: 'Software and tools' },
  { slug: 'digital-skills-and-training', name: 'Digital skills and training' },
  { slug: 'project-stories', name: 'Project stories' },
];

export type Article = {
  slug: string;
  title: string;
  /** Under about 160 characters; also used as the meta description. */
  summary: string;
  category: Category['slug'];
  /** [CONFIRM] named author and role. */
  author: string;
  /** ISO dates. */
  publishedOn: string;
  updatedOn?: string;
  /** The service this article leads to as its next step. */
  service: Service['slug'];
  /** Credible sources, when the article relies on any. Empty means general practical advice only. */
  sources?: { title: string; url: string }[];
  published: boolean;
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: 'what-to-automate-first-in-a-small-business',
    title: 'What to automate first in a small business',
    summary:
      'Start with tasks that repeat often, follow clear rules and carry little risk. Here is how to pick your first one and how to keep it safe.',
    category: 'practical-ai-and-automation',
    author: 'Bentaz Tech team',
    publishedOn: '2026-11-03',
    service: 'ai-and-business-automation',
    published: true,
    body: [
      {
        type: 'p',
        text: 'Most small businesses do not need a grand automation plan. They need one repeated task to stop eating their week. The trick is choosing that first task well, because a good first win builds confidence and a bad one makes people distrust the whole idea.',
      },
      { type: 'h2', text: 'Look for tasks with three qualities' },
      {
        type: 'ul',
        items: [
          'It repeats often: daily or weekly, not once a year.',
          'It follows clear rules: the same input leads to the same action each time.',
          'It carries low risk: a mistake is easy to spot and cheap to fix.',
        ],
      },
      {
        type: 'p',
        text: 'Sending a confirmation message after an enquiry, copying order details into a sheet, or reminding a customer about an unpaid invoice all fit. Deciding whether to give a customer credit does not, because it needs judgement.',
      },
      { type: 'h2', text: 'Good first candidates' },
      {
        type: 'ul',
        items: [
          'Acknowledging new enquiries with a short, honest reply and a promise of when someone will follow up.',
          'Logging form submissions and messages into one place instead of several chat threads.',
          'Appointment or delivery reminders.',
          'Weekly summaries pulled from data you already keep, such as sales or stock counts.',
          'Routing a message to the right person based on a simple choice the customer makes.',
        ],
      },
      { type: 'h2', text: 'Where AI helps, and where it does not' },
      {
        type: 'p',
        text: 'Automation follows rules you write. AI can help with tasks that are messy, such as drafting a reply, summarising a long message or sorting free-text requests. It can also be wrong. Use it to prepare work for a person to check, not to send things to customers unseen, until you have tested it on real examples.',
      },
      {
        type: 'note',
        text: 'A useful rule: let automation do the boring steps and let people keep the decisions.',
      },
      { type: 'h2', text: 'A simple way to choose' },
      {
        type: 'ol',
        items: [
          'List the tasks your team repeats every week.',
          'Write next to each one roughly how long it takes and who does it.',
          'Cross out anything that needs judgement or touches money or sensitive data.',
          'Pick the one that is most repetitive and easiest to explain in two sentences.',
          'Run it by hand for a week, writing down each step. If you cannot describe the steps, it is not ready to automate.',
        ],
      },
      { type: 'h2', text: 'Keep it safe' },
      {
        type: 'ul',
        items: [
          'Start small and test with a few real cases before switching it on for everyone.',
          'Make sure a person can see what the automation did and undo it.',
          'Keep customer and staff data to the minimum the task needs.',
          'Name an owner. Someone should be responsible when it breaks.',
        ],
      },
      { type: 'h2', text: 'What comes next' },
      {
        type: 'p',
        text: 'Once your first automation is running reliably, the next one is easier to choose because you already know how your team works with it. If you would like help picking and building that first step, we can look at your process with you.',
      },
    ],
  },
  {
    slug: 'a-simple-security-checklist-for-growing-companies',
    title: 'A simple security checklist for growing companies',
    summary:
      'Six everyday habits that close the most common doors: accounts, updates, backups, access, devices and people.',
    category: 'cybersecurity-and-digital-safety',
    author: 'Bentaz Tech team',
    publishedOn: '2026-11-03',
    service: 'cybersecurity-and-digital-safety',
    published: true,
    body: [
      {
        type: 'p',
        text: 'You do not need a security department to be safer. Most everyday problems come from a handful of habits that are easy to fix and easy to forget. This checklist is meant for a growing team that wants a sensible starting point.',
      },
      { type: 'h2', text: '1. Protect accounts' },
      {
        type: 'ul',
        items: [
          'Turn on two-step verification for email, banking, social media and any system that holds customer data. Start with email, because it can reset everything else.',
          'Use a password manager so every account has a long, different password.',
          'Never share one login between several people. Give each person their own.',
        ],
      },
      { type: 'h2', text: '2. Keep software updated' },
      {
        type: 'p',
        text: 'Updates often fix known weaknesses. Switch on automatic updates for computers, phones, browsers and your website platform, and replace anything that no longer receives updates.',
      },
      { type: 'h2', text: '3. Back up what you cannot lose' },
      {
        type: 'ul',
        items: [
          'Decide what you cannot afford to lose: customer records, accounts, contracts, your website.',
          'Keep more than one copy, and keep at least one copy somewhere other than your office.',
          'Test a restore now and then. A backup you have never restored is only a hope.',
        ],
      },
      { type: 'h2', text: '4. Give people only the access they need' },
      {
        type: 'p',
        text: 'A new team member rarely needs access to everything. Give access for the job, review it when roles change and remove it on the day someone leaves.',
      },
      { type: 'h2', text: '5. Secure your devices and network' },
      {
        type: 'ul',
        items: [
          'Lock screens when away from the desk.',
          'Change default passwords on routers and other equipment.',
          'Use a separate Wi-Fi network for visitors.',
          'Keep a simple list of company devices so you know what to recover if one is lost.',
        ],
      },
      { type: 'h2', text: '6. Prepare your people' },
      {
        type: 'p',
        text: 'Many attacks begin with a convincing message. Teach the team to pause before clicking links, opening unexpected attachments or acting on urgent requests for payment or passwords. Make it normal to check with a colleague first, and agree who to tell when something looks wrong.',
      },
      {
        type: 'note',
        text: 'If something does go wrong, change passwords from a clean device, tell the people involved and write down what happened. Early, calm action limits the damage.',
      },
      { type: 'h2', text: 'Where to go from here' },
      {
        type: 'p',
        text: 'Pick the two items you are weakest on and fix those this week. If you would like a second pair of eyes on your set-up, we can walk through it with you and suggest a sensible order of work.',
      },
    ],
  },
  {
    slug: 'why-your-website-is-not-producing-enquiries',
    title: 'Why your website is not producing enquiries',
    summary:
      'Visitors usually leave for simple reasons: unclear offer, no obvious next step, slow pages, or too little to trust. Here is how to check each one.',
    category: 'websites-and-lead-generation',
    author: 'Bentaz Tech team',
    publishedOn: '2026-11-03',
    service: 'business-websites-and-landing-pages',
    published: true,
    body: [
      {
        type: 'p',
        text: 'A website can look good and still bring in no enquiries. When that happens, the cause is usually one of a few fixable things. Walk through the checks below, ideally on your phone, because many of your visitors will be on one.',
      },
      { type: 'h2', text: '1. It is not clear what you offer' },
      {
        type: 'p',
        text: 'A visitor should understand within a few seconds what you do, who it is for and where you work. If your first screen is a slogan or a stock photo, say it plainly instead.',
      },
      { type: 'h2', text: '2. There is no obvious next step' },
      {
        type: 'ul',
        items: [
          'Put one clear action near the top, such as a call, a WhatsApp message or a short enquiry form.',
          'Repeat it at the end of each page.',
          "Make sure the button says what happens next, for example 'Request a quote' rather than 'Submit'.",
        ],
      },
      { type: 'h2', text: '3. The page is slow or awkward on a phone' },
      {
        type: 'p',
        text: 'Open your site on a mobile phone on a normal connection. If pages take long to appear, text is tiny or buttons are hard to tap, people will leave. Compress large images and remove anything you do not need.',
      },
      { type: 'h2', text: '4. There is not enough to trust' },
      {
        type: 'ul',
        items: [
          'Show who you are: your registered name, location and real contact details.',
          'Explain how you work and what a customer can expect.',
          'Use real photos and real, approved examples of your work, not borrowed ones.',
          'Only publish testimonials that are genuine and used with permission.',
        ],
      },
      { type: 'h2', text: '5. The form is a hurdle' },
      {
        type: 'p',
        text: 'Long forms put people off. Ask for the minimum: a name, a way to reach them and a short message. Test the form yourself, and make sure the message actually reaches someone who replies.',
      },
      { type: 'h2', text: '6. Nobody can find the page' },
      {
        type: 'p',
        text: 'If people are not arriving at all, the problem is visibility rather than conversion. Give each service its own page with a clear title and description, and make sure your business appears in local listings with the same details everywhere.',
      },
      {
        type: 'note',
        text: 'Check one thing at a time. If you change everything at once you will not know what helped.',
      },
      { type: 'h2', text: 'A quick test' },
      {
        type: 'p',
        text: 'Ask someone who does not know your business to look at your home page for ten seconds and tell you what you do and what they would click next. Their answer will usually point to the first thing to fix.',
      },
    ],
  },
];

export function getPublishedArticles() {
  return articles
    .filter((a) => a.published)
    .sort((a, b) => b.publishedOn.localeCompare(a.publishedOn));
}

export function getArticle(slug: string) {
  return getPublishedArticles().find((a) => a.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function readingMinutes(a: Article) {
  const words = a.body
    .map((b) => ('text' in b ? b.text : b.items.join(' ')))
    .join(' ')
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function relatedArticles(a: Article, limit = 3) {
  const others = getPublishedArticles().filter((x) => x.slug !== a.slug);
  const same = others.filter((x) => x.category === a.category);
  return [...same, ...others.filter((x) => x.category !== a.category)].slice(
    0,
    limit,
  );
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      });
}
