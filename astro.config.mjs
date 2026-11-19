// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    // Never inline scripts into the HTML, so the Content-Security-Policy can forbid inline script.
    build: { assetsInlineLimit: 0 },
  },
});
