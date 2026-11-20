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
| `Internal links (lychee)` | Checks internal links in `dist/` (offline, no external links). Config: `lychee.toml` | needs lychee installed; CI is the normal route |

- axe and Lighthouse use the Chrome already installed on the machine; no browser is downloaded.
- `lychee.toml` skips the nav and footer pages that are not built yet. **When a page ships, delete its line.** The list must be empty at the Phase 5 gate.
- The three new jobs are not yet *required* on `main`. Add them in GitHub branch protection after this PR is merged and has run once (the job names must exist first).
- The `lychee-action` is pinned to a full commit SHA, not a tag. To update it, look up the new release's SHA and change the version comment too.

## Security headers (Phase 7)

Set in `public/_headers`: Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, `frame-ancestors 'none'`. Verify with an external header scanner before launch.

## Domain (Phase 8)

durbeen.io is registered on Cloudflare. `www` redirects to the main address, HTTPS only ("Always Use HTTPS"). Connected only after launch approval.
