import type { CSSProperties } from 'react';

/** Decorative orbit from the logo's ellipse. Motion is disabled under prefers-reduced-motion (see globals.css). */
export function Orbit({
  className = '',
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`orbit ${className}`} style={style} aria-hidden="true">
      <svg width="640" height="240" viewBox="0 0 640 240" fill="none">
        <ellipse
          className="orbit-ring"
          cx="320"
          cy="120"
          rx="319"
          ry="119"
          strokeWidth="1.4"
        />
        <ellipse
          className="orbit-ring"
          cx="320"
          cy="120"
          rx="252"
          ry="92"
          strokeWidth="1.2"
          strokeDasharray="2 9"
          strokeLinecap="round"
        />
      </svg>
      <span className="orbit-dot" />
    </div>
  );
}
