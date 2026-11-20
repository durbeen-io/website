// Social-preview (OG) images: 1200x630 PNG drawn at build time with satori + resvg. No network, no service.
// Look: paper background, mono metadata, big Inter Tight title, the logo, and a faint reticle (brief section 5).
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const fontDir = join(process.cwd(), 'src/assets/og-fonts');
const interTight = readFileSync(join(fontDir, 'InterTight[wght].ttf'));
const mono = readFileSync(join(fontDir, 'JetBrainsMono[wght].ttf'));

// Light-mode tokens (CLAUDE.md section 6). OG images are always light.
const paper = '#F4F4F1';
const ink = '#14181D';
const muted = '#5B636B';
const line = '#D9DBD8';
const accent = '#B4501E';

// Satori takes plain objects instead of JSX.
type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: unknown[]): Node => ({
  type,
  props: { style: { display: 'flex', ...style }, children: children.length === 1 ? children[0] : children },
});
const svg = (width: number, height: number, viewBox: string, ...children: Node[]): Node => ({
  type: 'svg',
  props: { width, height, viewBox, children },
});
const shape = (type: string, props: Record<string, unknown>): Node => ({ type, props });

const mark = svg(
  56,
  56,
  '0 0 100 100',
  shape('path', { d: 'M10 8H50A42 42 0 0 1 50 92H10L18 50Z M32 26H50A24 24 0 0 1 50 74H32Z', fill: ink, fillRule: 'evenodd' }),
  shape('path', { d: 'M82 12A6 6 0 1 0 94 12A6 6 0 1 0 82 12Z', fill: accent }),
);

const reticle = svg(
  380,
  380,
  '0 0 320 320',
  shape('circle', { cx: 160, cy: 160, r: 150, fill: 'none', stroke: ink, strokeWidth: 1.5 }),
  shape('circle', { cx: 160, cy: 160, r: 100, fill: 'none', stroke: line, strokeWidth: 1.5 }),
  shape('circle', { cx: 160, cy: 160, r: 50, fill: 'none', stroke: line, strokeWidth: 1.5 }),
  shape('path', { d: 'M160 0v120M160 200v120M0 160h120M200 160h120', stroke: ink, strokeWidth: 1.5, fill: 'none' }),
  shape('circle', { cx: 228, cy: 104, r: 7, fill: accent }),
);

/** Draws one image. `label` is the mono line on top ("N°003 · REVIEW · 8 MIN"); `title` is the big text. */
export async function renderOg(opts: { label: string; title: string }): Promise<Buffer> {
  const len = opts.title.length;
  const size = len <= 40 ? 84 : len <= 70 ? 70 : len <= 100 ? 58 : 48;

  const tree = h(
    'div',
    { position: 'relative', flexDirection: 'column', width: 1200, height: 630, background: paper, padding: '56px 64px', boxSizing: 'border-box' },
    // faint reticle on the right, behind the text column
    h('div', { position: 'absolute', right: 48, top: 96 }, reticle),
    h(
      'div',
      { justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 22, color: muted, letterSpacing: 1 },
      h('div', {}, opts.label),
      h('div', {}, 'INDEPENDENT TECHNOLOGY LAB'),
    ),
    h(
      'div',
      { flex: 1, alignItems: 'center', width: 690 },
      h(
        'div',
        { fontFamily: 'Inter Tight', fontWeight: 700, fontSize: size, lineHeight: 1.02, letterSpacing: -size * 0.035, color: ink },
        opts.title,
      ),
    ),
    h(
      'div',
      { justifyContent: 'space-between', alignItems: 'center', paddingTop: 28, borderTop: `1px solid ${ink}` },
      h(
        'div',
        { alignItems: 'center', gap: 20 },
        mark,
        h('div', { fontFamily: 'Inter Tight', fontWeight: 700, fontSize: 30, letterSpacing: 3, color: ink }, 'DURBEEN'),
      ),
      h('div', { fontFamily: 'JetBrains Mono', fontSize: 24, color: muted }, 'durbeen.io'),
    ),
  );

  const out = await satori(tree as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Inter Tight', data: interTight, weight: 700, style: 'normal' },
      { name: 'JetBrains Mono', data: mono, weight: 400, style: 'normal' },
    ],
  });
  return new Resvg(out, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
