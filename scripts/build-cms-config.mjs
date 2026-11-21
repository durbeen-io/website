// Writes `.pages.yml` (the Pages CMS configuration) from the site's own lists, so the dropdowns can never drift:
// categories, types, levels and series come from src/lib/taxonomy.ts; tags from src/content/tags.json.
//   npm run cms:build   rewrite .pages.yml
//   npm run check:cms   fail if .pages.yml is out of date (runs in CI)
// Pages CMS docs used: https://pagescms.org/docs/configuration/ (media, content, fields, settings).
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { categories, types, levels, series } from '../src/lib/taxonomy.ts';

const root = new URL('../', import.meta.url);
const tags = JSON.parse(readFileSync(new URL('src/content/tags.json', root), 'utf8'));
// Files starting with "_" are templates/notes, not articles: hide them from the article list.
const hidden = readdirSync(new URL('src/content/insights/', root)).filter((f) => f.startsWith('_')).sort();

const q = (s) => `"${String(s).replace(/"/g, '\\"')}"`;
const list = (a) => `[${a.map(q).join(', ')}]`;


// One field list for every article form. `d` holds default values for a "New ..." entry made from a template file.
function fieldsYaml(d) {
  const D = (k) => (d[k] !== undefined ? `        default: ${JSON.stringify(d[k])}\n` : '');
  const DB = () =>
    d.body !== undefined
      ? `        default: |\n${d.body
          .replace(/\s+$/, '')
          .split('\n')
          .map((l) => (l ? '          ' + l : ''))
          .join('\n')}\n`
      : '';
  return `      - name: title
${D('title')}        label: Title
        type: string
        required: true
      - name: description
${D('description')}        label: Description (Google meta description)
        type: text
        required: true
        description: 120 to 160 characters. The build fails outside that range.
        options:
          minlength: 120
          maxlength: 160
      - name: number
        label: Log number
        type: number
        required: true
        description: The next free number. Each article needs its own (N°012). Drafts count too.
        options:
          min: 1
      - name: category
${D('category')}        label: Category
        type: select
        required: true
        options:
          values: ${list(categories)}
      - name: type
${D('type')}        label: Type
        type: select
        required: true
        description: An Infographic also needs the Text version (summary) below.
        options:
          values: ${list(types)}
      - name: level
${D('level')}        label: Level (hidden on the site; optional)
        type: select
        required: false
        options:
          values: ${list(levels)}
      - name: tags
        label: Tags
        type: select
        required: true
        description: Choose 3 to 5 tags from the approved list.
        options:
          multiple: true
          min: 3
          max: 5
          values: ${list(tags)}
      - name: series
${D('series')}        label: Series (optional)
        type: select
        options:
          values: ${list(series)}
      - name: author
        label: Author
        type: string
        readonly: true
        default: Fahad Ehsan
      - name: publishDate
        label: Publish date
        type: date
        required: true
        options:
          format: yyyy-MM-dd
      - name: updatedDate
        label: Updated date (optional)
        type: date
        default: ""
        options:
          format: yyyy-MM-dd
      - name: lastVerified
        label: Last verified (optional, for reviews)
        type: date
        default: ""
        options:
          format: yyyy-MM-dd
      - name: featured
        label: Feature on the home page
        type: boolean
        default: false
      - name: draft
        label: Draft (not published)
        type: boolean
        default: true
        description: Leave on while writing. Switch off to publish.
      - name: affiliate
        label: Contains affiliate links
        type: boolean
        default: false
      - name: heroImage
        label: Hero image (optional)
        type: image
        options:
          media: article_images
      - name: heroAlt
${D('heroAlt')}        label: Hero image alt text
        type: string
        description: Required if there is a hero image. One short sentence describing it.
      - name: ogImage
        label: Own social-preview image (optional)
        type: string
        description: Leave empty. A preview image is made automatically.
      - name: canonicalSource
        label: First published at (optional)
        type: string
        description: Only if the article appeared somewhere else first. A full https address.
      - name: summary
${D('summary')}        label: Text version (required for Infographic)
        type: text
        description: For an Infographic, write the whole picture in plain sentences (200 characters or more). It is shown on the page.
      - name: scorecard
        label: Scorecard (Reviews only)
        type: object
        fields:
          - { name: setup, label: Setup (1 to 5), type: number, options: { min: 1, max: 5 } }
          - { name: docs, label: Docs (1 to 5), type: number, options: { min: 1, max: 5 } }
          - { name: maintenance, label: Maintenance (1 to 5), type: number, options: { min: 1, max: 5 } }
          - { name: safety, label: Safety (1 to 5), type: number, options: { min: 1, max: 5 } }
          - { name: verdict, label: Verdict (one sentence), type: string }
      - name: body
${DB()}        label: Article text (MDX)
        type: code
        options:
          format: mdx
`;
}

// Starter files: src/content/insights/_template-<type>.mdx. Their scalar frontmatter lines and their body become the
// defaults of a "New <type>" entry in the CMS, so the file and the form can never differ.
const templateNames = readdirSync(new URL('src/content/insights/', root))
  .filter((f) => /^_template-.+\.mdx$/.test(f))
  .sort();
function readTemplate(file) {
  const raw = readFileSync(new URL(`src/content/insights/${file}`, root), 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const out = { body: m[2].replace(/^\n+/, '') };
  for (const key of ['title', 'description', 'category', 'type', 'level', 'series', 'summary', 'heroAlt']) {
    const line = m[1].match(new RegExp(`^${key}: (.*)$`, 'm'));
    if (!line) continue;
    let v = line[1].trim();
    if (v.startsWith('"')) v = v.slice(1, v.lastIndexOf('"'));
    else v = v.replace(/\s+#.*$/, '');
    out[key] = v;
  }
  if (out.description.length < 120 || out.description.length > 160) throw new Error(`${file}: description placeholder must be 120-160 characters`);
  if (out.summary !== undefined && out.summary.length < 200) throw new Error(`${file}: summary placeholder must be 200+ characters`);
  return out;
}

// The "Start a new article" group: one entry per template file. Each lists that type's articles (default search = the
// type) and creates new ones pre-filled from the template. Uses the same folder as "Articles" on purpose.
function templateGroup() {
  if (templateNames.length === 0) return '';
  const indent = (text, n) => text.split('\n').map((l) => (l ? ' '.repeat(n) + l : l)).join('\n');
  const items = templateNames
    .map((f) => {
      const d = readTemplate(f);
      const slug = f.replace(/^_template-/, '').replace(/\.mdx$/, '');
      return `      - name: new-${slug}
        label: New ${d.type}
        type: collection
        path: src/content/insights
        format: yaml-frontmatter
        subfolders: false
        exclude: ${list(hidden)}
        filename:
          template: "{primary}.mdx"
          field: create
        view:
          primary: title
          fields: [number, type, category, publishDate, draft]
          sort: [publishDate, number, title]
          search: [title, type]
          default:
            search: ${JSON.stringify(d.type)}
            sort: publishDate
            order: desc
        fields:
${indent(fieldsYaml(d), 4)}`;
    })
    .join('\n');
  return `  - name: templates
    label: Start a new article
    type: group
    items:
${items}
`;
}

export function buildConfig() {
  return `# Pages CMS configuration for durbeen.io: edit articles at https://app.pagescms.org (sign in with GitHub).
# GENERATED by \`npm run cms:build\` from src/lib/taxonomy.ts and src/content/tags.json. Do not edit by hand:
# \`npm run check:cms\` (and CI) fails if this file is out of date. How to use it: docs/CMS.md
media:
  - name: article_images
    label: Article images
    input: src/content/insights/images
    output: ./images
    extensions: [png, jpg, jpeg, webp]
    rename: safe
settings:
  content:
    merge: true # keep any frontmatter key this file does not list
content:
  - name: articles
    label: Articles
    type: collection
    path: src/content/insights
    format: yaml-frontmatter
    subfolders: false
    exclude: ${list(hidden)}
    filename:
      template: "{primary}.mdx"
      field: create
    view:
      primary: title
      fields: [number, type, category, publishDate, draft]
      sort: [publishDate, number, title]
      default:
        sort: publishDate
        order: desc
    fields:
${fieldsYaml({})}${templateGroup()}`;
}

if (import.meta.url === new URL(process.argv[1], 'file://').href || process.argv[1]?.endsWith('build-cms-config.mjs')) {
  const file = new URL('.pages.yml', root);
  const next = buildConfig();
  if (process.argv.includes('--check')) {
    let current = '';
    try {
      current = readFileSync(file, 'utf8');
    } catch {}
    if (current !== next) {
      console.error('.pages.yml is out of date. Run `npm run cms:build` and commit the result.');
      process.exit(1);
    }
    console.log('.pages.yml is up to date.');
  } else {
    writeFileSync(file, next);
    console.log('Wrote .pages.yml');
  }
}
