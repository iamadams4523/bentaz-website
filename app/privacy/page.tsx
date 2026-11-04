import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/legal/LegalPage';
import {
  LEGAL_APPROVED,
  contactAddress,
  contactEmail,
  contactPhone,
} from '@/lib/legal';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Bentaz Tech Solutions Ltd. collects, uses and protects personal information on this website.',
  robots: LEGAL_APPROVED ? undefined : { index: false, follow: false },
};

const sections: LegalSection[] = [
  {
    heading: 'Who we are',
    blocks: [
      `${site.name} (RC ${site.rcNumber}) is a registered Nigerian company based in ${site.location}. We decide how and why personal information collected through this website is used, which makes us the data controller.`,
      `Contact: ${contactEmail} · ${contactPhone} · ${contactAddress}`,
    ],
  },
  {
    heading: 'Information we collect',
    blocks: [
      'We collect only what we need:',
      [
        'Enquiry form: your name, organisation (if given), email address and phone number, the service you are interested in, any budget or timeline you share, and your message.',
        'Messages you send us directly by email, phone or WhatsApp.',
        'AI Automation Lab: the business type, goal and other details you type into the demo. Please do not enter personal, confidential or sensitive information. [CONFIRM: whether these inputs are stored, and which AI provider processes them]',
        'Technical information, such as pages visited and device type, but only if you accept analytics. [CONFIRM: analytics tool and what it records]',
        'A preference stored in your browser (light or dark theme), which does not identify you.',
      ],
    ],
  },
  {
    heading: 'Why we use it',
    blocks: [
      'We use your information to:',
      [
        'Reply to your enquiry and discuss your needs, which we do with your consent and to take steps you ask for before any agreement.',
        'Send a confirmation that we received your message.',
        'Understand how the site is used and improve it, where you have accepted analytics.',
        'Meet legal and regulatory duties that apply to us.',
      ],
      'We do not sell your personal information, and we do not use it to send marketing unless you ask us to. [CONFIRM: whether any newsletter or marketing emails will be sent]',
    ],
  },
  {
    heading: 'Who we share it with',
    blocks: [
      'We use trusted providers to run the site and handle enquiries. They may process your information only to provide their service to us:',
      [
        'Email delivery provider, to deliver your enquiry to us and send your confirmation. [CONFIRM: provider, currently planned as Resend]',
        'Website hosting provider. [CONFIRM: provider]',
        'Analytics provider, only if you accept analytics. [CONFIRM: provider]',
        'AI service provider, for the AI Automation Lab demo. [CONFIRM: provider]',
      ],
      'We may also share information where the law requires it.',
    ],
  },
  {
    heading: 'Transfers outside Nigeria',
    blocks: [
      'Some providers store or process information outside Nigeria. Where that happens we take steps to make sure your information is protected to a standard consistent with Nigerian data protection law. [CONFIRM: safeguards used with each provider]',
    ],
  },
  {
    heading: 'How long we keep it',
    blocks: [
      'We keep enquiry details only as long as needed to deal with your request and any follow-up, and as long as the law requires. [CONFIRM: retention periods, for example how long enquiries are kept if no agreement follows]',
    ],
  },
  {
    heading: 'How we protect it',
    blocks: [
      'We use sensible technical and organisational measures, including secure connections, restricted access and keeping software up to date. No system is completely secure, so we cannot promise absolute security. If a breach affects your information, we will act as the law requires, including notifying the authorities and you where required.',
    ],
  },
  {
    heading: 'Your rights',
    blocks: [
      'Under the Nigeria Data Protection Act 2023, you have rights over your personal information. These include the right to:',
      [
        'Ask what information we hold about you and to receive a copy.',
        'Ask us to correct information that is wrong or incomplete.',
        'Ask us to delete your information, or to restrict how we use it, in the circumstances the law allows.',
        'Object to certain uses of your information.',
        'Withdraw your consent at any time. This does not affect what we did before you withdrew it.',
        'Ask for your information in a portable format where that applies.',
      ],
      `To use any of these rights, contact us at ${contactEmail}. If you are not satisfied with how we handle your information, you may complain to the Nigeria Data Protection Commission.`,
    ],
  },
  {
    heading: 'Cookies and similar technologies',
    blocks: [
      'Essential storage, such as remembering your theme choice, is always on. Analytics and other non-essential tracking are used only if you accept them in the cookie choice shown on the site. You can change your choice at any time. [CONFIRM: cookie list and banner wording once analytics is added]',
    ],
  },
  {
    heading: 'Children',
    blocks: [
      'This website is not aimed at children under 18, and we do not knowingly collect their personal information. If you believe a child has sent us information, contact us and we will delete it.',
    ],
  },
  {
    heading: 'Changes to this policy',
    blocks: [
      'We may update this policy. The date at the top shows when it last changed. Significant changes will be made clear on the site.',
    ],
  },
  {
    heading: 'Contact us',
    blocks: [
      `Questions about privacy? Write to ${site.name} at ${contactEmail}, or call ${contactPhone}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This policy explains what personal information we collect through this website, why we collect it, who sees it and the choices you have."
      sections={sections}
    />
  );
}
