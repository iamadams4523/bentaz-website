/**
 * Fixed ambient background: three blurred colour orbs. They sit behind
 * everything so the glass panels always have something to frost.
 */
export function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute -left-52 -top-36 size-160 rounded-full blur-[90px]"
        style={{ background: 'var(--o1)' }}
      />
      <div
        className="absolute -right-60 top-16 size-180 rounded-full blur-[90px]"
        style={{ background: 'var(--o2)' }}
      />
      <div
        className="absolute bottom-[-10%] left-[30%] size-130 rounded-full blur-[90px]"
        style={{ background: 'var(--o3)' }}
      />
    </div>
  );
}
