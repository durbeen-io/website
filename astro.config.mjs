// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  vite: {
    // Never inline scripts into the HTML, so the Content-Security-Policy can forbid inline script.
    build: { assetsInlineLimit: 0 },
  },
});
