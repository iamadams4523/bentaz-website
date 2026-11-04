import Link from 'next/link';

type Crumb = { label: string; href?: string };

/** The last crumb is the current page and is not a link. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.label} className="flex items-center gap-2">
              {c.href && !last ? (
                <Link href={c.href} className="transition-colors hover:text-fg">
                  {c.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? 'page' : undefined}
                  className={last ? 'font-medium text-fg' : ''}
                >
                  {c.label}
                </span>
              )}
              {!last ? <span aria-hidden="true">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
