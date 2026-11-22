// Finds placeholders that must not reach launch: [SQUARE BRACKET] markers for the founder to fill in, and
// "PRELIMINARY" markers on draft legal pages. Run after a build: `npm run build && npm run check:brackets`.
// Exit code 1 if any are found. Phase 8 gate (CLAUDE.md section 12): none may remain on any page.
// Not run in CI before launch (it would fail on purpose while placeholders exist).
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const skip = new Set(['pagefind', '_astro']);
const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (!skip.has(name)) walk(p);
    } else if (p.endsWith('.html')) files.push(p);
  }
})(dist);

let found = 0;
for (const f of files) {
  const page = relative(dist, f);
  const text = readFileSync(f, 'utf8')
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#x27;/g, "'");
  const hits = [...text.matchAll(/\[[A-Z][A-Z0-9 ,'’\-/]{2,}\]/g)].map((m) => m[0]);
  if (/PRELIMINARY/.test(text)) hits.push('PRELIMINARY marker');
  // The "[ 01 ]" section labels are design, not placeholders: they contain only digits, so the pattern above skips them.
  if (hits.length) {
    found += hits.length;
    console.log(`${page}: ${[...new Set(hits)].join(' · ')}`);
  }
}
console.log(found ? `\n${found} placeholder(s) left. Fix them before launch.` : 'No placeholders left.');
process.exit(found ? 1 : 0);
