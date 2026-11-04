import { site } from '@/lib/site';

/**
 * Privacy Policy and Terms are DRAFTS (brief, section 7) and must be reviewed by a Nigerian lawyer
 * before launch. While LEGAL_APPROVED is false, both pages show a draft notice and are kept out of search
 * results. Set it to true once the owner and a lawyer have approved the final text.
 */
export const LEGAL_APPROVED = false;

export const LEGAL_DRAFT_DATE = '4 November 2026';

export const contactEmail = site.contact.email ?? '[BUSINESS EMAIL]';
export const contactPhone = site.contact.phone ?? '[PHONE NUMBER]';
export const contactAddress =
  site.contact.address ?? '[ADDRESS OR SERVICE AREA]';
