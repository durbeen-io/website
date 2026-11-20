# Deployment

> **Status (Phase 0):** the placeholder site is live at **https://durbeen-website.durbeen.workers.dev**. It is hidden from search engines. durbeen.io is **not** connected; that happens at the Phase 8 launch, after founder approval.

## How it works

Hosting is **Cloudflare Workers with static assets**, built from GitHub by Workers Builds. Cloudflare recommends Workers over Pages for new projects (see `DECISIONS.md`).

| Branch | Where it goes |
|---|---|
| `main` | Production build, deployed to `durbeen-website.durbeen.workers.dev`. **durbeen.io is not connected until Phase 8** |
| Any other branch or pull request | A preview build with its own preview URL. Cloudflare posts it as a comment on the pull request |

- The site is static. The build produces plain files in `dist/`; there is no server code.
- Nothing is deployed to durbeen.io before the founder approves the launch.
- Rolling back: see the private operations repository.

## Settings

| Setting | Value |
|---|---|
| Worker name | `durbeen-website` (must match `name` in `wrangler.jsonc`, or the build fails) |
| Production branch | `main` |
| Preview builds | On |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` (default) |
| Preview command | `npx wrangler preview` (default) |
| Node version | 26, from `.node-version` |
| Config file | `wrangler.jsonc` (assets directory `./dist`; `workers_dev` and `preview_urls` on; Wrangler telemetry off) |

## Environment variables

Names only. Never put values in this repo.

| Name | Purpose |
|---|---|
| None yet | |

## Before launch: remove the noindex rule

`public/_headers` currently sends `X-Robots-Tag: noindex` on every response, so search engines ignore the placeholder site. **Remove that rule at Phase 8**, or Google will never index durbeen.io. Replace the file with the real security headers (Phase 7).

## Automatic checks (from Phase 2)

Run by GitHub Actions on every pull request: build, frontmatter validation, broken-link check, accessibility (axe), Lighthouse CI. A failing check blocks the merge. They become *required* status checks on `main` once they exist.

**Live now** (all in `.github/workflows/checks.yml`):

| Check (job name) | What it does | Run locally |
|---|---|---|
| `Build and contrast` | `npm ci`, colour contrast, build. **Required** on `main` | `npm run check:contrast && npm run build` |
| `Accessibility (axe)` | axe (WCAG 2.0/2.1 A and AA) on every built page, light and dark, at 375px. Any violation fails | `npm run build && npm run check:axe` |
| `Lighthouse (mobile)` | Lighthouse CI, median of 3 runs. Performance, Accessibility and Best Practices must be 90+. **SEO is not asserted until Phase 8**, when `noindex` is removed (see `lighthouserc.json`) | `npm run build && npm run check:lighthouse` |
| `Internal links (lychee)` | Checks internal links in `dist/` (offline, no external links), built with the sample drafts so article, tag and series pages are checked. Config: `lychee.toml` | needs lychee installed; CI is the normal route |

- axe and Lighthouse use the Chrome already installed on the machine; no browser is downloaded.
- Anchor (`#fragment`) checking is off: lychee 0.24 reports false errors on links like `/design-system/components/#button`.
- `lychee.toml` skips the nav and footer pages that are not built yet. **When a page ships, delete its line.** The list must be empty at the Phase 5 gate.
- The three new jobs are not yet *required* on `main`. Add them in GitHub branch protection after this PR is merged and has run once (the job names must exist first).
- The `lychee-action` is pinned to a full commit SHA, not a tag. To update it, look up the new release's SHA and change the version comment too.

## Security headers (Phase 7)

Set in `public/_headers`: Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, `frame-ancestors 'none'`. Verify with an external header scanner before launch.

## Domain (Phase 8)

durbeen.io is registered on Cloudflare. `www` redirects to the main address, HTTPS only ("Always Use HTTPS"). Connected only after launch approval.

## Analytics (Cloudflare Web Analytics)

Prepared and switched off (`ANALYTICS_TOKEN` in `src/data/site.ts` is empty). See `docs/ANALYTICS.md` for the token steps, the launch-day setting and the Content-Security-Policy entries (`script-src https://static.cloudflareinsights.com/beacon.min.js`, `connect-src cloudflareinsights.com`) for Phase 7.

## Search (Pagefind)

- `npm run build` is `astro build && pagefind --site dist`. Pagefind reads the built pages and writes the search index to `dist/pagefind/`. The Cloudflare build command stays `npm run build`, so no Cloudflare setting changes.
- Only articles are indexed (`data-pagefind-body` on the article page).
- **Phase 7 (security headers):** the Content-Security-Policy must allow `script-src 'self' 'wasm-unsafe-eval'`, because Pagefind uses WebAssembly. Test search again after the headers are set.

## Drafts in builds

`DURBEEN_INCLUDE_DRAFTS=1` makes a build include `draft: true` articles. The axe, Lighthouse and link jobs set it so they audit pages with content. The Cloudflare production and preview builds do **not** set it, so drafts never appear online. Never set it in Cloudflare.

## Before launch: placeholders

`npm run build && npm run check:brackets` lists every `[BRACKET]` placeholder and every "PRELIMINARY" marker on the built site (the internal design-system pages are skipped). It exits with an error while any remain. It is **not** a CI job (it would fail on purpose before the founder fills them in). The Phase 8 gate requires it to report none.

## 404 page

`src/pages/404.astro` builds `dist/404.html`. `wrangler.jsonc` has `"not_found_handling": "404-page"`, so Cloudflare answers an unknown address from a browser with that page and a 404 status. Checked on the branch preview on 20 Nov 2026: a browser-style request to an unknown address returned the "Page not found | Durbeen" page with status 404. A bare `curl` (no browser headers) still gets Cloudflare's plain "Not found"; that is how the setting works, not a fault.

The first attempt (20 Nov) looked as if this setting had broken the build. It had not. The Cloudflare log said `A preview with name 'phase-5/404' already exists [code: 100338]`, from `npx wrangler preview` (beta): a branch name clash, not the config.

## Known issue: "preview already exists" (code 100338)

Workers Builds runs `npx wrangler preview` for every non-production branch. If the same branch name is built twice (a branch pushed again after a build, or a branch name that was used before, for example a Pages CMS `content` branch), it can fail with `A preview with name '<branch>' already exists`. Nothing is wrong with the code.

- **Risk:** low. "Workers Builds: durbeen-website" is **not** a required check on `main` (the required checks are Build and contrast, Accessibility (axe), Lighthouse (mobile) and Internal links (lychee)), so a failed preview does not block a merge. Production deploys come from `main` and are a different path. The cost is a red cross on the pull request and no preview URL for it, which can hide a real Cloudflare failure.
- **Simplest fix (founder's choice, a Cloudflare or workflow change, not applied):** use a fresh branch name for each pull request (the rule already followed here). For Pages CMS, set its branch to a name that is new each time, or delete the old branch after each merge (GitHub: Settings, General, "Automatically delete head branches"), so the next push starts clean. If it still appears, delete the stale preview in the Cloudflare dashboard (Workers, durbeen-website, Previews).
- **Do not** add Workers Builds as a required check until this is solved.
