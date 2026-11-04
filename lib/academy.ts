import type { IconName } from '@/components/ui/Icon';

/**
 * Draft copy for the owner's approval (brief, section 7).
 * No invented fees, dates, certificates, pass rates, instructors or learner numbers.
 * Course topics are indicative only: the owner confirms the real course outlines.
 */

export const academyAudiences = [
  {
    title: 'Students',
    text: 'Build skills that employers and universities ask for, with practice on real tasks.',
    icon: 'academy' as IconName,
  },
  {
    title: 'Working professionals',
    text: 'Learn the tools your job now expects, at a pace that fits around work.',
    icon: 'building' as IconName,
  },
  {
    title: 'Business owners',
    text: 'Understand the tools you are paying for so you can use them well and judge advice.',
    icon: 'chart' as IconName,
  },
  {
    title: 'Teams and organisations',
    text: 'Training shaped around the tools your team uses every day.',
    icon: 'institution' as IconName,
  },
];

export const academyFormats = [
  {
    title: 'Individual learning',
    text: 'One person, working through a course at their own pace with guidance. [CONFIRM: whether one-to-one sessions are offered]',
  },
  {
    title: 'Group classes',
    text: 'A small group learning the same course together. [CONFIRM: class size, schedule and delivery: online, in person or both]',
  },
  {
    title: 'Team training',
    text: "A session or short programme built around your organisation's tools and tasks. [CONFIRM: on-site and online availability]",
  },
  {
    title: 'Workshops',
    text: 'A focused session on a single topic, such as getting started with AI tools. [CONFIRM: whether workshops are offered and how often]',
  },
];

export const academyCourses: {
  title: string;
  icon: IconName;
  text: string;
  topics: string[];
}[] = [
  {
    title: 'Digital skills',
    icon: 'transform',
    text: 'The everyday skills that make modern work easier.',
    topics: [
      'Email, calendars and shared documents',
      'Working with spreadsheets',
      'Safe use of online tools',
      'Organising files and information',
    ],
  },
  {
    title: 'AI and automation basics',
    icon: 'ai',
    text: 'What AI tools can and cannot do, and how to use them with care.',
    topics: [
      'Using AI assistants well',
      'Checking AI output before you rely on it',
      'Simple workflow automation',
      'Choosing a first task to automate',
    ],
  },
  {
    title: 'Websites and digital marketing',
    icon: 'web',
    text: 'How websites and online promotion work for a business.',
    topics: [
      'What a good business website includes',
      'Search visibility basics',
      'Social media for business',
      'Measuring what works',
    ],
  },
  {
    title: 'Cybersecurity awareness',
    icon: 'shield',
    text: 'Habits that keep people, accounts and data safer.',
    topics: [
      'Passwords and two-step verification',
      'Spotting phishing messages',
      'Safe device and Wi-Fi use',
      'What to do when something goes wrong',
    ],
  },
  {
    title: 'IT fundamentals',
    icon: 'server',
    text: 'How computers, networks and common systems fit together.',
    topics: [
      'Computers and operating systems',
      'Networks and Wi-Fi basics',
      'Troubleshooting common problems',
      'Backups and updates',
    ],
  },
  {
    title: 'Software and tools',
    icon: 'code',
    text: 'Getting comfortable with the software your work depends on.',
    topics: [
      'Choosing business software',
      'Getting started with common office and design tools',
      'Introduction to how software is built',
      'Working with data in simple tools',
    ],
  },
];

export const academySteps = [
  {
    title: 'Tell us what you want to learn',
    text: 'Send an enquiry with your goal, your experience and whether it is for you or a team.',
  },
  {
    title: 'We suggest a format',
    text: 'We recommend a course and format that fits, and confirm details directly with you.',
  },
  {
    title: 'Learn by doing',
    text: 'Sessions focus on doing the task, not only hearing about it.',
  },
  {
    title: 'Apply it to your own work',
    text: 'You practise on tasks from your real study or job so the skill sticks.',
  },
];

export const academyFaqs = [
  {
    q: 'How do I register?',
    a: 'Send an enquiry through the Contact page or WhatsApp. We will confirm course details, dates and next steps with you directly.',
  },
  {
    q: 'Do I need any experience?',
    a: 'Not for the beginner courses. Tell us your starting point and we will suggest a suitable level.',
  },
  {
    q: 'Are there fixed dates and fees?',
    a: '[CONFIRM: schedule, delivery format and fees. Do not publish figures until the owner approves them.]',
  },
  {
    q: 'Will I get a certificate?',
    a: '[CONFIRM: whether certificates are issued, what they certify and whether they can be verified.]',
  },
  {
    q: 'Can you train our whole team?',
    a: 'Yes, team training can be shaped around the tools your organisation uses. [CONFIRM: minimum group size and location options]',
  },
  {
    q: 'Is the training online or in person?',
    a: '[CONFIRM: delivery options and location.]',
  },
];
