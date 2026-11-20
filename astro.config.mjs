// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Canonical, sitemap and RSS links are built from this. durbeen.io is not connected until Phase 8.
  site: 'https://durbeen.io',
  markdown: {
    // Code blocks are always dark (like the mockup). This theme keeps every token readable (WCAG AA).
    shikiConfig: { theme: 'github-dark-high-contrast' },
  },
  integrations: [mdx()],
  vite: {
    // Never inline scripts into the HTML, so the Content-Security-Policy can forbid inline script.
    build: { assetsInlineLimit: 0 },
  },
});
