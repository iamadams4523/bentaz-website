import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SearchBox } from '@/components/search/SearchBox';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { buildSearchIndex } from '@/lib/search-index';

// Search result pages are kept out of search engines.
export const metadata: Metadata = {
  title: 'Search',
  description: 'Search the Bentaz Tech Solutions website.',
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  const items = buildSearchIndex();
  return (
    <section className="pb-16 pt-10 sm:pt-16">
      <Container>
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'Search' }]}
        />
        <h1 className="mt-5 text-[36px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[46px]">
          Search the site
        </h1>
        <div className="mt-8">
          <Suspense
            fallback={
              <div
                className="h-[60px] max-w-[640px] rounded-full border border-gborder bg-field"
                aria-hidden="true"
              />
            }
          >
            <SearchBox items={items} />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
