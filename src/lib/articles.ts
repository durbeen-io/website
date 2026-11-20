// Article helpers: one place that decides what is published, in what order, and how it is labelled.
// Home, the Insights list, category/tag pages, RSS and search all read through here (connection map, CLAUDE.md section 8).
import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'insights'>;

// Drafts never reach production. For testing with sample drafts, run a build with DURBEEN_INCLUDE_DRAFTS=1
// (`npm run dev` shows drafts automatically). CI jobs that audit pages set the flag; the real deploy does not.
const includeDrafts = process.env.DURBEEN_INCLUDE_DRAFTS === '1' || import.meta.env.DEV;

/** Published articles, newest first. Fails the build if two articles share a log number. */
export async function getArticles(): Promise<Article[]> {
  const all = await getCollection('insights', ({ data }) => includeDrafts || !data.draft);
  const seen = new Map<number, string>();
  for (const a of all) {
    const other = seen.get(a.data.number);
    if (other) throw new Error(`Log number ${a.data.number} is used twice: ${other} and ${a.id}`);
    seen.set(a.data.number, a.id);
  }
  return all.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf() || b.data.number - a.data.number,
  );
}

/** Reading time in whole minutes (200 words a minute, at least 1). */
export function readingMinutes(a: Article): number {
  const words = (a.body ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export const articleHref = (a: Article) => `/insights/${a.id}/`;

/** "18.11.2026", as used in the status strip. Dates are read as UTC so the day never shifts. */
export function logDate(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(d.getUTCDate())}.${p(d.getUTCMonth() + 1)}.${d.getUTCFullYear()}`;
}
