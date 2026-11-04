import { validateEnquiry } from '@/lib/enquiry';
import { deliverEnquiry } from '@/lib/enquiry-delivery';

const MAX_BODY = 20_000;
const MIN_FILL_MS = 3_000;
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;

// Simple per-address limit held in memory. On serverless hosting each instance has its own memory,
// so treat this as a basic brake and add a shared store (for example Upstash Redis) for stronger limits.
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000)
    for (const [k, v] of hits)
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  return recent.length > MAX_PER_WINDOW;
}

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(req: Request) {
  const text = await req.text();
  if (text.length > MAX_BODY)
    return json({ ok: false, message: 'That message is too long.' }, 413);

  let raw: Record<string, unknown>;
  try {
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed))
      throw new Error();
    raw = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, message: 'We could not read that request.' }, 400);
  }

  const { values, errors } = validateEnquiry(raw);
  if (Object.keys(errors).length > 0) return json({ ok: false, errors }, 400);

  // Only complete submissions count towards the limit, so typing mistakes never lock anyone out.
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (limited(ip))
    return json(
      {
        ok: false,
        message: 'Too many messages. Please try again in a few minutes.',
      },
      429,
    );

  // Spam checks. A bot gets a normal-looking success so it learns nothing, and nothing is delivered.
  const tooFast =
    values.startedAt === null || Date.now() - values.startedAt < MIN_FILL_MS;
  if (values.website !== '' || tooFast) return json({ ok: true });

  try {
    await deliverEnquiry(values);
  } catch (err) {
    console.error('Enquiry delivery failed:', err);
    return json(
      {
        ok: false,
        message:
          'We could not send your message. Please try WhatsApp or email instead.',
      },
      500,
    );
  }
  return json({ ok: true });
}
