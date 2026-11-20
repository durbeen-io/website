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

// https://astro.build/config
export default defineConfig({
  // Canonical, sitemap and RSS links are built from this. durbeen.io is not connected until Phase 8.
  site: 'https://durbeen.io',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        if (path.startsWith('/design-system/')) return false; // internal pages, removed before launch
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
