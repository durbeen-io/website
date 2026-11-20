// Accessibility check: runs axe on every built page, in light and dark mode.
// Usage: npm run build && npm run check:axe
// Uses the Chrome already installed on the machine (no browser download).
import { createServer } from 'node:http';
import { readFile, readdir } from 'node:fs/promises';
import { join, extname, resolve } from 'node:path';
import { chromium } from 'playwright-core';
import { AxeBuilder } from '@axe-core/playwright';

const dist = resolve('dist');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.ico': 'image/x-icon' };

// Find every built page (dist/**/index.html) and turn it into a URL path.
async function pages(dir = dist) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await pages(p)));
    else if (e.name === 'index.html') out.push(p.slice(dist.length).replace(/index\.html$/, '') || '/');
  }
  return out;
}

const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (path.endsWith('/')) path += 'index.html';
  const file = resolve(join(dist, path));
  if (!file.startsWith(dist)) { res.writeHead(403).end(); return; }
  try {
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
    res.end(await readFile(file));
  } catch { res.writeHead(404).end('not found'); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

let failed = false;
let browser;
try {
  browser = await chromium.launch({ channel: 'chrome' });
  for (const path of await pages()) {
    for (const scheme of ['light', 'dark']) {
      const ctx = await browser.newContext({ colorScheme: scheme, viewport: { width: 375, height: 800 } });
      const page = await ctx.newPage();
      await page.goto(base + path);
      const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      console.log(`${violations.length ? 'FAIL' : 'ok  '} ${path} (${scheme}) ${violations.length} violation(s)`);
      for (const v of violations) {
        failed = true;
        console.log(`  - ${v.id}: ${v.help}`);
        for (const n of v.nodes.slice(0, 3)) console.log(`      ${n.target.join(' ')}`);
      }
      await ctx.close();
    }
  }
} finally {
  await browser?.close();
  server.close();
}
process.exit(failed ? 1 : 0);
