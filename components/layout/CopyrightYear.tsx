import { cacheLife } from 'next/cache';

/** Current year for the footer. Cached so it prerenders, and refreshes at most daily. */
export async function CopyrightYear() {
  'use cache';
  cacheLife('days');
  return <>{new Date().getFullYear()}</>;
}
