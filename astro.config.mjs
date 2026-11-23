// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { categorySlug } from './src/lib/taxonomy.ts';

// Category pages that have at least one published article. Empty category pages are `noindex`,
// so they stay out of the sitemap. Reads the article frontmatter directly (this file runs before Astro's content layer).
function populatedCategoryPaths() {
  const includeDrafts = process.env.DURBEEN_INCLUDE_DRAFTS === '1';
  const dir = new URL('./src/content/insights/', import.meta.url);
  const slugs = new Set();
  for (const f of readdirSync(dir)) {
    if (f.startsWith('_') || !/\.mdx?$/.test(f)) continue;
    const fm = readFileSync(new URL(f, dir), 'utf8').split('---')[1] ?? '';
    const category = fm.match(/^category:\s*(.+?)\s*$/m)?.[1]?.replace(/^["']|["']$/g, '');
    const draft = /^draft:\s*true\s*$/m.test(fm);
    if (category && (includeDrafts || !draft)) slugs.add(categorySlug(category));
  }
  return slugs;
}
const populated = populatedCategoryPaths();

// <lastmod> for the sitemap (audit F018), from the article dates: an article uses its updated date (or publish date);
// the Home, Insights and Infographics pages, and each category, tag and series page, use the newest date of the articles
// they list. Other pages (About, legal, Projects...) get none: nothing records when they last changed, and a guessed date is worse.
function lastmodByPath() {
  const includeDrafts = process.env.DURBEEN_INCLUDE_DRAFTS === '1';
  const dir = new URL('./src/content/insights/', import.meta.url);
  /** @type {Map<string, string>} */
  const out = new Map();
  const bump = (path, date) => {
    if (!out.has(path) || date > out.get(path)) out.set(path, date);
  };
  for (const f of readdirSync(dir)) {
    if (f.startsWith('_') || !/\.mdx?$/.test(f)) continue;
    const fm = readFileSync(new URL(f, dir), 'utf8').split('---')[1] ?? '';
    if (!includeDrafts && /^draft:\s*true\s*$/m.test(fm)) continue;
    const field = (name) => fm.match(new RegExp(`^${name}:\\s*(.+?)\\s*$`, 'm'))?.[1]?.replace(/^["']|["']$/g, '');
    const date = (field('updatedDate') || field('publishDate') || '').slice(0, 10);
    if (!/^\d{4}-\d\d-\d\d$/.test(date)) continue;
    bump(`/insights/${f.replace(/\.mdx?$/, '')}/`, date);
    for (const p of ['/', '/insights/', '/infographics/']) bump(p, date);
    const category = field('category');
    if (category) bump(`/insights/category/${categorySlug(category)}/`, date);
    const series = field('series');
    if (series) bump(`/insights/series/${categorySlug(series)}/`, date);
    const inline = fm.match(/^tags:\s*\[(.*?)\]/m);
    const block = fm.match(/^tags:\s*\n((?:\s+-\s*.+\n?)+)/m);
    const tags = inline ? inline[1].split(',') : block ? block[1].split('\n').map((l) => l.replace(/^\s*-\s*/, '')) : [];
    for (const t of tags.map((x) => x.trim().replace(/^["']|["']$/g, '')).filter(Boolean)) bump(`/insights/tag/${t}/`, date);
  }
  return out;
}
const lastmods = lastmodByPath();

// https://astro.build/config
export default defineConfig({
  // Canonical, sitemap and RSS links are built from this.
  site: 'https://durbeen.io',
  integrations: [
    mdx(),
    sitemap({
      serialize(item) {
        const date = lastmods.get(new URL(item.url).pathname);
        if (date) item.lastmod = date;
        return item;
      },
      filter: (page) => {
        const path = new URL(page).pathname;
        const cat = path.match(/^\/insights\/category\/([^/]+)\/$/);
        if (cat && !populated.has(cat[1])) return false; // empty category pages are noindex
        return true;
      },
    }),
  ],
  markdown: {
    // Code blocks are always dark (like the mockup). This theme keeps every token readable (WCAG AA).
    shikiConfig: { theme: 'github-dark-high-contrast' },
  },
  vite: {
    // Never inline scripts into the HTML, so the Content-Security-Policy can forbid inline script.
    build: { assetsInlineLimit: 0 },
  },
});
