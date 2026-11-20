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
