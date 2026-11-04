import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/legal/LegalPage';
import { LEGAL_APPROVED, contactEmail } from '@/lib/legal';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'The terms for using the Bentaz Tech Solutions Ltd. website.',
  robots: LEGAL_APPROVED ? undefined : { index: false, follow: false },
};

const sections: LegalSection[] = [
  {
    heading: 'About these terms',
    blocks: [
      `These terms apply to your use of this website, which is operated by ${site.name} (RC ${site.rcNumber}), ${site.location}. By using the site you agree to them. If you do not agree, please do not use the site.`,
    ],
  },
  {
    heading: 'What the website is for',
    blocks: [
      'The website provides information about our company, services, training and articles. It is not an offer that can be accepted by clicking a button. Any work we do for you is covered by a separate written proposal or agreement.',
    ],
  },
  {
    heading: 'Enquiries and quotes',
    blocks: [
      'Sending an enquiry does not create a contract. Estimates we give are based on the information you provide and may change if the scope changes. Prices, timelines and what is included are confirmed in writing before work starts. [CONFIRM: how quotes and deposits work]',
    ],
  },
  {
    heading: 'Our services and training',
    blocks: [
      'Service descriptions on this site are summaries. The detailed scope, deliverables, payment terms and ownership of work are set out in the agreement we make with you. Training at Bentaz Tech Academy is subject to the course details confirmed when you enrol. [CONFIRM: ownership, support and handover terms; course fees, schedule and refund terms]',
    ],
  },
  {
    heading: 'Information on the site',
    blocks: [
      'We work to keep the content accurate and up to date, but we do not promise that it is complete or error-free. Articles give general information, not legal, financial or professional advice for your particular situation.',
    ],
  },
  {
    heading: 'AI Automation Lab',
    blocks: [
      'The AI Automation Lab shows example automation ideas generated from the details you enter. The results are illustrations, may contain mistakes and are not a guarantee of what can be built, how it will perform or what it will cost. Please do not enter personal, confidential or sensitive information. A real recommendation follows only after we discuss your needs.',
    ],
  },
  {
    heading: 'Acceptable use',
    blocks: [
      'When using the site you agree not to:',
      [
        'Break the law or help anyone else to do so.',
        "Try to gain unauthorised access to the site, its servers or other users' information.",
        'Send spam, malware or anything intended to disrupt the site.',
        'Copy the site at scale, for example with automated tools, without our permission.',
        'Submit false, misleading or harmful information through our forms.',
      ],
    ],
  },
  {
    heading: 'Intellectual property',
    blocks: [
      `The text, design, logo and other material on this site belong to ${site.name} or its licensors. You may view and share pages for personal or internal business use and link to them. You may not copy, republish or sell our material without written permission.`,
    ],
  },
  {
    heading: 'Links to other sites',
    blocks: [
      'The site may link to websites run by others. We do not control them and are not responsible for their content or privacy practices.',
    ],
  },
  {
    heading: 'Limits on our responsibility',
    blocks: [
      'We provide the site as it is. To the extent the law allows, we are not responsible for losses that result from using the site or relying on its content, or from the site being unavailable. Nothing in these terms limits any right or responsibility that cannot be limited under Nigerian law. [CONFIRM: wording to be settled with a lawyer]',
    ],
  },
  {
    heading: 'Privacy',
    blocks: [
      'How we handle personal information is explained in our Privacy Policy.',
    ],
  },
  {
    heading: 'Governing law',
    blocks: [
      'These terms are governed by the laws of the Federal Republic of Nigeria. [CONFIRM: courts or dispute process, for example the courts of the Federal Capital Territory]',
    ],
  },
  {
    heading: 'Changes and contact',
    blocks: [
      'We may update these terms, and the date at the top shows when they last changed. Continuing to use the site after a change means you accept the updated terms.',
      `Questions? Contact us at ${contactEmail}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      intro="These terms explain the rules for using this website. Please read them, and contact us if anything is unclear."
      sections={sections}
    />
  );
}
