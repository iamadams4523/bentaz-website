import type { Metadata } from 'next';
import { CtaBand } from '@/components/home/CtaBand';
import { ArticleBrowser } from '@/components/insights/ArticleBrowser';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { categories, getPublishedArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Practical articles on business technology, AI and automation, websites, cybersecurity and digital skills from Bentaz Tech Solutions Ltd. in Abuja, Nigeria.',
};

export default function InsightsPage() {
  const list = getPublishedArticles().map((a) => ({
    slug: a.slug,
    title: a.title,
    summary: a.summary,
    category: a.category,
    author: a.author,
    publishedOn: a.publishedOn,
  }));
  const used = categories.filter((c) =>
    list.some((a) => a.category === c.slug),
  );

  return (
    <>
      <section className="pb-6 pt-10 sm:pt-16">
        <Container>
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Insights' }]}
          />
          <h1 className="mt-5 max-w-[20ch] text-[36px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[46px] lg:text-[56px]">
            Useful ideas, written plainly
          </h1>
          <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted sm:text-xl">
            Practical guidance on technology for the way you run your business.
            No jargon, no padding.
          </p>
        </Container>
      </section>

      <section className="py-8 sm:py-12" aria-label="Articles">
        <Container>
          <ArticleBrowser articles={list} categories={used} />
        </Container>
      </section>

      <CtaBand
        heading="Want advice for your own business?"
        text="Tell us what you are working on and we will suggest a sensible next step."
        whatsappText="Hello Bentaz, I read your Insights and would like some advice."
      />
    </>
  );
}
