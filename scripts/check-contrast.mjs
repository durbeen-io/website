// Checks every text/background colour pair in src/styles/tokens.css against WCAG AA.
// Run: npm run check:contrast   (exits with an error if any pair fails)
// Also checks that the two dark-mode blocks in tokens.css (system dark and manual dark) match.
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');

// Pull "--name: #hex;" pairs out of a block that starts at `start`.
function block(start) {
  const i = css.indexOf(start);
  if (i < 0) throw new Error(`Block not found: ${start}`);
  const open = css.indexOf('{', i);
  const close = css.indexOf('}', open);
  const out = {};
  for (const m of css.slice(open, close).matchAll(/(--[\w-]+):\s*(#[0-9A-Fa-f]{6})/g)) out[m[1]] = m[2].toUpperCase();
  return out;
}

const light = block(':root {');
const dark = block(":root[data-theme='dark']");
const darkSystem = block(":root:not([data-theme='light'])");

const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// [foreground token, background token, what it is, minimum ratio]
// 4.5 = normal text. 3 = large text (24px+) or UI parts.
const pairs = [
  ['--ink', '--paper', 'Headings on page', 4.5],
  ['--text', '--paper', 'Body text on page', 4.5],
  ['--text-2', '--paper', 'Secondary text on page', 4.5],
  ['--muted', '--paper', 'Labels and metadata on page', 4.5],
  ['--accent', '--paper', 'Links on page', 4.5],
  ['--text', '--surface', 'Body text on panel', 4.5],
  ['--text-2', '--surface', 'Secondary text on panel', 4.5],
  ['--muted', '--surface', 'Labels on panel', 4.5],
  ['--accent', '--surface', 'Links on panel', 4.5],
  ['--ink', '--surface-2', 'Text on placeholder or tab', 4.5],
  ['--muted', '--surface-2', 'Labels on placeholder or tab', 4.5],
  ['--ui-border', '--paper', 'Border of an input or button on page', 3],
  ['--ui-border', '--surface', 'Border of an input or button on panel', 3],
  ['--on-accent', '--accent', 'Text on accent button', 4.5],
  ['--on-band', '--band', 'Text on dark band', 4.5],
  ['--accent-on-dark', '--band', 'Accent on dark band', 4.5],
];

let failed = 0;
const pad = (s, n) => String(s).padEnd(n);

// Dark mode inherits anything it does not redefine (e.g. --accent-on-dark), like CSS does.
for (const [mode, t] of [['LIGHT', light], ['DARK', { ...light, ...dark }]]) {
  console.log(`\n${mode}`);
  console.log(`${pad('Pair', 60)}${pad('Colours', 20)}${pad('Ratio', 9)}${pad('Need', 6)}Result`);
  for (const [fg, bg, what, min] of pairs) {
    const r = ratio(t[fg], t[bg]);
    const ok = r >= min;
    if (!ok) failed++;
    console.log(`${pad(`${what} (${fg} on ${bg})`, 60)}${pad(`${t[fg]} / ${t[bg]}`, 20)}${pad(`${r.toFixed(2)}:1`, 9)}${pad(`${min}:1`, 6)}${ok ? 'PASS' : 'FAIL'}`);
  }
}

// The two dark blocks must hold identical values, or system-dark and toggle-dark would differ.
const keys = new Set([...Object.keys(dark), ...Object.keys(darkSystem)]);
const mismatches = [...keys].filter((k) => dark[k] !== darkSystem[k]);
console.log('\nDARK BLOCKS MATCH (system vs toggle):', mismatches.length ? `FAIL ${mismatches.join(', ')}` : 'PASS');
failed += mismatches.length;

console.log(failed ? `\n${failed} problem(s) found.` : '\nAll pairs pass WCAG AA.');
process.exit(failed ? 1 : 0);
