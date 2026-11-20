// Article helpers: one place that decides what is published, in what order, and how it is labelled.
// Home, the Insights list, category/tag pages, RSS and search all read through here (connection map, CLAUDE.md section 8).
import { getCollection, type CollectionEntry } from 'astro:content';

import { categorySlug } from './taxonomy';
export { categorySlug };

export type Article = CollectionEntry<'insights'>;

// Drafts never reach production. For testing with sample drafts, run a build with DURBEEN_INCLUDE_DRAFTS=1
// (`npm run dev` shows drafts automatically). CI jobs that audit pages set the flag; the real deploy does not.
const includeDrafts = process.env.DURBEEN_INCLUDE_DRAFTS === '1' || import.meta.env.DEV;

/** Published articles, newest first. Fails the build if two articles (drafts included) share a log number. */
export async function getArticles(): Promise<Article[]> {
  const everything = await getCollection('insights');
  const seen = new Map<number, string>();
  for (const a of everything) {
    const other = seen.get(a.data.number);
    if (other) throw new Error(`Log number ${a.data.number} is used twice: ${other} and ${a.id}`);
    seen.set(a.data.number, a.id);
  }
  // A leftover template marker must never be published. Drafts may still contain them.
  for (const a of everything) {
    if (!a.data.draft && /\[FILL\b/.test(`${a.body ?? ''}\n${JSON.stringify(a.data)}`)) {
      throw new Error(`${a.id} still contains a [FILL] marker. Replace every [FILL] or keep the article as a draft.`);
    }
  }
  const all = everything.filter(({ data }) => includeDrafts || !data.draft);
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

/** "18 NOV 2026", as used in bylines. UTC so the day never shifts. */
export function formatDate(d: Date): string {
  return d
    .toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .toUpperCase();
}

/** URL part for a series: "Building Durbeen in Public" -> "building-durbeen-in-public". */
export const seriesSlug = categorySlug;

export const categoryHref = (category: string) => `/insights/category/${categorySlug(category)}/`;
export const tagHref = (tag: string) => `/insights/tag/${tag}/`;
export const seriesHref = (series: string) => `/insights/series/${seriesSlug(series)}/`;

/** Related articles: 2 points per shared tag, 1 for the same category. Newest first on ties. Never the article itself. */
export function relatedArticles(current: Article, all: Article[], limit = 3): Article[] {
  const tags = new Set(current.data.tags);
  return all
    .filter((a) => a.id !== current.id)
    .map((a) => ({
      a,
      score: a.data.tags.filter((t) => tags.has(t)).length * 2 + (a.data.category === current.data.category ? 1 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score || y.a.data.publishDate.valueOf() - x.a.data.publishDate.valueOf())
    .slice(0, limit)
    .map((x) => x.a);
}

/** Neighbours in publish order. `all` is newest first, so "previous" is the older one. */
export function adjacentArticles(current: Article, all: Article[]): { previous?: Article; next?: Article } {
  const i = all.findIndex((a) => a.id === current.id);
  return { previous: all[i + 1], next: i > 0 ? all[i - 1] : undefined };
}
