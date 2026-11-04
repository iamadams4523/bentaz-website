import type { Service } from '@/lib/services';

/**
 * Case-study template data (brief: "Cannot publish without a client permission confirmed tick").
 * No projects are published yet. Add a real project only with the client's written permission and
 * facts the owner has verified. Never add invented clients, outcomes or images.
 */

export type ProjectOutcome = {
  /** A result the owner has verified. */
  text: string;
  /** How it was verified, for example "Confirmed by the client on 12 March". */
  source: string;
};

export type ProjectVisual = { src: string; alt: string; caption?: string };

export type Project = {
  slug: string;
  title: string;
  /** Client name, or a description such as "A private school in Abuja" if the client wants to stay unnamed. */
  client: string;
  sector: string;
  /** Slugs from services.ts. */
  services: Service['slug'][];
  summary: string;
  problem: string;
  solution: string;
  scope: string[];
  outcomes: ProjectOutcome[];
  /** Only images the client has approved. */
  visuals: ProjectVisual[];
  /** Must be true before the project can appear anywhere on the site. */
  clientPermissionConfirmed: boolean;
  /** ISO date, for example "2026-12-01". */
  publishedOn: string;
  updatedOn?: string;
};

export const projects: Project[] = [];

export function isPublishable(p: Project) {
  return (
    p.clientPermissionConfirmed === true &&
    p.outcomes.every((o) => o.source.trim().length > 0)
  );
}

export function getPublishedProjects() {
  return projects.filter(isPublishable);
}

export function getProject(slug: string) {
  return getPublishedProjects().find((p) => p.slug === slug);
}
