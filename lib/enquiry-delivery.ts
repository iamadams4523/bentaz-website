import 'server-only';
import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { serviceOptions, type EnquiryInput } from '@/lib/enquiry';
import { site } from '@/lib/site';

/**
 * Delivers an enquiry. Order of preference:
 * 1. Email through Resend, when RESEND_API_KEY and ENQUIRY_TO_EMAIL are set (production).
 * 2. A local file (.data/enquiries.jsonl) and the terminal, only while developing.
 * In production with nothing configured this throws, so the visitor is told it failed instead of being
 * told it worked when nothing was saved.
 */

const label = (value: string) =>
  serviceOptions.find((o) => o.value === value)?.label ?? value;

function summary(e: EnquiryInput, receivedAt: string) {
  return [
    'New website enquiry',
    '',
    `Name: ${e.name}`,
    `Organisation: ${e.organization || '-'}`,
    `Email: ${e.email || '-'}`,
    `Phone: ${e.phone || '-'}`,
    `Service of interest: ${label(e.service)}`,
    `Budget or timeline: ${e.budgetTimeline || '-'}`,
    '',
    'Message:',
    e.message,
    '',
    `Received: ${receivedAt}`,
  ].join('\n');
}

async function sendEmail(body: {
  from: string;
  to: string;
  subject: string;
  text: string;
  reply_to?: string;
}) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Email provider returned ${res.status}`);
}

export async function deliverEnquiry(e: EnquiryInput) {
  const receivedAt = new Date().toISOString();
  const text = summary(e, receivedAt);

  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL;

  if (key && to) {
    // The subject uses only the service label from our own list, never visitor text.
    await sendEmail({
      from: from ?? `${site.shortName} Website <onboarding@resend.dev>`,
      to,
      subject: `New enquiry: ${label(e.service)}`,
      text,
      ...(e.email ? { reply_to: e.email } : {}),
    });

    // Confirmation to the visitor. Needs a verified sending address in ENQUIRY_FROM_EMAIL.
    if (e.email && from) {
      try {
        await sendEmail({
          from,
          to: e.email,
          subject: `We received your enquiry | ${site.name}`,
          text: [
            `Hello ${e.name},`,
            '',
            'Thank you for contacting us. We have received your enquiry and will reply as soon as we can.',
            "[CONFIRM: reply time, for example 'within one working day']",
            '',
            'A copy of what you sent:',
            '',
            e.message,
            '',
            `${site.name} (RC ${site.rcNumber})`,
          ].join('\n'),
        });
      } catch {
        // The owner already has the enquiry, so a failed confirmation should not fail the request.
      }
    }
    return;
  }

  if (process.env.NODE_ENV !== 'production') {
    const dir = path.join(process.cwd(), '.data');
    await mkdir(dir, { recursive: true });
    await appendFile(
      path.join(dir, 'enquiries.jsonl'),
      JSON.stringify({ receivedAt, ...e }) + '\n',
    );
    console.log(
      '\n' + text + '\n(saved to .data/enquiries.jsonl, development only)\n',
    );
    return;
  }

  throw new Error(
    'No enquiry delivery is configured. Set RESEND_API_KEY and ENQUIRY_TO_EMAIL.',
  );
}
