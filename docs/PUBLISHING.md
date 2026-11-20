# Publishing an article

The weekly routine. Goal: **under 10 minutes** from a finished draft to live.

> **Partly usable.** The content rules (frontmatter, tags, template) are enforced by the build now. The article page, Insights list and search arrive in Phase 4, so a published article has no page of its own yet. Six sample articles (`sample-*.mdx`, all `draft: true`) test the site and are deleted in Phase 6.
>
> **Drafts:** `npm run dev` shows drafts. A normal build hides them. To test a build with drafts, run `DURBEEN_INCLUDE_DRAFTS=1 npm run build`.

## Routine

1. **Create a branch** for the article, for example `article/why-im-building-durbeen`.
2. **Copy the template:** `src/content/insights/_template.mdx` to `src/content/insights/my-article.mdx`.
3. **Fill in the frontmatter** (below), then write the article.
4. **Preview locally:** `npm run dev`.
5. **Run the pre-publish checklist** (below).
6. **Commit, push and open a pull request.** Automatic checks run (build, frontmatter, links, accessibility, Lighthouse). A failing check blocks the merge.
7. **Check the preview URL** that Cloudflare posts as a comment on the pull request.
8. **Merge.** Cloudflare Workers publishes `main`.
9. **After it is live and indexed**, republish on dev.to, Medium and LinkedIn with a canonical link back to durbeen.io.

## Frontmatter template

```yaml
---
title: ""                  # required
description: ""            # required, 120 to 160 characters (meta description)
number: 0                  # log number, e.g. 12 shows as N°012
category: ""               # see allowed values
type: ""                   # see allowed values
level: ""                  # Beginner | Intermediate | Advanced
tags: []                   # 3 to 5, must exist in src/content/tags.json
series: ""                 # optional
author: "Fahad Ehsan"
publishDate: 2026-01-01
updatedDate:               # optional
lastVerified:              # optional; tool and review articles show "Last verified [date]"
featured: false
heroImage: ""              # optional
heroAlt: ""                # required if heroImage is set
ogImage: ""                # optional; generated automatically if missing
draft: true                # drafts never build to production; set false to publish
affiliate: false           # true shows the disclosure note automatically
canonicalSource: ""        # optional; only if first published elsewhere
scorecard:                 # Review type only
  setup: 1                 # 1 to 5
  docs: 1
  maintenance: 1
  safety: 1
  verdict: ""              # one sentence
---
```

The build fails on invalid values.

### Allowed values

| Field | Values |
|---|---|
| Category | AI · Open Source & GitHub · Automation & Productivity · Software & Tools · Building Products · Business & Innovation |
| Type | Review · Comparison · Guide · Experiment · Build Note · Insight · Visual |
| Level | Beginner · Intermediate · Advanced |

Tags come from `src/content/tags.json` (keep it under about 30). To use a new tag, add it to that list first.

## Image rules

- Use Astro's image component; WebP/AVIF and responsive sizes are automatic.
- **Alt text is required.** The build fails without it.
- Captions look like `FIG. 03 — description`.
- No decorative stock images. Every image must have a purpose.
- Keep source images reasonably small; do not commit huge originals.

## Pre-publish checklist

- [ ] Based on real, first-hand experience; says what happened, including the negatives
- [ ] Plain, direct English; short sentences; no hype
- [ ] Sources linked for every claim that is not first-hand
- [ ] Meta description is 120 to 160 characters
- [ ] One category, one type, one level and 3 to 5 tags
- [ ] Alt text on every image
- [ ] Review articles: scorecard filled in and "last verified" date set
- [ ] Affiliate links: `affiliate: true` is set
- [ ] `draft: false`
- [ ] No secrets, tokens, private URLs or personal data
- [ ] Preview checked on desktop and at 375px phone width
- [ ] Every page in the connection map for a new article updates (Home log, Insights list, category and tag pages, related articles, RSS, sitemap, search)

## Images

- Put images in `src/content/insights/images/` and use normal Markdown: `![Alt text that describes the image](./images/my-image.png "Caption text")`.
- **Alt text is required.** The build fails without it. The text in quotes becomes the caption, shown as `FIG. 01 — …` (numbered automatically).
- For a hero image set `heroImage: ./images/my-hero.png` and `heroAlt: "…"` in the frontmatter.
- Astro makes AVIF and WebP copies at several widths. Upload one good original (about 1600px wide or more); do not resize by hand.

## Social-preview (OG) images

Each article gets a preview image automatically at build time (`/og/<slug>.png`): the number, type, reading time and title on the Durbeen layout. You do nothing. To use your own image instead, set `ogImage` in the frontmatter to a path under `public/` (1200x630 works best). Check the result in the built page's `og:image` tag or with a link-preview tool after the preview deploy.
