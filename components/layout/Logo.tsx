import Link from 'next/link';

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Bentaz Tech Solutions Ltd, home"
      className="inline-flex flex-col leading-none text-fg no-underline"
    >
      <span className="text-[22px] font-bold tracking-[0.2em]">BENTAZ</span>
      <span className="mt-1 text-[8px] font-semibold tracking-[0.34em] text-brand">
        TECH SOLUTIONS LTD
      </span>
    </Link>
  );
}
