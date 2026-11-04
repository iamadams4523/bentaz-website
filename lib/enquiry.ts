import { services } from '@/lib/services';

/** Shared by the form (browser) and the API route (server), so both apply identical rules. */

export const NOT_SURE = 'not-sure';

export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: NOT_SURE, label: 'I am not sure yet' },
];

export type EnquiryInput = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  service: string;
  budgetTimeline: string;
  message: string;
  consent: boolean;
  /** Spam trap: real people leave this empty. */
  website: string;
  /** Milliseconds timestamp from when the form was shown. */
  startedAt: number | null;
};

export type EnquiryField =
  | 'name'
  | 'organization'
  | 'email'
  | 'phone'
  | 'contact'
  | 'service'
  | 'budgetTimeline'
  | 'message'
  | 'consent';
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

const oneLine = (v: unknown, max: number) =>
  (typeof v === 'string' ? v : '').replace(/\s+/g, ' ').trim().slice(0, max);

const multiLine = (v: unknown, max: number) =>
  (typeof v === 'string' ? v : '').replace(/\r\n/g, '\n').trim().slice(0, max);

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Cleans the raw input and returns the cleaned values with any errors. */
export function validateEnquiry(raw: Record<string, unknown>): {
  values: EnquiryInput;
  errors: EnquiryErrors;
} {
  const values: EnquiryInput = {
    name: oneLine(raw.name, 100),
    organization: oneLine(raw.organization, 120),
    email: oneLine(raw.email, 150).toLowerCase(),
    phone: oneLine(raw.phone, 30),
    service: oneLine(raw.service, 80),
    budgetTimeline: oneLine(raw.budgetTimeline, 200),
    message: multiLine(raw.message, 2000),
    consent:
      raw.consent === true || raw.consent === 'on' || raw.consent === 'true',
    website: oneLine(raw.website, 200),
    startedAt:
      typeof raw.startedAt === 'number' && Number.isFinite(raw.startedAt)
        ? raw.startedAt
        : null,
  };

  const errors: EnquiryErrors = {};

  if (values.name.length < 2) errors.name = 'Please enter your name.';

  const digits = values.phone.replace(/\D/g, '');
  const phoneOk =
    /^[+\d][\d\s().-]*$/.test(values.phone) &&
    digits.length >= 7 &&
    digits.length <= 15;

  if (!values.email && !values.phone) {
    errors.contact =
      'Please give an email address or a phone number so we can reply.';
  }
  if (values.email && !EMAIL.test(values.email))
    errors.email = 'That email address does not look right.';
  if (values.phone && !phoneOk)
    errors.phone = 'That phone number does not look right.';

  if (!serviceOptions.some((o) => o.value === values.service))
    errors.service = 'Please choose a service.';

  if (values.message.length < 10)
    errors.message =
      'Please tell us a little about what you need (at least 10 characters).';

  if (!values.consent)
    errors.consent =
      'Please confirm that we may contact you about this enquiry.';

  return { values, errors };
}
