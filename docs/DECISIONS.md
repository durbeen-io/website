# Decision log

Format: date, decision, reason, alternatives rejected. Newest entries go at the bottom. Seeded from Part A of `CLAUDE.md`, where the full details live.

## 2026-11-18: Brand and positioning

| Decision | Reason | Rejected |
|---|---|---|
| Durbeen is an independent technology lab and publication, and the parent brand for future projects | Gives room to grow into services, products and projects | A personal portfolio; a generic AI agency; an "open-source company" (open source is a topic, not the identity) |
| Tagline "Discover. Build. Innovate."; method Discover → Evaluate → Build → Share | Short, and matches how the founder works | None recorded |
| Voice: plain, direct, first-hand, honest verdicts including negatives | Builds trust | Hype and buzzwords |

## 2026-11-18: Design

| Decision | Reason | Rejected |
|---|---|---|
| Design direction "Instrument Lab": Swiss minimalism with a precision-instrument feel, light-first with dark mode | Distinct, calm, readable | Gold or metallic looks, gradients, glow, shadows, stock images, generic icon rows, emoji |
| One accent colour: signal orange `#B4501E` (`#F08A4B` on dark). Final | Passes WCAG AA; distinctive | Teal (considered and retired) |
| Logo "Discovery": a D with a notch and open counter, plus a small star. No founder initials | Reads as a lens and a star; the founder's identity belongs in the byline and About page | Initials-based marks |
| Fonts: Inter Tight, Inter, JetBrains Mono, Doto (numerals only), self-hosted via @fontsource | Free, fast, no third-party requests | Google Fonts hosted links |
| Plain CSS with custom properties | Keeps dependencies and complexity down | Tailwind or another CSS framework |
| Square corners by default; rounded only on the app icon and avatar | Matches the instrument feel | Rounded UI |

## 2026-11-18: Architecture and tooling

| Decision | Reason | Rejected |
|---|---|---|
| Astro with MDX; content lives in the repo as Markdown/MDX | Durbeen owns its content; static output is fast and secure | A hosted CMS; Lovable for the site |
| Static site, no server code, database, login or admin panel | Architecture is the security model | Accounts, comments, a CMS login |
| Cloudflare for hosting, domain on Cloudflare (hosting product changed from Pages to Workers on 2026-11-19, see below) | One place for hosting, DNS, email routing and analytics | Other hosts |
| Pagefind for search; `@astrojs/rss` and `@astrojs/sitemap` for feeds | Static and free | Hosted search services |
| Kit (free plan) for the newsletter; double opt-in; hosted form endpoint | No custom data storage | Beehiiv, Buttondown (revisit at Phase 5) |
| Cloudflare Web Analytics | Free, no cookies | Google Analytics |
| GitHub Actions checks on every pull request: build, frontmatter, links, axe, Lighthouse | Failing checks block the merge | Manual checking only |
| Keep dependencies minimal; every new package is justified and approved | Less to maintain and secure | Installing packages freely |

## 2026-11-18: Content system

| Decision | Reason | Rejected |
|---|---|---|
| Every article has 1 category, 1 type, 1 level and 3 to 5 tags from a controlled list (series optional) | Consistent filtering and related-article logic | Free-form tags |
| Frontmatter is validated with zod; an invalid value fails the build | Catches mistakes before publishing | Unvalidated frontmatter |
| Products section stays hidden until a real product exists; deferred items (section 13 of `CLAUDE.md`) are not built before launch | Keep scope small | Building everything up front |

## 2026-11-18: Setup, security and repositories

| Decision | Reason | Rejected |
|---|---|---|
| GitHub organisation `durbeen-io`; public repo `website` | Free plan only offers branch protection and secret scanning on public repos | A private website repo |
| Sensitive documents live in a separate **private** repo (`durbeen-io/internal`), never in the public repo | Account and incident details must not be public | Keeping every doc in `docs/` |
| Branch protection on `main`: pull request required, 0 required approvals, force pushes and deletion blocked, applies to admins | The founder is the only member and cannot approve their own pull requests, but every change still goes through a PR | Requiring 1 approval (would block all merges); no protection |
| Required status checks are added in Phase 2, once the GitHub Actions exist | They cannot be required before they exist | Requiring checks now |
| Secret scanning, push protection and Dependabot alerts and security updates on | Free protection against leaked secrets and vulnerable packages | None |
| Commits use the GitHub noreply address | Avoids publishing a personal email in public history | Using a personal email |
| Node.js: use the current Active LTS (v26 "Lithium" as of 2026-11-18), installed with Homebrew | Long support window; matches the "Node LTS" rule | Pinning an older version; v24, which had already moved to maintenance |
| Deploy to a `*.workers.dev` address only (was `*.pages.dev`; changed 2026-11-19) until the Phase 8 launch approval | Nothing goes live on durbeen.io by accident | Early production deploy |

## 2026-11-19: Hosting and build setup

| Decision | Reason | Rejected |
|---|---|---|
| Host on **Cloudflare Workers with static assets**, not Pages | Cloudflare's docs now say "Start new projects with Workers" and that Workers supports most Pages use cases. Static files stay free and unlimited. Branch previews, `_headers` and rollbacks are all supported | Cloudflare Pages (still works, but migrating later would be extra work) |
| `wrangler.jsonc` committed to the repo before connecting Cloudflare | Without it Cloudflare opens its own pull request that adds an unneeded server adapter | Letting Cloudflare auto-configure |
| Serve on `durbeen-website.durbeen.workers.dev` only; durbeen.io not connected until Phase 8 | Nothing goes live on the real domain by accident | Early custom domain |
| Pre-launch `X-Robots-Tag: noindex` in `public/_headers`; remove at Phase 8 | The production `workers.dev` address is not hidden from search engines by default | Leaving the placeholder indexable |
| Pin the Node version with `.node-version` (26, the Active LTS) | The build uses the same major version as local development; the build image only preinstalls 22 and 24 | Relying on the build image default |
| Set `workers_dev` and `preview_urls` explicitly, and turn Wrangler telemetry off (`send_metrics: false`) | A Wrangler default can never change them silently; no usage data is sent | Relying on defaults |
| Branch previews use Worker Previews (`npx wrangler preview`, open beta) with an empty `"previews": {}` block in `wrangler.jsonc` | Cloudflare requires the block (it can be empty) and recommends Previews for branch testing; it keeps the fix in Git. A preview failure never affects the live site. **Fallback:** if Previews prove unreliable, change the Preview command in the dashboard (Settings > Build) to `npx wrangler versions upload`, the stable option, which makes a Version URL instead | `npx wrangler versions upload` from the start (older approach; not recorded in the repo) |
| Astro 7.4.13, official minimal template only, Astro telemetry off | Smallest possible start; features are added phase by phase | Adding integrations before they are needed |

## 2026-11-19: Design system (Phase 1)

| Decision | Reason | Rejected |
|---|---|---|
| Fonts via `@fontsource-variable` (Inter, Inter Tight, JetBrains Mono, Doto) | Self-hosted as the brief requires; one file covers all weights, so fewer downloads | Static per-weight `@fontsource` packages; Google Fonts |
| In dark mode the text on accent buttons is dark (`--on-accent: #101317`) | White on the lighter dark-mode orange would fail contrast | White text in both modes |
| Added `--band` / `--on-band` tokens for dark bands (`#1A1F25` in dark mode) | `--ink` turns light in dark mode, which would make the Method band light | Reusing `--ink` |
| Follow the brief, not the mockups, where they differ: no teal hover, nav ends with Toolkit (not Resources), wordmark letter-spacing 0.1em, brand favicon | The brief is the locked decision; the mockups are visual references only | Copying the mockup values |
| Internal `/design-system/` preview page, `noindex` | Lets the founder and reviewers see every token in light and dark. It is not one of the 12 pages. **Remove before the Phase 8 launch** (and keep it out of the sitemap) | Reviewing tokens only in code |
| Dark mode follows the system by default; the toggle sets a manual override saved in the browser (`localStorage`, key `theme`) | Respects the visitor's device setting and still lets them choose. No cookies, no server | Toggle-only (ignores system); three-way auto/light/dark switch (more UI for little gain) |
| Theme is applied by a tiny blocking script, `public/theme-init.js`, in `<head>` | Stops a flash of the wrong theme on load | Applying the theme after the page paints |
| Scripts are never inlined into the HTML (`assetsInlineLimit: 0` in `astro.config.mjs`) | Lets the Phase 7 Content-Security-Policy forbid inline script | Allowing `'unsafe-inline'` or hashing each inline script |
| Brand favicon files copied from `brand/` into `public/` (`favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`), replacing Astro's default | `public/` is what gets deployed; `brand/` stays the master copy. If a brand file changes, copy it again | Pointing the site at `brand/` (not deployed) |
| `<head>` links: `.ico` (32px), `.svg` (switches with dark mode), `apple-touch-icon`. `favicon-16.svg` and the 16/32 PNGs are not linked separately | The `.ico` already holds the 16 and 32px versions; fewer tags | Linking every size by hand |
| `Logo` component draws the mark inline from the brief's geometry, switching to the small-size star below 24px; D uses the text colour, star uses the accent | One source for every size, and light, dark and dark-band versions follow the tokens automatically | Using the SVG files as `<img>` (cannot follow dark mode or tokens) |
| No web app manifest (`icon-192`/`icon-512` are in `public/` but not linked) | Not in the brief; a manifest is only needed for installable-app behaviour. Add one only if the founder asks | Adding `site.webmanifest` now |
| Contrast is checked by our own small script, `scripts/check-contrast.mjs` (`npm run check:contrast`), which reads `tokens.css`. It fails if any pair is under 4.5:1 or if the two dark-mode blocks differ | Catches a bad colour change immediately; no new package. Plain Node, about 70 lines | A contrast library or only checking by eye |
| Hairlines (`--line`) are decorative and not contrast-checked. If a form input or button ever relies on a border alone to be seen, that border must use a colour with 3:1 | Brief treats hairlines as decoration; UI borders are a Phase 2 concern | Forcing 3:1 on all rules (would make the grid heavy) |

## 2026-11-20: Components and checks (Phase 2)

| Decision | Reason | Rejected |
|---|---|---|
| Phase 2 PR 7 adds dev-only `@axe-core/playwright`, `playwright-core` and `@lhci/cli`, and the `lycheeverse/lychee-action` (pinned to a full commit SHA). axe and Lighthouse use the runner's installed Chrome. Link check is blocking, offline (internal links only), with `lychee.toml` excluding only pages not yet built. Lighthouse SEO is not asserted until Phase 8 (`noindex`). Lighthouse uses the median of 3 runs | Rule 11 needs these checks; no browser download; a blocking link check that still passes today; a median is less noisy than one run; a SHA cannot be moved like a tag | Warning-only link check; `@axe-core/cli`; asserting SEO now (would fail on `noindex`); pinning by tag |
| GitHub Actions workflow `Build and contrast` (`npm ci`, `check:contrast`, `build`) runs on every pull request and is a required check on `main` | A failing check blocks the merge (rule 11); each later PR is checked from the start | Adding checks only at the end of Phase 2 |
| Axe and Lighthouse CI will be added as devDependencies only: `@axe-core/cli` and `@lhci/cli`. If axe-cli fails in CI from a Chrome/driver mismatch, switch to Playwright + `@axe-core/playwright` instead of patching. Lighthouse is warn-only in Phase 2 and blocking from Phase 3 | Smallest set of packages; the fallback is agreed in advance | Playwright first; patching a broken driver |
| New token `--ui-border` (`#80878E` light, `#6B737B` dark), at least 3:1 on paper and surface, used for buttons, chips and the theme toggle. `--line` stays decorative | Borders that carry meaning must reach 3:1; closes the Phase 1 open issue | Reusing `--line` |
| Button has four looks: primary (accent), ink (form submits), secondary (outline), text link. Hover swaps primary to ink | Matches the mockup sizes (52px high); the mockup's teal hover is not used (brief wins) | Teal hover |
| Header search button is off by default until Pagefind exists (Phase 4) | No control that does nothing. Known gap: with search on, the 375px header row wraps; fix in Phase 4 | A dead search button |
| Mobile nav is a MENU button below 860px; without JavaScript the nav stays open (`html.js` class set by `theme-init.js`) | Fits 375px; still usable with scripts off | Wrapping the nav as the mockup does |
| StatusStrip shows `LOG UPDATED date · N°nnn` only when a page passes the data | Nothing is invented; it comes from the latest article in Phase 3/4 | A hard-coded date |
| NewsletterForm posts to Kit's hosted form (`action` prop) and is shown disabled until it is set (Phase 5) | Never a form that looks live but goes nowhere; no custom data storage | A form with a placeholder endpoint |
| Footer links: Explore (Insights, Projects, Toolkit, About), Work with Durbeen, GitHub, RSS, policy links. **Resources is left out** of the footer for now (founder's call). LinkedIn is left out until the founder gives the URL | No link to a page that is not planned yet; no URL is guessed | A guessed LinkedIn link |
| Footer signup text is "New reviews and experiments. No spam.": no frequency, no free-download line. The Repo Safety Checklist line returns once the PDF exists (Phase 5) | Do not promise a send rate or a download that is not there yet | Keeping the checklist line from the mockup/brief now |
| Footer wordmark uses the brief's 0.1em tracking (mockup shows -0.02em) and `aria-hidden` | Brief rule for the wordmark; the text is decorative repeat | Mockup tracking |
| Header and Footer are in `BaseLayout`, so every page has them. The component preview page shows extra Header demos with unique landmark names | One place to change; avoids duplicate landmark names | Adding them page by page |
| PR screenshots are committed to `docs/pr-screenshots/` so PR descriptions can show them | Simple; no external image host | Uploading images to a third party. **Remove the folder before launch** |
| Branches are never stacked: one PR at a time, the next starts from updated `main` after the founder merges | Founder's working rule | Stacked branches |


## 2026-11-20: Content system (Phase 3, PR 1)

| Decision | Reason | Rejected |
|---|---|---|
| Add `@astrojs/mdx` (founder-approved list). Articles are `src/content/insights/*.mdx`, validated by a zod schema in `src/content.config.ts`; invalid frontmatter, a tag not in `src/content/tags.json`, a missing `heroAlt`, or a `scorecard` on a non-Review article fails the build | Brief section 9: the build must fail on invalid values | Validating in a separate script |
| Controlled tag list of 28 lowercase tags in `src/content/tags.json` (founder approves the list) | Brief: keep under about 30; a new tag means editing the list | Free-form tags |
| Two articles with the same log number fail the build (`src/lib/articles.ts`) | The log number is the article's identity (N°012) | Trusting the writer to check |
| Six sample articles, all `draft: true` and clearly marked as sample text, test Home and the blog engine. They are deleted in Phase 6 | Home needs content to build against; nothing fake can be published | Hard-coding fake articles in the page; real-looking fake titles |
| Drafts are hidden from every build unless `DURBEEN_INCLUDE_DRAFTS=1` (`npm run dev` shows them). CI jobs that audit pages set the flag; the Cloudflare deploy does not | Drafts never build to production (brief), but page checks need content to look at | A separate "samples" collection |
| Featured-card placeholder uses a black (ink) disc, not accent | Founder's call, and the brief limits the accent to links, buttons, the logo star and live dots. Correction: the mockup's own disc is accent orange (it looked black only because the mockup was opened outside its tool) | Accent disc |

## 2026-11-20: Home, first half (Phase 3, PR 2)

| Decision | Reason | Rejected |
|---|---|---|
| New components `ObservationLog` (framed list of LogRows with an honest empty line) and `Reticle` (the decorative statement graphic; `TARGET nnn` follows the newest article) | Brief section 11 rule 2: built once, reused | Page-only markup |
| `BaseLayout` reads the newest article and passes it to the status strip, so every page shows `LOG UPDATED date · N°nnn` | Connection map: a new article updates the strip everywhere without touching pages | Passing it page by page |
| The axe and Lighthouse CI jobs build with `DURBEEN_INCLUDE_DRAFTS=1` so they audit a page that has content; the link job and the Cloudflare deploy build without it | Auditing an empty home page proves little; the deploy must never include drafts. Job names are unchanged, so the required checks still match | Leaving CI on empty pages; including drafts in the deploy |
| "Read the latest" goes to the newest article, or `/insights/` when there are none. "See projects" goes to `/projects/` (still in `lychee.toml` until Phase 5) | No link to a page that does not exist unless it is on the planned list | A dead link |

## 2026-11-20: Home, Method and Projects (Phase 3, PR 4)

| Decision | Reason | Rejected |
|---|---|---|
| Projects live in a `projects` collection (`src/content/projects/*.md`: title, summary, status, order). Only the real project (durbeen.io) is listed | Founder: real projects only, no placeholders. Phase 5 reuses the collection for the list and detail pages | Hard-coded rows; `[Project 02]` placeholders |
| `ProjectRow` is plain text, not a link, until a project has its own page (Phase 5) | No dead links | A link to a page that does not exist |
| New token `--on-band-2` (#C5CAD0, same in both modes) for secondary text on dark bands, with a pair in `check:contrast` (10.8:1 and 10.1:1) | `--text-2` is dark in light mode and unreadable on the dark band | Reusing `--text-2` |
| Method steps are written in the page (four fixed steps from the brief), not in a collection | They never change per article; keeps it simple | A steps collection |

## 2026-11-20: Article page and SEO head (Phase 4, PR 1)

| Decision | Reason | Rejected |
|---|---|---|
| `site: 'https://durbeen.io'` in `astro.config.mjs`; every page gets a canonical URL, Open Graph and Twitter tags from `BaseLayout` | Canonical, sitemap and RSS need the final address. Pre-launch the site stays `noindex`, so nothing points search engines at an unlaunched domain | Leaving `site` unset |
| Authors write `<Callout>` and `<VerdictBox>` in `.mdx` without imports (the article page provides them) | Keeps the publishing routine under 10 minutes | Importing in every article |
| A Review's scorecard renders as a VerdictBox after the body, with call `n/20 OVERALL` (sum of the four scores) and the frontmatter verdict | The call is derived, not invented; only the verdict sentence is written | A separate scorecard component |
| Code blocks: Shiki theme `github-dark-high-contrast` on the site's dark band colour | Every token stays readable (AA); same look in light and dark mode, as in the mockup | Default theme (comments fail contrast) |
| Related articles: 2 points per shared tag, 1 for the same category, newest first on ties; previous/next by publish date | Brief: related by tags and category | Manual links |
| No avatar or photo in the byline until the founder supplies one; the byline reads "Fahad Ehsan, Founder, Durbeen" | No founder initials on the site (brief); nothing invented | The mockup's "FE" circle |
| Article titles are `Title | Durbeen`; JSON-LD is a data block, not a script, so the future CSP is unaffected | Unique title per page is a gate item | |

## 2026-11-20: Article extras (Phase 4, PR 2)

| Decision | Reason | Rejected |
|---|---|---|
| Reading-progress line is a 3px accent rule that follows the scroll position directly (no animation of its own), shown only when scripts run | Brief: respects reduced motion; decorative, so hidden from screen readers | An eased or animated bar |
| Share = two plain links (LinkedIn, X) and a Copy link button; no third-party share scripts | No tracking, no extra requests. Copy link shows only when scripts run | Share-button widgets |
| Share controls use words (`LINKEDIN`, `X`, `COPY LINK`), not the mockup's `in` and an icon | axe's label-in-name rule fails when a short visible glyph is not in the accessible name; real words pass and read better | Icons with `aria-label` |
| Code blocks get a `COPY` button added by a small script; without scripts they are plain code blocks | Progressive enhancement; no extra package | A copy library |

## 2026-11-20: Article images (Phase 4, PR 3)

| Decision | Reason | Rejected |
|---|---|---|
| `heroImage` uses Astro's `image()` in the schema (a real file in the repo), with `heroAlt` required | The build fails if the file is missing or has no alt text | A plain string path |
| One `ArticleImage` component handles every image: `Picture` (AVIF + WebP, widths 480-1600), lazy loading except the hero, a 24px blurred preview that the full image fades over, tap-to-zoom through one `<dialog>` per page | Brief section 9; native `<dialog>` gives focus handling and Esc for free; no package | A lightbox library |
| The zoom trigger is a link to the full image, so without scripts the full image opens | Progressive enhancement | A button that needs scripts |
| One 26 kB sample PNG (`src/content/insights/images/sample-figure.png`) is used by the sample drafts and is deleted with them in Phase 6 | Test data for image handling | Downloading a stock image |

## 2026-11-20: Insights list, category, tag and series pages (Phase 4, PR 4)

| Decision | Reason | Rejected |
|---|---|---|
| Filters are three radio groups (Category, Type, Level, each "All" or one value), shown only when scripts run; the choice is kept in the address (`?level=Beginner`) | Native radios give keyboard and screen-reader support; shareable links; without scripts the full list still shows | Custom buttons with ARIA; server-side filter pages |
| Only values that at least one article uses are offered as filter choices | No filter that leads to an empty list | Always listing all 6 + 7 + 3 values |
| Category pages exist for all six categories (empty ones are `noindex`); tag and series pages only for tags and series in use | Brief: one page per category (6); no thin pages for unused tags | Pages for all 28 tags |
| The controlled lists live in `src/lib/taxonomy.ts` (schema, filters and category pages all import it) | One source of truth | Repeating the lists |
| No pagination yet | Under ten articles; revisit after 10 published articles | Pagination now |
| `lychee.toml`: the `/insights/` entry is removed (the page shipped); `rss.xml` stays until the feed ships | The file's own rule | Leaving stale entries |

## 2026-11-20: Search (Phase 4, PR 5)

| Decision | Reason | Rejected |
|---|---|---|
| Add `pagefind` (dev dependency, founder-approved). The build script chains it, so Cloudflare's `npm run build` needs no change | Brief: Pagefind, static and free; avoids a Cloudflare setting change | A separate build command in the dashboard |
| Own search dialog on Pagefind's JavaScript API, not Pagefind's default UI | Matches the design system; no extra CSS/JS to override; Pagefind loads only when search is opened | Default UI |
| Only articles are indexed (`data-pagefind-body`); type and log number are stored as metadata | No nav/footer noise in results | Indexing every page |
| Esc always closes the search window (a search field would otherwise only clear its text first); the browser's blue clear button is hidden | Predictable keyboard behaviour; on-brand | Native behaviour |
| The 375px header fits the search button in one row (309 of 327px) without changes | Measured in Chrome | A separate small-screen header |

## 2026-11-20: RSS and sitemap (Phase 4, PR 6)

| Decision | Reason | Rejected |
|---|---|---|
| Add `@astrojs/rss` and `@astrojs/sitemap` (founder-approved). RSS lists published articles only (title, description, date, link, category + tags, author) | Brief section 9; drafts never appear because the feed reads through `getArticles()` | A hand-written feed |
| The sitemap filter excludes `/design-system/` (internal, removed before launch) and category pages with no published articles (they are `noindex`) | No mixed signals to search engines; closes the "keep it out of the sitemap" open issue | Listing everything |
| The category slug helper moved to `src/lib/taxonomy.ts` so `astro.config.mjs` can use it; the config reads article frontmatter itself to know which categories are populated | The config runs before Astro's content layer | Importing from `articles.ts` (needs `astro:content`) |
| `public/robots.txt` allows all and points to the sitemap; the `noindex` header in `_headers` still blocks indexing until Phase 8 | Standard; nothing is exposed because of the header | Adding robots.txt at launch |
| `lychee.toml`: the `/rss.xml` entry is removed (shipped) | The file's own rule | Stale entry |

## 2026-11-20: Open Graph images (Phase 4, PR 7)

| Decision | Reason | Rejected |
|---|---|---|
| Add `satori` and `@resvg/resvg-js` (founder-approved). One design, drawn at build time: paper background, mono metadata line, large Inter Tight title (size steps down for long titles), logo, faint reticle with the accent dot. Founder approves the look by viewing it | Brief: OG images auto-generated per article in the brand style; no third-party service | A screenshot service; a template per category |
| The Inter Tight and JetBrains Mono variable TTFs (Google Fonts repo, SIL OFL, licence texts included) live in `src/assets/og-fonts/` (about 770 kB) | satori cannot read the site's woff2 fonts; tested that satori renders both weights from the variable files, so no static instances are needed | Adding `@fontsource` static packages |
| `/og/default.png` is the image for every non-article page. An article's `ogImage` frontmatter overrides its generated image | Every page has a valid `og:image`; authors can still override | No image on non-article pages |
| OG images are always light mode | Link previews appear on both light and dark feeds; light is the brief's default | A dark variant |

## 2026-11-20: Scope change, blog first (Phase 5)

| Decision | Reason | Rejected |
|---|---|---|
| **Durbeen starts as a blog.** "Work with Durbeen" (page `/work-with-durbeen/`) is removed from the footer, the Phase 5 gate and the page inventory. **Deferred, not cancelled.** The plan is kept: 2-3 fixed-price service packages (scope, deliverables, price or "from" price, timeline), an email link to hello@durbeen.io and no contact form. It returns when the founder asks | Founder's call: focus on publishing first | Deleting the plan; building the page now |
| **The newsletter form is hidden** (footer and end of articles). The `NewsletterForm` component stays in the repo and on the internal preview page. Kit, double opt-in and the "Repo Safety Checklist" download are deferred and kept in brief section 13 | Founder's call; no form that cannot work yet | A disabled form |
| The footer now holds an intro line and **hello@durbeen.io as plain text** (not a mail link), plus Explore (now with Resources), Elsewhere and the policy links. No LinkedIn link until the founder supplies the URL | Email routing is not set up yet, so a mail link might fail; plain text is honest | A `mailto:` link |
| **New article type `Infographic`**; all other types (including Visual) stay. An Infographic needs a `summary` (200+ characters) which the page shows as a "TEXT VERSION" box above the article; the build fails without it | Founder: the written text summary must be on the page, not only alt text (accessibility and search) | Alt text only |
| **New series "AI for Engineers"**; the three existing series stay. Series are now a controlled list (`src/lib/taxonomy.ts`) so a typo cannot create a series; a series is never a category | Series pages are generated from the list | Free-text series |
| Phase 5 gate revised: no packages, newsletter or free-download items; added legal pages marked preliminary, a list of every `[BRACKET]`, and a Phase 8 gate item: no bracket or "preliminary" marker left on any page | Matches the new scope; stops placeholders reaching launch | Leaving the old gate |

## 2026-11-20: Projects (Phase 5)

| Decision | Reason | Rejected |
|---|---|---|
| Real projects only, using only the facts the founder gave: durbeen.io (in progress, public repo, link to `github.com/durbeen-io/website`, which exists), TokenSave (complete, v1.0, private repo, uses MarkItDown and Hazel) and a personal CV website (in progress, private repo) | No invented history or features | Placeholders |
| New project status **Complete** (alongside In progress, Planned, Live) | TokenSave is finished but private, so "Live" would mislead | Calling it Live |
| The schema rejects a repository URL unless `repo: Public` (build fails otherwise); a private repo is shown as "REPOSITORY: PRIVATE", never linked | Founder: no private repo links | Trusting the writer |
| Detail pages show a facts list (status, version, repository, built with) and the text from the project file; "built with" tools that have a Toolkit entry link to `/toolkit/#name` | Only facts; ties projects to the Toolkit (connection map) | A long case-study layout with nothing to put in it |
| The Projects header reuses the approved mockup heading "From notes to working tools." and its first sentence; the second sentence ("Every project starts as a field note") is left out because it cannot be verified | No unverifiable claims | Copying the mockup text unchanged |

## 2026-11-20: Toolkit (Phase 5)

| Decision | Reason | Rejected |
|---|---|---|
| The Toolkit data is one file, `src/data/toolkit.ts` (groups, items with id, name and one line). Adding a tool means adding one entry; its anchor is `/toolkit/#id` | Simplest thing that works; the connection map says a new Toolkit item updates the page and any article or project that links to it | A content collection per tool |
| Each line says what the tool is and where Durbeen uses it, using only facts the founder gave (daily use, learning, TokenSave uses MarkItDown and Hazel, this site runs on Astro, GitHub, Cloudflare). No opinions or experiences are invented. The lines for ChatGPT, Gemini and NotebookLM are deliberately plain until the founder adds a personal verdict | "One honest line each"; Editorial policy: no invented experience | Marketing blurbs |
| No external links and no affiliate links on the page. The page says so | Founder: no affiliate links. Official-site links can be added later after checking each one | Linking every tool's website |

## 2026-11-20: About and Resources (Phase 5)

| Decision | Reason | Rejected |
|---|---|---|
| About is 89 words. It states only what is known (what Durbeen is, that the name means telescope, the founder's name, the four topic areas, the first-hand promise). The founder's field, years of experience and reason for starting are `[BRACKET]` placeholders | Founder: under 150 words, brackets, no invented history | Writing a plausible backstory |
| `scripts/check-brackets.mjs` (`npm run check:brackets`) finds leftover `[CAPITALS]` placeholders and "PRELIMINARY" markers in `dist/`. It is a script, not a package, and not a CI job | Makes the Phase 8 "no placeholder left" gate checkable | Remembering to look |
| Resources: eleven links, grouped Durbeen / Built with / Learn. Only two URLs already existed in the repo (GitHub organisation and repository); the rest are the official homes of tools the project already names. Every URL was opened on 20 Nov 2026 and its final address and content confirmed. Corrections made while checking: Astro docs use `/en/getting-started/`; the Hazel product page 404s, so Hazel links to the Noodlesoft home page; GitHub's Hello World and Claude Code docs moved, so their final addresses are used | "Verified" means opened and read, not assumed | Linking from memory |
| No Bash link: gnu.org returned 403 to every automated check, so it could not be verified | Do not list an unverified link | Listing it anyway |
| Resources links are not checked by CI (the link check is offline and internal only). The date "checked on" is shown on the page and in `src/data/resources.ts`; re-check in the monthly health check | Honest about what is automated | Claiming they are monitored |
| `hello@durbeen.io` is plain text, not a `mailto:` link, until Email Routing is set up | A mail link that bounces would look like a working feature | A mailto link |

## 2026-11-20: Legal pages (Phase 5)

| Decision | Reason | Rejected |
|---|---|---|
| Privacy, Terms, Editorial policy and Affiliate disclosure are **preliminary drafts**: each shows a "PRELIMINARY DRAFT" notice (shared `LegalLayout`). Privacy and Terms contain `[COUNTRY]` for the governing law. `npm run check:brackets` finds the notices and the placeholders, so none can reach launch unnoticed (Phase 8 gate) | Founder: draft, mark preliminary, ask which country's law applies before finalising. **Open question to the founder: which country's law applies?** | Presenting drafts as final; copying a generic template |
| The Privacy page states only what the built site does, checked in the build: the only storage is the light/dark choice in `localStorage` (no cookies), no third-party scripts or fonts, other hosts appear only as links the visitor clicks; Cloudflare hosts the site; no analytics yet (Cloudflare Web Analytics is planned and the page will be updated before it is switched on); email to hello@durbeen.io is read and used to reply | A privacy page must be true; analytics and a newsletter are not claimed because they do not exist yet | Generic boilerplate (cookies, tracking, newsletters) |
| The Editorial policy states the working method (first-hand testing, honest verdicts, "last verified" dates, corrections with an updated date) and that AI assistants help draft and edit from the founder's notes, with the founder reviewing and responsible for everything published. **Open question to the founder: confirm this AI-use statement is right** | It describes how articles are actually made | Saying nothing about AI |
| Affiliate disclosure says there are currently no affiliate links, and describes how they would be marked if that changes (the `affiliate: true` note already built into articles) | True today, and ready for later | A generic disclosure of links that do not exist |
| One external link, to Cloudflare's privacy policy, was opened and confirmed (200) | Verified links only | An unverified link |
| Defect found while checking: a line break before a link in an `.astro` file removed the space ("See<a>"). Fixed on Privacy and Editorial policy; a scan of all 47 built pages found no other case. Rule: keep the link on the same line as the word before it, or use `{' '}` | Text must read correctly | None |

## 2026-11-20: 404 page (Phase 5)

| Decision | Reason | Rejected |
|---|---|---|
| `src/pages/404.astro`: on-brand (reticle with `TARGET 404`), a Search button that opens the site search, a link home and the three latest articles. It is `noindex` and left out of the sitemap | Brief section 8: on-brand, with search and recent articles | A plain error page |
| Serving the page needs `"not_found_handling": "404-page"` in `wrangler.jsonc`. **It was tried and Cloudflare's branch build failed** (all earlier builds and all GitHub checks passed; cause unreadable from outside the dashboard), so it was reverted. The page is built but not yet served for unknown addresses. **Open: the founder needs to read the failed build's error in the Cloudflare dashboard** | A config change that breaks the deploy pipeline should not be merged | Merging the setting anyway

## 2026-11-21: Four categories and the approved tag list

| Decision | Reason | Rejected |
|---|---|---|
| **Categories are exactly four:** AI & AI Tools · AI for Engineers · GitHub & Open Source · Building Durbeen. Infographic stays a type. *Before:* AI · Open Source & GitHub · Automation & Productivity · Software & Tools · Building Products · Business & Innovation. Category pages are now `/insights/category/ai-ai-tools/`, `ai-for-engineers/`, `github-open-source/`, `building-durbeen/` (nothing was live, so no redirects are needed) | Founder's call: the categories should match the four topic areas | Keeping six |
| **Tag list approved: 32 tags** (the proposed 29 plus `engineering`, `inspection-qa`, `standards`). It is slightly over the brief's "about 30"; the founder chose it | Founder's approval | Trimming to 30 |
| Sample drafts were remapped: Open Source & GitHub → GitHub & Open Source; Automation & Productivity and the infographic → AI for Engineers; AI and Software & Tools → AI & AI Tools; Building Products and Business & Innovation → Building Durbeen. Two drafts were retagged (they used removed tags) | The build fails on removed values, which proves the rule works: an old category and a removed tag both exit 1 | Leaving the drafts invalid |
| **Flag for the founder:** two series share a name with a category ("AI for Engineers"; "Building Durbeen in Public" vs "Building Durbeen"). Earlier the founder asked that series not duplicate categories; this follows the latest instruction. Both pages exist at different addresses (`/insights/category/…` and `/insights/series/…`) | Not mixing up the two is the author's job; a rename of either is a one-line change | Silently renaming a series |

## 2026-11-21: Project status, legal country, style card

| Decision | Reason | Rejected |
|---|---|---|
| Personal CV website: status **Live**, summary "A personal CV website.", repository private, **no link** (the founder's link field was left blank) | Only the facts given; a Live project with no link is stated as it is, to be completed when a URL is supplied | Inventing a URL |
| Legal pages name **India** as the governing law; Terms add "the courts of [CITY], India" with `[CITY]` still to fill in. The notice on each page now says it has "not had a legal check yet". Pages stay **PRELIMINARY** until the founder's legal check | Founder's answer; no statute is cited because that needs the legal check | Citing specific Indian statutes without review |
| The Editorial policy's AI-use statement is **confirmed** by the founder | Resolves the open question | None |
| `docs/INFOGRAPHIC-STYLE.md`: a one-page style card whose 19 hex codes were checked against `tokens.css` (all match), with a paste-ready brief for an image tool | Founder wants to brief ChatGPT for infographics | Typing the colours from memory |

## 2026-11-21: Pages CMS (enhancement 1)

| Decision | Reason | Rejected |
|---|---|---|
| Use **Pages CMS** (hosted at app.pagescms.org, GitHub login) with a `.pages.yml` at the repository root. Nothing is added to the site or its dependencies | Documented support for our schema; adds no server code, so the site stays static; free | Keystatic |
| **Keystatic rejected:** its admin needs server-side rendering, an Astro adapter and the React integration, and its documentation and community guides say it cannot be used with a fully static build | Our architecture is static with no server code (brief section 15); also needs three new packages | Adding an adapter and SSR |
| `.pages.yml` is **generated** by `scripts/build-cms-config.mjs` from `taxonomy.ts` and `tags.json`; `npm run check:cms` (a step of the required "Build and contrast" CI job) fails if it is stale | The dropdowns can never drift from the build's rules; no YAML package needed | Hand-copying the lists |
| The article body is a **code editor in MDX**, not rich text. Pages CMS's rich-text editor only outputs Markdown or HTML, which would risk breaking `<Callout>` and `<VerdictBox>` | MDX components are part of our articles | Rich-text body |
| The article schema treats an empty optional value (`series: ""`, an all-empty scorecard) as not set. A half-filled scorecard still fails. Tested both ways | A CMS may write blanks; I cannot see its exact output from here | Hoping it omits them |
| New articles start as `draft: true` in the CMS | A new post must be switched on to publish | Default off |
| Editing goes through a `content` branch and a pull request (not `main`) because of branch protection. Pages CMS cannot open the pull request itself, as far as its documentation says. **No GitHub setting was changed; installing the Pages CMS GitHub App is the founder's step** | Branch protection applies to admins too; the founder asked to be told before any GitHub setting | Loosening branch protection |
| **Not tested in the live app.** Three points need the founder's login: `.mdx` files listing and opening, the body editor not altering MDX components, and the relative image path `./images/…`. A test list is in `docs/CMS.md` | Honesty about what was and was not run | Claiming it works |

## 2026-11-21: Post templates (enhancement 2)

| Decision | Reason | Rejected |
|---|---|---|
| One starter file per type in `src/content/insights/`: `_template-guide`, `-build-note`, `-review`, `-comparison`, `-infographic`, each with the headings that type needs and `[FILL: hint]` markers. The leading `_` keeps them out of the published site | The founder asked for one starter per type with clear markers; files are the single source | One generic template |
| In Pages CMS the templates appear as a **Start a new article** group with one entry per type. They are **generated from the template files** (type, level, category, series where certain, title, description, summary, hero alt and the body become field defaults), so the CMS and the files cannot differ. Pages CMS has no documented "new from template", so this uses its documented per-field `default`. Each entry shares the Articles folder and lists that type's articles through `view.default.search` | The only documented route to "also available in the CMS". Whether several entries can share one folder is **not confirmed by its documentation and not tested in the live app** (point 4 of the first test) | File entries for the templates (cannot create from them) |
| A **published** article (`draft: false`) that still contains `[FILL]` fails the build; drafts may contain it. Tested both ways, and tested that each template, once filled in, builds as a published article | A leftover marker must never go live | Relying on the pre-launch bracket check, which only covers the built pages |
| The generator refuses a template whose description placeholder is not 120-160 characters, or whose Infographic summary placeholder is under 200 | A new draft made from a template should not fail the build for length; the check caught a 199-character placeholder while building this | Fixing lengths by hand |
| Tag lists are deliberately not pre-filled in the templates | The build requires 3 to 5 tags, so the author must choose; a wrong default would be worse | Guessing tags |

## 2026-11-21: Answers to the open questions

| Decision | Reason | Rejected |
|---|---|---|
| **Series "AI for Engineers" removed** (the category of the same name stays). Series are now: Building Durbeen in Public, GitHub Mastery, Repo Reviews. The infographic sample draft lost its series; the template comments and `.pages.yml` were updated. This also resolves the earlier flag about series and categories sharing names (the remaining overlap, "Building Durbeen in Public" vs the category "Building Durbeen", is a different name) | Founder's call: the category covers it | Keeping both |
| **About now holds the founder's own text**, supplied by the founder (Instrumentation & Controls engineer, 18+ years, Oil & Gas and water projects, GCC; no phone number, no ID numbers). The whole page body is 123 words. It is the founder's choice to publish this, so it now also appears in this public repository and its history | Founder supplied it for the page; the brief's "no founder background in the public repo" is about private strategy material | Placeholders |
| Terms: governing law India, courts of **Hyderabad**, India. The legal pages stay PRELIMINARY until the founder's legal check | Founder's answer | Citing statutes without a legal check |
| Personal CV website: **Live**, link `https://fahadehsan-cv.lovable.app/` (opened and returned HTTP 200 with no redirect before adding), description "My professional CV site, built with Lovable (AI app builder).", repository still private. New optional `url` field on projects shows a "LIVE SITE" fact | Founder's answer; link verified | Adding an unverified link |
| GitHub auto-merge for content pull requests is **documented in `docs/CMS.md`, not switched on** (steps checked against GitHub's documentation) | The founder asked to be told before any GitHub setting; it is a repository setting | Changing the setting myself |
