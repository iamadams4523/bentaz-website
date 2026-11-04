'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  serviceOptions,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryField,
} from '@/lib/enquiry';

const input =
  'w-full rounded-2xl border border-gborder bg-field px-4 py-3 text-fg placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand aria-[invalid=true]:border-danger';

type Status = 'idle' | 'sending' | 'failed';

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}{' '}
        {optional ? (
          <span className="font-normal text-muted">(optional)</span>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-[13px] text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-[13px] font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function EnquiryForm() {
  const router = useRouter();
  const params = useSearchParams();
  const wanted = params.get('service');
  const initialService = serviceOptions.some((o) => o.value === wanted)
    ? (wanted as string)
    : '';

  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [failMessage, setFailMessage] = useState('');
  const startedAt = useRef<number | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  // Recorded in the browser after the form appears; the server rejects instant submissions.
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const err = (f: EnquiryField) => errors[f];
  const aria = (f: EnquiryField, hint = false) => ({
    'aria-invalid': err(f) ? true : undefined,
    'aria-describedby': err(f) ? `${f}-error` : hint ? `${f}-hint` : undefined,
  });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    const form = new FormData(e.currentTarget);
    const body = {
      name: form.get('name'),
      organization: form.get('organization'),
      email: form.get('email'),
      phone: form.get('phone'),
      service: form.get('service'),
      budgetTimeline: form.get('budgetTimeline'),
      message: form.get('message'),
      consent: form.get('consent') === 'on',
      website: form.get('website'),
      startedAt: startedAt.current,
    };

    // Same rules as the server, checked first so people get instant feedback.
    const { errors: found } = validateEnquiry(body);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setStatus('failed');
      setFailMessage('Please check the highlighted fields.');
      requestAnimationFrame(() => {
        summaryRef.current?.focus();
      });
      return;
    }

    setStatus('sending');
    setErrors({});
    setFailMessage('');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        errors?: EnquiryErrors;
        message?: string;
      } | null;
      if (res.ok && data?.ok) {
        router.push('/thank-you');
        return;
      }
      setStatus('failed');
      if (data?.errors) {
        setErrors(data.errors);
        setFailMessage('Please check the highlighted fields.');
      } else {
        setFailMessage(
          data?.message ??
            'Something went wrong. Please try again, or contact us on WhatsApp.',
        );
      }
    } catch {
      setStatus('failed');
      setFailMessage(
        'We could not reach the server. Check your connection and try again.',
      );
    }
    requestAnimationFrame(() => summaryRef.current?.focus());
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="glass flex min-w-0 flex-col gap-5 rounded-[28px] p-6 sm:rounded-[36px] sm:p-9"
    >
      <div
        ref={summaryRef}
        tabIndex={-1}
        role="alert"
        aria-live="assertive"
        className={
          failMessage
            ? 'rounded-2xl border border-danger/60 bg-danger/10 p-4 text-sm font-medium outline-none'
            : 'sr-only'
        }
      >
        {failMessage}
        {errors.contact ? (
          <span className="mt-1 block">{errors.contact}</span>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" error={err('name')}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={100}
            className={input}
            {...aria('name')}
          />
        </Field>
        <Field
          id="organization"
          label="Organisation"
          optional
          error={err('organization')}
        >
          <input
            id="organization"
            name="organization"
            type="text"
            autoComplete="organization"
            maxLength={120}
            className={input}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="email"
          label="Email"
          error={err('email')}
          hint="Give an email or a phone number, or both."
        >
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={150}
            className={input}
            {...aria('email', true)}
          />
        </Field>
        <Field id="phone" label="Phone or WhatsApp" error={err('phone')}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={30}
            className={input}
            {...aria('phone')}
          />
        </Field>
      </div>

      <Field id="service" label="Service of interest" error={err('service')}>
        <select
          id="service"
          name="service"
          defaultValue={initialService}
          className={input}
          {...aria('service')}
        >
          <option value="" disabled>
            Choose a service
          </option>
          {serviceOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id="budgetTimeline"
        label="Budget or timeline"
        optional
        error={err('budgetTimeline')}
        hint="A rough idea helps us suggest the right first step."
      >
        <input
          id="budgetTimeline"
          name="budgetTimeline"
          type="text"
          maxLength={200}
          className={input}
          {...aria('budgetTimeline', true)}
        />
      </Field>

      <Field id="message" label="How can we help?" error={err('message')}>
        <textarea
          id="message"
          name="message"
          rows={6}
          maxLength={2000}
          className={`${input} resize-y`}
          {...aria('message')}
        />
      </Field>

      {/* Spam trap: hidden from people and from assistive technology. */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-3 text-sm leading-relaxed">
          <input
            type="checkbox"
            name="consent"
            className="mt-1 size-4 flex-none accent-brand"
            {...aria('consent')}
          />
          <span>
            I agree that Bentaz may contact me about this enquiry. See the{' '}
            <a href="/privacy" className="font-medium text-link underline">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {err('consent') ? (
          <p id="consent-error" className="text-[13px] font-medium text-danger">
            {err('consent')}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-7 font-semibold text-navy transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-60 sm:self-start"
      >
        {status === 'sending' ? 'Sending…' : 'Send enquiry'}
      </button>
    </form>
  );
}
