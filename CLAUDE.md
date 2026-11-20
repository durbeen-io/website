# DURBEEN — Project Brief for Claude Code

> Read this whole file at the start of every session. Part A holds locked decisions and changes rarely.
> Part B (the Progress Log, at the end) is updated at the end of every session.
> Brief version: 1.5 · 20 Nov 2026 · Owner: Fahad Ehsan  (1.5: Durbeen starts as a blog; Work with Durbeen and the newsletter are deferred; new Infographic type and series; see docs/DECISIONS.md)

---

# PART A — LOCKED DECISIONS

## 1. What Durbeen is

- **Durbeen** (durbeen.io) is an **independent technology lab and publication**, and the parent brand for future projects, services and products.
- "Durbeen" means *telescope*. The core idea: **look further, look closer, then build.**
- Tagline: **Discover. Build. Innovate.**
- Method: **Discover → Evaluate → Build → Share.**
- It is NOT a personal portfolio, NOT a generic AI agency, and NOT an "open-source company". Open source is a content topic, not the identity.

## 2. Goals

- Publish useful, experience-based articles regularly (target: 1 per week).
- Business strategy is kept in the private internal repo.

## 3. Audience

Technology enthusiasts, developers and independent builders, entrepreneurs, businesses looking for practical digital solutions, and AI and automation users. Mainly English-speaking readers, with a strong base in Saudi Arabia, the Gulf and India.

## 4. Voice and tone

- Plain, direct English. Short sentences. No hype or buzzwords.
- First-hand: "I installed it, here's what happened."
- Honest verdicts, including the negatives.
- Labels and metadata are in monospace, uppercase and terse (an instrument feel).

## 5. Design direction: "Instrument Lab"

- Swiss minimalism plus a precision-instrument feel.
- References: Nothing, Teenage Engineering, Vitsœ, Vercel and Linear, with Apple's *pacing* (one idea per screen, generous space). Article reading is inspired by Works in Progress and Stripe Press.
- **Light-first**, with a proper dark mode.
- **Never use:** gold, metallic effects, gradients, glow, drop shadows, decorative stock images, rows of generic line icons, widely letter-spaced taglines, emoji, or any "invitation card" look.
- **Every visual element must have a purpose.**
- Signature motifs:
  - Thin rule lines and a visible grid
  - Monospace metadata, for example `N°012 · REPO REVIEW · 8 MIN`
  - Bracket section labels: `[ 01 ] INSIGHTS`
  - The telescope reticle or crosshair as the only illustration style
  - Dot-matrix numerals (Doto) for large step numbers only

## 6. Design tokens

### Colour — light (default)
| Token | Hex | Use |
|---|---|---|
| `--paper` | #F4F4F1 | Page background |
| `--surface` | #FAFAF8 | Panels and inputs |
| `--surface-2` | #E9EAE6 | Image placeholders, tabs |
| `--ink` | #14181D | Headings, primary text, dark bands |
| `--text` | #22272E | Article body |
| `--text-2` | #3A4149 | Secondary paragraphs |
| `--muted` | #5B636B | Metadata, labels (5.5:1 on paper) |
| `--line` | #D9DBD8 | Hairlines |
| `--accent` | #B4501E | **Signal orange.** Links, primary buttons, the logo star, live dots. About 4.7:1 on paper; white text on it is about 5:1 |
| `--accent-on-dark` | #F08A4B | Accent on dark surfaces |

### Colour — dark mode
| Token | Hex |
|---|---|
| `--paper` | #101317 |
| `--surface` | #1A1F25 |
| `--surface-2` | #232A31 |
| `--ink` | #F4F4F1 |
| `--text` | #E8E6E1 |
| `--text-2` | #C5CAD0 |
| `--muted` | #A3AAB1 |
| `--line` | #2A3038 |
| `--accent` | #F08A4B |

**Rules:**
- One accent colour only.
- All text must meet WCAG AA contrast (4.5:1, or 3:1 for text 24px and larger).
- Never put the accent on body text paragraphs.

### Typography (all free; self-host with @fontsource)
| Role | Font | Notes |
|---|---|---|
| Display and headings | **Inter Tight** 600/700 | Tight tracking (−0.02 to −0.04em) on large sizes |
| Body and UI | **Inter** 400/500/600 | Article body 19px / 1.72 line height |
| Labels, metadata, code | **JetBrains Mono** 400/500 | 11–12px, uppercase for labels |
| Big numerals only | **Doto** 900 | Dot-matrix style. Never for text |

**Scale:**
- Home hero: `clamp(48px, 7vw, 104px)`
- Article title: `clamp(40px, 5.6vw, 80px)`
- Section h2: `clamp(36px, 4.5vw, 64px)`
- Article h2: 30px
- Body: 19px (articles), 16–18px (UI)
- Labels: 11–12px

### Layout
- Max width 1360px with 40px side padding (24px on phones).
- Reading column of about 700px.
- 8px spacing base. Sections are padded 120–160px top and bottom on desktop.
- Square corners by default. Rounded corners only on the app icon and avatar.
- Touch targets at least 44px.
- Must work at a 375px phone width.

## 7. Logo: "Discovery" (approved 18 Nov 2026)

- **The mark:** a bold D with a forward notch on its left side and an open counter (the "lens"), plus a small circle (the "star") just beyond the top-right edge.
- **No founder initials.** The founder's identity lives in the byline and on the About page.
- **Files** (in `/brand/`):
  - `durbeen-mark.svg`
  - `durbeen-mark-on-dark.svg`
  - `durbeen-mark-black.svg`
  - `durbeen-mark-white.svg`
  - `favicon.svg` (32px and up; switches automatically in dark mode)
  - `favicon-16.svg` (16px micro-version), `favicon.ico` (16 + 32)
  - `durbeen-app-icon.svg`
  - `png/`: `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`
- **Geometry** (viewBox 0 0 100 100):
  - D (even-odd fill): `M10 8H50A42 42 0 0 1 50 92H10L18 50Z M32 26H50A24 24 0 0 1 50 74H32Z`
  - Star: `M82 12A6 6 0 1 0 94 12A6 6 0 1 0 82 12Z`
  - Small-size star, used below 24px: `M82 10A8 8 0 1 0 98 10A8 8 0 1 0 82 10Z`
- **Three size tiers** (all from the same geometry, tested as rendered files):
  1. **Master** (24px and up): the primary mark.
  2. **32px tier**: the small-size star (bigger, more gap). Used in `favicon.svg` and the app icons.
  3. **16px tier**: an optically adjusted micro-version on a 16px grid, with 3px walls and an enlarged star (`favicon-16.svg`).
- **Accent colour is final: signal orange #B4501E.** Teal was considered and retired. Do not reopen this.
- **Wordmark:** "DURBEEN" in Inter Tight 700, letter-spacing 0.1em. The optional tagline goes below it in JetBrains Mono, with normal letter-spacing.
- **Rules:**
  - The accent colour goes on the star only.
  - Clear space around the mark is at least the width of the D's wall.
  - Minimum size: 24px for the primary mark; use the small version below that.
  - Never use gradients, glow, shadows, outlines, rotation or stretching, and never move the star.

## 8. Site structure and navigation

**Main nav:** Insights · Projects · Toolkit · About · (search)
**Footer:**
- Intro line and **hello@durbeen.io as plain text** (no newsletter form until Kit is set up: deferred, section 13)
- Explore: Insights, Projects, Resources, Toolkit, About
- GitHub, LinkedIn (when the founder supplies it), RSS
- Editorial policy · Privacy · Terms · Affiliate disclosure

**Products** is hidden until a real product exists.

### Unique pages (11 planned, 1 deferred): built and approved one by one
| # | Page | URL | Design source | Phase |
|---|---|---|---|---|
| 1 | Home | `/` | Mockup **A, Instrument Lab** | 3 |
| 2 | Insights (all articles) | `/insights/` | List with filters by category, type and level (style from mockup B) | 4 |
| 3 | About | `/about/` | Mockup B's calm hero and pacing; founder story | 5 |
| 4 | Projects (list) | `/projects/` | Dark header band (mockup B) + project rows with status labels. Statuses: In progress · Planned · Complete · Live | 5 |
| 5 | Resources | `/resources/` | Curated repos, docs and learning links | 5 |
| 6 | Toolkit | `/toolkit/` | The tools the founder actually uses, grouped, each with a one-line honest note; affiliate-ready | 5 |
| 7 | ~~Work with Durbeen~~ | `/work-with-durbeen/` | **DEFERRED, not cancelled** (20 Nov 2026): Durbeen starts as a blog. The plan (2–3 fixed-price service packages with scope, deliverables, price or "from" price, timeline, plus an email link) is kept in section 13 and `docs/DECISIONS.md`. Not built, not in the nav or footer | – |
| 8 | Editorial policy | `/editorial-policy/` | How we test, how we use AI, affiliates, corrections | 5 |
| 9 | Privacy | `/privacy/` | Plain text | 5 |
| 10 | Terms | `/terms/` | Plain text | 5 |
| 11 | Affiliate disclosure | `/affiliate-disclosure/` | Plain text | 5 |
| 12 | 404 | — | On-brand, with search and recent articles | 5 |

### Templates (4): built once, they generate pages automatically
| # | Template | URL | Generates |
|---|---|---|---|
| A | Article | `/insights/[slug]/` | One page per article |
| B | Category | `/insights/category/[slug]/` | One page per category (6) |
| C | Tag | `/insights/tag/[slug]/` | One page per tag |
| D | Project detail | `/projects/[slug]/` | One page per project |

**Generated automatically (nothing to design):** `/rss.xml`, `/sitemap-index.xml`, the search index, OG images.

### Connection map: what updates what
| When this changes… | …these must update (and be checked at the gate) |
|---|---|
| A new article is published | Home (Observation Log, featured, recent) · Insights list and filters · its category and tag pages · related articles on other posts · series page (if any) · RSS · sitemap · search index |
| A project is added or its status changes | Home projects section · Projects list · its detail page |
| A Toolkit item is added | Toolkit page · any article that links to it |
| Header, footer or a shared component changes | Every page (check Home, an article and one plain page) |
| A design token (colour, font, spacing) changes | Whole site, light and dark mode |
| A new page is added | Main nav or footer · sitemap · this table and section 8 |

**Rule:** after building or changing anything, test that item **and every page listed next to it in the connection map**.

### Homepage A sections (in order)
1. Status strip: `DURBEEN / INDEPENDENT TECHNOLOGY LAB` · `LOG UPDATED [date] · N°[latest]`
2. Header with logo and nav
3. Hero:
   - Label: `[ 00 ] DISCOVER → EVALUATE → BUILD → SHARE`
   - Headline: **"Field notes from the edge of technology."**
   - Intro paragraph
   - Buttons: "Read the latest" (primary) and "See projects" (text link)
   - Right-hand **Observation Log** panel showing the 4 latest articles, auto-generated
4. Statement: "Look closer. Then build." with the reticle graphic
5. `[ 01 ] INSIGHTS`: 1 featured article plus 3 recent ones
6. `[ 02 ] METHOD`: a dark band with 4 steps and Doto numerals
7. `[ 03 ] PROJECTS`: rows with status labels (IN PROGRESS / PLANNED / LIVE)
8. Footer with the intro line, plain-text contact, links and the large DURBEEN wordmark (newsletter form hidden until Kit: deferred)

## 9. Blog system

**Content lives in the repo as Markdown/MDX:** `src/content/insights/*.mdx`. Durbeen owns its content.

### Content system: every article gets 1 category + 1 type + 1 level + 3–5 tags
| Label | Allowed values |
|---|---|
| **Category** (what it's about) | AI · Open Source & GitHub · Automation & Productivity · Software & Tools · Building Products · Business & Innovation |
| **Type** (what form it takes) | Review · Comparison · Guide · Experiment · Build Note · Insight · Visual · **Infographic** (needs a written text summary shown on the page) |
| **Level** | Beginner · Intermediate · Advanced |
| **Tags** | Lowercase, reused, from a controlled list in `src/content/tags.json` (keep it under ~30; adding a tag means adding it to the list) |
| **Series** (optional) | One of: "Building Durbeen in Public", "GitHub Mastery", "Repo Reviews", "AI for Engineers" (a controlled list in `src/lib/taxonomy.ts`; a series is a sequence of articles, never a category) |

**Frontmatter schema** (validate with Astro content collections + zod; the build fails on invalid values):
```yaml
title: string              # required
description: string        # required, 120–160 chars (meta description)
number: number             # log number, e.g. 12 → "N°012"
category: enum             # one of the 6 categories above
type: enum                 # one of the 8 types above
level: enum                # Beginner | Intermediate | Advanced
tags: string[]             # 3–5, must exist in tags.json
series: enum              # optional; one of the series above
summary: string            # required for type Infographic (200+ chars): the written text version shown on the page
author: "Fahad Ehsan"      # default
publishDate: date
updatedDate: date          # optional
lastVerified: date         # optional; tool/review articles → shows "Last verified [date]"
featured: boolean          # optional
heroImage: string          # optional
heroAlt: string            # required if heroImage is set
ogImage: string            # optional; auto-generated if missing
draft: boolean             # drafts never build to production
affiliate: boolean         # true → show the disclosure note automatically
canonicalSource: string    # optional; only if first published elsewhere
scorecard:                 # Review type only
  setup: 1-5
  docs: 1-5
  maintenance: 1-5
  safety: 1-5
  verdict: string          # one sentence
```

**Required features:**
- **Article page:** table of contents, reading time, level label, author byline, dates, "last verified" date, tags, share buttons (LinkedIn, X, copy link), related articles (by tags and category), next/previous links
- **A thin reading-progress line** at the top of articles (instrument style; it respects reduced motion)
- **The review scorecard component** (Review type): Setup · Docs · Maintenance · Safety, scored 1–5 in monospace, plus a one-line Verdict
- Code blocks with syntax highlighting and a copy button
- Pull quotes and callouts
- **Images:** Astro's image component; automatic WebP/AVIF; responsive sizes; lazy loading; a soft blur-to-sharp placeholder; captions styled `FIG. 03 — …`; tap to zoom. Alt text is required (the build fails without it)
- Category, tag and series pages; an Insights list filterable by category, type and level
- **Search:** Pagefind (static, free)
- **RSS feed** (@astrojs/rss) and **sitemap** (@astrojs/sitemap)
- **SEO:** unique title and meta description per page, canonical URLs, Open Graph and Twitter cards, JSON-LD (`Article`, `BreadcrumbList`, `Organization`)
- **Open Graph images** auto-generated per article in the brand style
- **Newsletter: Kit** *(DEFERRED, see section 13; the form is hidden)* (free plan up to 10,000 subscribers as of Nov 2026; recheck at Phase 5). Double opt-in. Embedded form in the footer and at the end of articles
- **A free download for subscribers** *(DEFERRED with the newsletter)* (lead magnet): first one is the "Repo Safety Checklist" PDF, delivered by Kit
- **Analytics:** Cloudflare Web Analytics (free, no cookies)
- **No user accounts, no comments, and no login** at launch

**Publishing workflow (the founder's weekly routine):**
1. Create `src/content/insights/my-article.mdx` from the template `_template.mdx`.
2. Write it, and preview locally with `npm run dev`.
3. Run the pre-publish checklist (`docs/PUBLISHING.md`).
4. Commit, push and open a pull request. Automatic checks run. Merge, and Cloudflare Workers publishes.
5. Republish on dev.to, Medium and LinkedIn with a canonical link back to durbeen.io (after the original is live and indexed).
6. The goal is under 10 minutes from a finished draft to live.

## 10. Technical stack

| Layer | Choice |
|---|---|
| Framework | **Astro** (current stable; check the version at setup) with MDX |
| Styling | **Plain CSS** with custom properties (the tokens above). No CSS framework |
| Fonts | @fontsource, self-hosted |
| Search | Pagefind |
| Hosting | **Cloudflare Workers with static assets** (free plan), built from GitHub by Workers Builds. Chosen over Pages because Cloudflare now recommends Workers for new projects (see `docs/DECISIONS.md`) |
| Repository | GitHub organisation `durbeen-io`, repo `website` |
| Domain | durbeen.io (registered on Cloudflare) |
| Email | hello@durbeen.io via Cloudflare Email Routing, forwarding to the founder's Gmail |
| Newsletter | *Deferred.* Kit (free plan), embedded form; free download delivered by Kit |
| Automatic checks | GitHub Actions: build, link check, axe accessibility, Lighthouse CI |
| Uptime | A free uptime monitor (chosen in Phase 7) |
| Builder | Claude Code on the founder's Claude Pro plan |

Keep dependencies minimal. Every new package must be justified and approved.

## 11. Working rules for Claude Code (non-negotiable)

1. **One task per session.** At the start of each session:
   - Read this file.
   - State the session goal.
   - Confirm it with the founder.
2. **Build in components.** Header, Footer, Logo, Button, Tag, ArticleCard, LogRow, SectionLabel, VerdictBox, Callout, TOC and NewsletterForm are each built once and reused everywhere.
3. **Ask before you:**
   - install anything (Node, packages, CLIs)
   - create accounts
   - change settings
   - connect a domain
   - deploy to durbeen.io
   - delete files
4. **Deploy only to the `*.workers.dev` address** (never durbeen.io) until the Phase 8 launch approval. The pre-launch `noindex` rule in `public/_headers` must be removed at Phase 8.
5. **One commit per finished piece,** with a clear message. Never commit secrets or `.env` files.
6. **Never set `ANTHROPIC_API_KEY`.** Usage must stay on the Pro plan.
7. **Accessibility in every component:**
   - Semantic HTML
   - Keyboard access and visible focus states
   - Alt text
   - `aria-label` on icon-only buttons
   - AA contrast
   - Respect `prefers-reduced-motion`
8. **Performance budget:** Lighthouse 90+ in Performance, Accessibility, Best Practices and SEO on mobile.
9. **At the end of every session:**
   - Run the build.
   - Check desktop and phone (375px) widths.
   - Commit.
   - **Update the Progress Log below** and any affected doc (public `docs/` or the private `internal` repo).
   - Tell the founder exactly what changed and what's next.
10. **Explain simply.** Give the reason behind each step in one line.

11. **Automatic quality checks (GitHub Actions, from Phase 2 onwards)** run on every pull request: build, frontmatter validation, broken-link check, accessibility check (axe), and Lighthouse CI against the performance budget. A failing check blocks the merge.
12. **Keep it simple.** Prefer the simplest solution that meets the brief. No new service, package or page without founder approval. Anything listed in section 13 stays out until the founder asks.
13. **Never in the public repo:** business strategy, revenue plans, founder background, and account or security details. These live in the private `internal` repo (section 16). If a task needs one of them, read it from there; do not copy it here, into `docs/`, into code comments, or into commit messages and pull requests.

## 12. Phases and gates

Every phase ends with a gate. **Every gate also includes: relevant `docs/` files updated.** **All gate items must pass and the founder must approve before the next phase starts.** A separate fresh Claude session reviews each phase against its gate, so the builder doesn't grade its own work.

| # | Phase | Gate (all must pass) |
|---|---|---|
| 0 | **Setup:** Node LTS, Git, repo, empty Astro site, Cloudflare preview, security baseline, docs skeleton | Preview URL loads · first commit exists · no secrets in the repo · `.gitignore` correct · 2FA confirmed on GitHub, Cloudflare and Gmail · branch protection, secret scanning and Dependabot on · private `internal` repo created with ADMIN, SECURITY and INCIDENT seeded · public `docs/` files created (DECISIONS seeded) |
| 1 | **Design system:** tokens, fonts, light and dark mode, logo files, base styles | All colour pairs pass contrast · fonts self-hosted · dark-mode toggle works and respects system preference · favicon works |
| 2 | **Components** (see rule 2) + automatic checks (rule 11) | Each matches the mockups · works by keyboard alone · correct at 375px · a component preview page exists · GitHub Actions checks run and block a failing pull request |
| 3 | **Homepage A** | Side-by-side match with the mockup · Lighthouse 90+ ×4 (mobile) · the Observation Log pulls real content |
| 4 | **Blog engine** (section 9), including filters, scorecard, level labels, reading line and image handling | A test article goes from draft to preview in under 10 minutes · invalid frontmatter fails the build · the connection map (section 8) updates correctly for the test article · RSS and sitemap valid · OG preview correct · search works · structured data passes Google's Rich Results Test |
| 5 | **Remaining pages:** Projects (list + detail template), Resources, Toolkit, About, Editorial policy, Privacy, Terms, Affiliate disclosure, 404, plus hello@durbeen.io as plain text (revised 20 Nov 2026: no Work with Durbeen, no newsletter, no free download) | Zero broken links (`lychee.toml` has no entries) · every page has a unique title and description · legal pages are marked preliminary until the founder confirms which country's law applies · every `[BRACKET]` placeholder is listed for the founder · hello@durbeen.io shows as plain text (mail delivery needs the founder's Email Routing setup, tested then) |
| 6 | **Launch content:** 3–5 real articles | Each has sources, alt text, a meta description and an OG image · no drafts published |
| 7 | **Pre-launch QA** | Chrome, Safari, Firefox and iPhone/Android checked · security headers set (`_headers`) and verified with an external header scanner · account access re-audited (ADMIN.md) · INCIDENT.md rollback tested once · analytics on · free uptime monitoring set up · Privacy, Terms, Affiliate and Editorial policy pages live · all earlier gates re-checked |
| 8 | **Launch** (founder approval required) | durbeen.io and www redirect correctly over HTTPS · live site matches the preview · Google Search Console verified and sitemap submitted · **no `[BRACKET]` placeholder and no "preliminary" marker left on any page** |
| 9 | **After launch** | Weekly publishing routine running · cross-posting with canonical links · monthly health check (links, Lighthouse, dependencies) · monthly export of the Kit subscriber list (once the newsletter exists) · uptime monitoring active |

## 13. Deferred: do not build until the founder asks

**Rule:** nothing here is built before launch. Revisit after 10 published articles. Revenue-related deferred items are kept in the private `internal` repo.

| Item | Note |
|---|---|
| **Quran Visuals** (see section 18) | Planned project; design already agreed |
| **Work with Durbeen** (page and service packages) | Deferred, not cancelled (20 Nov 2026). Plan: 2–3 fixed-price packages (scope, deliverables, price or "from" price, timeline) and an email link, at `/work-with-durbeen/`. Revisit when the founder asks. Details in `docs/DECISIONS.md` |
| **Newsletter (Kit) and free download** | Deferred (20 Nov 2026). The `NewsletterForm` component exists but is hidden. Plan: Kit free plan, double opt-in, form in the footer and at the end of articles, "Repo Safety Checklist" PDF as the first download |
| Contact form | Needs a Worker script (the site is static assets only), Turnstile and a way to send email. Email link only until then |
| "Now" page | What the founder is working on this month |
| Series landing pages beyond the basic series page | |
| Beginner glossary | |
| Footnotes / side notes, print styles | Reading-experience extras |
| llms.txt | Optional; Google says it has no effect on rankings (2026) |
| Arabic or Urdu versions | Only if the audience asks |
| User accounts, comments, chatbot, pop-ups | Not planned |

## 14. Design references

- The `design-reference/` folder holds the approved mockups:
  - `Main.dc.html`: homepage A
  - `HomeB.dc.html`: design source for About, Insights and Projects
  - `Article.dc.html`: article page
  - `Logos.dc.html`: logo system
- They are written in a mockup format: treat them as **visual and structural references**. Rebuild them as clean Astro components; don't copy the mockup runtime.
- The live design canvas is in the founder's Claude account ("Durbeen — Homepage & Article Mockups"). Ask the founder for screenshots if a detail is unclear.

## 15. Security, admin and access control

**Architecture = security.** The site is static (no server code, no database, no login, no admin panel on durbeen.io). Do not add any of these without founder approval.

Account inventory, roles and 2FA rules are kept in the private `internal` repo (`SECURITY.md`).

**Required controls:**
- **Branch protection on `main`:** changes go through a pull request (0 required approvals, because the founder is the only member); the founder reviews and merges it; force pushes and deletion are blocked; it applies to admins too. Required status checks (builds must pass) are added in Phase 2. Cloudflare deploys `main` to production and other branches to preview URLs.
- GitHub **secret scanning + push protection** and **Dependabot alerts** enabled.
- No secrets, tokens, `.env` files or personal data in the repo. `.gitignore` covers them.
- Minimal dependencies; each new package justified and approved; lock file committed.
- **Security headers** via `public/_headers`: Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors 'none'.
- HTTPS only; `www` redirects to the main address.
- Forms (newsletter) use the provider's hosted endpoint; no custom data storage.
- Any future visual editor (e.g. Keystatic) must authenticate through GitHub, keeping one point of control.

## 16. Documentation: public and private

Documentation is part of the product. Keep these files current, in plain English. It is split across **two repos** so that nothing sensitive is ever public.

### Public repo (`durbeen-io/website`, the `docs/` folder and README)
| File | Contents |
|---|---|
| `docs/PUBLISHING.md` | The founder's weekly article routine, the frontmatter template, image rules, pre-publish checklist |
| `docs/DEPLOYMENT.md` | How builds, previews and production work; Cloudflare settings that are safe to show; environment variables (names only) |
| `docs/DECISIONS.md` | Decision log: date, decision, reason, alternatives rejected (seed it from Part A of this file) |
| `docs/CHANGELOG.md` | Dated list of user-visible changes |
| `README.md` | What the project is, how to run it locally, where the docs are |

### Private repo (`durbeen-io/internal`, never public)
| File | Contents |
|---|---|
| `ADMIN.md` | Account inventory: who owns what, roles, 2FA status, where recovery codes are kept (location only, never the codes), how to add/remove a collaborator |
| `SECURITY.md` | The account and role table, 2FA rules and the controls in section 15 as a checklist, with the date each was last verified |
| `INCIDENT.md` | Step-by-step: account compromised, site down, bad deploy (how to roll back), domain/DNS problem, leaked secret |
| `STRATEGY.md` | Business strategy, revenue plans, founder background, the launch article plan and the Quran Visuals purpose |

**Rules:**
- ADMIN, SECURITY and INCIDENT must **never** be committed to the public repo. The public docs may say that a private repo exists, but must not copy its contents.
- Locally the private repo is cloned at `~/Projects/durbeen-internal`, **outside** the website folder, so it cannot be committed to the public repo by accident.
- Every session that changes behaviour, settings or workflow updates the relevant doc in the same commit (in the repo that holds that doc).
- Anywhere else in this file, "ADMIN.md", "SECURITY.md" or "INCIDENT.md" means the private copy.

## 17. Launch content plan

The launch article plan is kept in the private `internal` repo (`STRATEGY.md`). Phase 6 needs 3-5 real articles live at launch.

## 18. Deferred project: Quran Visuals

**Status:** idea agreed, **not to be built yet.** Start only when the founder asks (after the main launch).

**Purpose:** kept in the private `internal` repo (`STRATEGY.md`).

**Decisions so far:**
- Lives on durbeen.io as its own section (e.g. `/quran-visuals/`), with its own short introduction. Kept separate from the tech feed: not in the homepage log or the Insights list; one link in the footer or menu.
- Uses the same stack and design system. It can move to its own site later because it shares the templates.
- Adds 2 templates when built: a **gallery** (grid of same-shape 4:5 cards, monospace labels like `N°001 · AL-FATIHAH · 7 AYAT`, filter by series such as "Juz 30" or "Daily prayer surahs") and an **infographic page** (large image in a thin frame; full-screen with pinch-zoom and swipe to next/previous; high-resolution download; WhatsApp/X/copy-link sharing; a text version below with the Arabic surah name in Noto Naskh Arabic, the meaning and the founder's explanation).
- Tech and general infographics are separate: they go in Insights as the **Infographic** article type (written text summary required); **Visual** stays for other image-led pieces.
- Content accuracy matters: each infographic should cite the translation or tafsir it is based on.

---

# PART B — PROGRESS LOG (update every session)

## Status
- **Current phase:** 5 (Remaining pages) **BUILT and gate-reviewed** (20 Nov 2026). The gate items that depend on the founder are open: which country's law applies (legal pages stay preliminary), the `[BRACKET]` placeholders on About, Email Routing for hello@durbeen.io, and the Cloudflare build error behind the 404 page. Phases 2, 3 and 4 passed 20 Nov 2026
- **Last session:** 20 Nov 2026: scope change (blog first) and Phase 5 (PRs #36 to #42)
- **Next session goal:** resolve the founder items above and the tag-list approval, then Phase 6 (3-5 real articles, drafted by Claude from the founder's notes and edited by the founder).

## Completed
- 20 Nov 2026 (Phase 5 gate review, builder-run): built Projects (list + 3 detail pages), Toolkit, Resources, About, Privacy, Terms, Editorial policy, Affiliate disclosure and 404 (PRs #37 to #41). Gate results: `lychee.toml` has zero entries; 1,576 internal links on 50 pages, none broken (checked a second time with nothing excused); 0 duplicate or missing titles or descriptions on 48 pages; axe 0 violations on 48 pages x 2 modes; Lighthouse mobile 99-100 in all four categories on About, Projects, a project page, Toolkit, Resources, Privacy and Editorial policy, and the 404 page scores 100/100/100 with SEO 66 only because it is deliberately `noindex`; all 16 new addresses return 200 on the live workers.dev site; the production sitemap lists only real pages; no newsletter, Kit or Work with Durbeen text on any public page. `npm run check:brackets` lists 9 items (3 About placeholders, 2 `[COUNTRY]`, 4 PRELIMINARY notices). Links on Resources were each opened and confirmed on 20 Nov 2026 (corrections recorded in DECISIONS). **Failure reported honestly:** the 404 page is built but Cloudflare does not serve it for unknown addresses; adding `not_found_handling: "404-page"` to `wrangler.jsonc` made Cloudflare's branch build fail (reverted; build went green again), and the error text is only visible in the Cloudflare dashboard. Not tested: mail delivery to hello@durbeen.io (Email Routing not set up).
- 20 Nov 2026 (scope change, PR #36): Durbeen starts as a blog. Work with Durbeen and the newsletter/free download are deferred (kept in section 13 and DECISIONS), the newsletter form is hidden, new article type Infographic (text summary required) and new series AI for Engineers (series are a controlled list). Brief is now v1.5.
- 20 Nov 2026 (Phase 4 gate review, builder-run under the founder's working mode): (1) Draft to preview: a real throwaway PR with a test article had a live preview URL serving the article, RSS, sitemap, search index and OG image 95 s after the push (PR closed unmerged); CI takes about 4 min. (2) Invalid frontmatter fails the build (exit 1) for: short description, bad category, bad level, 2 tags, missing title, hero image without alt, scorecard on a non-Review, tag not in the list, image without alt text, duplicate log number (a gap found and fixed: drafts now count). (3) Connection map: a new article appeared on Home (log, featured, status strip), Insights list with filter data, its category, 3 tag pages and series page, related and series boxes on other articles, previous/next, RSS, sitemap, search and OG; verified by 20 file checks plus a real search for a unique word. (4) RSS, sitemap and index are well-formed XML (`xmllint`); the production build gives an empty valid feed and a sitemap of `/` and `/insights/` only. (5) OG images viewed (1200x630). (6) Search works by keyboard in Chrome at 1360px and 375px. (7) Structured data: Article, BreadcrumbList and Organization checked against Google's required properties, 0 problems. Lighthouse mobile (4 categories, median of 2) is 100 on the article, hero-article, Insights, category and tag pages. axe 0 violations on 35 pages x 2 modes; 1,097 internal links, none broken; 0 duplicate titles or descriptions.
- 20 Nov 2026 (Phase 4, PRs #27 to #33): #27 article page, SEO head, JSON-LD; #28 reading line, share, code copy; #29 article images (AVIF/WebP, FIG captions, zoom, hero); #30 Insights list, filters, category/tag/series pages; #31 Pagefind search; #32 RSS, sitemap, robots.txt; #33 OG images. Packages added (all founder-approved): `@astrojs/mdx`, `pagefind`, `@astrojs/rss`, `@astrojs/sitemap`, `satori`, `@resvg/resvg-js`, plus OFL font files in `src/assets/og-fonts/`.
- 20 Nov 2026 (Phase 3 gate review, builder-run under the founder's working mode): Home matches the mockup side by side in Chrome at 375px and 1360px, light and dark (checked by eye, not a pixel diff). Lighthouse mobile on `/` (median of 3, sample drafts included): Performance 100, Accessibility 100, Best Practices 100, SEO 100 (LCP 0.9 s, CLS 0). axe 0 violations; Tab reaches every control; no horizontal scroll. The Observation Log reads from the content collection, but only the six sample drafts exist, so it shows real content only from Phase 6. The deployed `workers.dev` build hides drafts, so it shows the empty states until real articles exist (or the preview env var is set, see Open issues). Known mockup deviations: nav says Toolkit; the "[ 02 ] METHOD" label uses the accent on dark (Phase 2 component) where the mockup is grey.
- 20 Nov 2026 (Phase 3, PRs #22 to #25): #22 content system (`@astrojs/mdx`, zod schema, 28-tag list, `_template.mdx`, six sample drafts, `src/lib/articles.ts`, duplicate log numbers fail the build); #23 hero, ObservationLog and Reticle components, status strip fed by the newest article on every page, CI axe and Lighthouse jobs build with sample drafts; #24 Insights section, ink placeholder disc; #25 Method band, Projects section, `projects` collection, ProjectRow, `--on-band-2` token with a contrast pair.
- 20 Nov 2026 (Phase 2 gate review): every gate item checked on `main` (`3250066`). Pass: build, contrast (all pairs, light and dark), axe (0 violations, 3 pages x 2 modes), keyboard (every focusable element reached by Tab, visible focus ring, ArticleCard ring on the whole card), 375px and 1360px (no horizontal scroll), preview page with all components, CI green on `main`. Branch protection on `main` now requires `Build and contrast`, `Accessibility (axe)`, `Lighthouse (mobile)` and `Internal links (lychee)` (up to date, applies to admins). Not tested: a failing check actually blocking a merge (founder chose to skip the throwaway-PR test), the open MENU panel by keyboard at 375px. Known deviations from the mockups: nav says Toolkit (brief wins); the featured-card placeholder disc was accent orange (correction: the mockup's own disc is accent too; it only looked black when opened outside its tool; the founder chose black, applied in Phase 3). Founder approved: Phase 2 is complete.
- 20 Nov 2026 (Phase 2, PR 7): added dev-only `@axe-core/playwright`, `playwright-core`, `@lhci/cli` and `lycheeverse/lychee-action` (pinned to SHA). Three new CI jobs: axe (all pages, light and dark, 375px), Lighthouse (median of 3, 90+ for Performance, Accessibility, Best Practices; SEO not asserted until Phase 8) and internal link check (lychee offline, `lychee.toml` excludes only unbuilt pages). Checked locally: build, axe (0 violations on 3 pages x 2 modes), Lighthouse CI passes. All five checks passed on GitHub Actions for this PR (lychee needed two config fixes for v0.24; it is not installed locally, so it only runs in CI). Anchor (#fragment) checking is off because lychee gives false alarms on directory-style links.
- 20 Nov 2026 (Phase 2, PR 6): TOC (anchor list, current section marked by a small script), Callout (note, warning; kind always written out) and VerdictBox (call + optional Setup/Docs/Maintenance/Safety scores in monospace). Checked: build, contrast check, 375px (no horizontal scroll), light mode. Not yet checked in a real browser: TOC current-section marking while scrolling, dark mode by eye (tokens only, contrast check passes).
- 20 Nov 2026 (Phase 2, PR 5): ArticleCard (default + featured; one stretched link on the title, so no nested links; figure slot with reticle placeholder) and LogRow (`<li>`, 44px+ target). Checked in headless Chrome: 375px (no horizontal scroll), light and dark; contrast check passes. Real images arrive with the Phase 4 image handling.
- 20 Nov 2026 (Phase 2, PRs 1-4): PR #13 GitHub Actions `Build and contrast` (required on `main`); PR #14 Button, Tag, SectionLabel, `--ui-border` token (3:1) and the `/design-system/components/` preview page; PR #15 Header (MENU button below 860px) and StatusStrip; PR 4 NewsletterForm (disabled until Kit, Phase 5), Footer, and Header + Footer wired into `BaseLayout`. Each PR checked in headless Chrome: keyboard tab-through, 375px (no horizontal scroll), 44px targets, light and dark. Brief followed over the mockups (Toolkit not Resources, 0.1em wordmark, no teal). Not yet checked: Safari, Firefox (Phase 7). Phase 2 is not finished: PRs 5-7 remain.
- 19 Nov 2026 (Phase 1 gate review): a fresh session checked every Phase 1 gate item. Contrast (14 pairs, light and dark) passes; fonts are self-hosted with no Google requests; favicon files match `brand/`; the live site matches the build. The founder tested the dark-mode toggle on Mac in Safari, Chrome and Brave and on iPhone: system setting followed, toggle works, choice remembered, no white flash. Founder approved. Phase 1 is complete. Still unchecked: Firefox and Android (Phase 7).
- 19 Nov 2026 (Phase 1): design system built. PR #7 tokens + `@fontsource-variable` fonts (Inter, Inter Tight, JetBrains Mono, Doto); PR #8 base styles, `BaseLayout`, internal `/design-system/` preview; PR #9 dark-mode toggle (follows system, saved choice, no flash; scripts never inlined, for the future CSP); PR #10 `Logo` component and brand favicon set; PR #11 `npm run check:contrast` (all 14 pairs pass in light and dark) and docs. Gate pre-check: contrast pass; fonts self-hosted; toggle works and respects system (Chrome); favicon is the brand mark (Chrome). Not yet checked: Safari, Firefox, iPhone (Phase 7). Mockup-vs-brief calls: followed the brief (no teal, nav ends with Toolkit, wordmark 0.1em).
- 19 Nov 2026 (Phase 0 gate review): a fresh session checked every Phase 0 gate item. All passed; Cloudflare and Gmail 2FA were confirmed by the founder, who approved the review. Phase 0 is complete. Minor follow-ups done in the closing pull request: Progress Log updated, `package.json` engines aligned with `.node-version`.
- 19 Nov 2026 (Phase 0): gate pre-check run. Fixes: `.dev.vars` added to `.gitignore`; README, CHANGELOG and the contact-form note updated to match the live setup. Account and access details are in the private repo.
- 19 Nov 2026 (Phase 0): Astro 7.4.13 minimal scaffold added (PR #2). Cloudflare Workers config and pre-launch `noindex` header added (PR #3); first deploy to `durbeen-website.durbeen.workers.dev` succeeded. Follow-up: Pages wording replaced by Workers, Node version pinned to 26 (`.node-version`), Wrangler telemetry off, `workers_dev` and `preview_urls` set explicitly. Account and access details are in the private repo.
- 18-19 Nov 2026 (Phase 0, partial): installed Homebrew, Node v26 (Active LTS), npm and the GitHub CLI. Created public repo `durbeen-io/website` and private repo `durbeen-io/internal`. First commit: brief, brand files, design references, `.gitignore`. Security baseline set (details in private repo). Public docs skeleton added: README, DECISIONS, PUBLISHING, DEPLOYMENT, CHANGELOG.
- 18 Nov 2026: brand, design direction, mockups, logo ("Discovery"), colour (signal orange), architecture and phase plan approved in planning (outside Claude Code).
- 18 Nov 2026 (v1.3): page inventory (12 pages + 4 templates) and connection map; content system (categories, types, levels, tags, series); Toolkit, Work with Durbeen packages, Editorial policy; Kit newsletter + free download; scorecard, level labels, last-verified dates, reading line, image handling; automatic checks; first 12 articles; Quran Visuals deferred project; deferred list expanded.
- 18 Nov 2026 (v1.2): added section 15 (security, admin, access control) and section 16 (documentation); gates updated.
- 18 Nov 2026 (v1.1): added dedicated 16px favicon tier + PNG/ICO icon set; accent colour confirmed final (orange).

## Open issues
**Waiting for the founder**
- Tag list: a proposal is awaiting approval (not applied). Applying it needs two sample drafts retagged.
- Which country's law applies to Privacy and Terms (`[COUNTRY]`); confirm the Editorial policy's AI-use statement; legal pages stay preliminary until then.
- About placeholders: `[YOUR FIELD]`, `[YEARS]`, `[WHY YOU STARTED DURBEEN]`.
- Cloudflare: open the failed build for the branch that added `not_found_handling` (Workers, durbeen-website, Builds) and read its error, so the 404 page can be wired up (see `docs/DEPLOYMENT.md`).
- Email Routing for hello@durbeen.io (shown as plain text; delivery untested).
- LinkedIn URL (footer has no LinkedIn link).
- Toolkit lines for ChatGPT, Gemini and NotebookLM are deliberately plain; add a personal verdict if wanted.
- Google's Rich Results Test on a real article (Phase 6); OG design was approved.
- Newsletter (Kit), free download and Work with Durbeen: deferred.

**For later phases**
- Delete the seven `sample-*.mdx` drafts in Phase 6 (and the sample image), and check nothing links to them.
- The deployed `workers.dev` site excludes drafts. To show sample content on branch previews, the founder can set `DURBEEN_INCLUDE_DRAFTS=1` for non-production builds in Cloudflare (a setting change, ask first). Never for production.
- Before Phase 8: remove `/design-system/` and `/design-system/components/` (and the sitemap filter line in `astro.config.mjs`), the `docs/pr-screenshots/` folder, the `noindex` header; run `npm run check:brackets` (must report none); turn on the Lighthouse SEO assertion.
- Phase 7: the CSP must allow `'wasm-unsafe-eval'` for Pagefind search (see `docs/DEPLOYMENT.md`); retest search after the headers.
- Resources links are not checked by CI; re-check monthly (Phase 9).
- Footer links are 44px tall but only 29-42px wide (RSS, Terms, About). Minor.
- Re-test the open mobile MENU panel by keyboard at 375px.
- Run a reverse image search and a trademark search on the logo (SAIP, IP India, WIPO) before public launch.

## Session history
| Date | Phase | What was done | Commit(s) | Next |
|---|---|---|---|---|
| 2026-11-18 | 0 | Installed tools, created both repos, security baseline (details in private repo), first commit | `f8fd6d7` | Docs skeleton |
| 2026-11-19 | 0 | Public docs skeleton and Progress Log | PR #1 (`4272615`) | Astro scaffold, Cloudflare preview |
| 2026-11-19 | 0 | Astro minimal scaffold; Workers config and noindex header; first deploy to workers.dev | PR #2 (`bbe2638`), PR #3 (`61931c2`) | Workers wording, Node pin |
| 2026-11-19 | 0 | Pages to Workers wording, Node pin, Wrangler settings, docs | PR #4 (`3bc3608`) | Gate pre-check |
| 2026-11-19 | 0 | Gate pre-check fixes: `.dev.vars` ignored, stale README, CHANGELOG and section 13 wording | PR #5 (`a0100b1`) | Fresh-session gate review |
| 2026-11-19 | 0 | Fresh-session Phase 0 gate review: all items passed, founder approved. Phase 0 marked complete; `engines` aligned with Node 26 | PR #6 | Phase 1 (design system), when the founder starts it |
| 2026-11-19 | 1 | Phase 1 design system built in five PRs: tokens and fonts; base styles and preview page; dark-mode toggle; Logo and favicon; contrast check and docs | PR #7 to #11 | Fresh-session Phase 1 gate review, then founder approval |
| 2026-11-19 | 1 | Fresh-session Phase 1 gate review: all items passed; toggle tested by the founder on Mac (Safari, Chrome, Brave) and iPhone; founder approved. Phase 1 marked complete | this pull request | Phase 2 (components + automatic checks), when the founder starts it |
| 2026-11-20 | 2 | Phase 2 PRs 1-4: checks workflow (required on `main`); Button, Tag, SectionLabel + preview page; Header + StatusStrip; NewsletterForm + Footer wired into BaseLayout; docs updated | PR #13, #14, #15, #16 | PR 5 (ArticleCard, LogRow) |
| 2026-11-20 | 2 | Phase 2 PR 5: ArticleCard and LogRow components + preview page sections; docs updated | PR 5 (this pull request) | PR 6 (TOC, Callout, VerdictBox), after the founder merges PR 5 |
| 2026-11-20 | 2 | Phase 2 PR 6: TOC, Callout, VerdictBox + preview page sections; CHANGELOG intro fixed | PR #19 | PR 7 (axe, Lighthouse CI, lychee, docs), after the founder merges PR 6 |
| 2026-11-20 | 2 | Phase 2 PR 7: axe, Lighthouse CI and lychee link check in CI; `lychee.toml`, `lighthouserc.json`, `scripts/check-axe.mjs`; docs | PR #20 | Phase 2 gate review |
| 2026-11-20 | 2 | Phase 2 gate review: all items passed (CI-blocking not demonstrated, by founder's choice); Progress Log fixed; founder approved. Phase 2 marked complete | PR #21 | Phase 3 (Homepage A) |
| 2026-11-20 | 3 | Phase 3 built (content system, hero + log, Insights, Method, Projects) and gate-reviewed | PR #22 to #26 | Phase 4 (blog engine) |
| 2026-11-20 | 4 | Phase 4 blog engine built (article page, extras, images, Insights list and filters, search, RSS and sitemap, OG images) and gate-reviewed (builder-run): all items passed; duplicate-number check now includes drafts; publishing guide updated; link job includes sample drafts | PR #27 to #33 and this pull request | Phase 5 |
| 2026-11-20 | scope + 5 | Scope change (blog first) and Phase 5 built: Projects, Toolkit, Resources, About, four legal pages (preliminary), 404; `check:brackets`; gate reviewed (builder-run) | PR #36 to #41 and this pull request | Founder items (tags, country, brackets, Cloudflare error), then Phase 6 |
