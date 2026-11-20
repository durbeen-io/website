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

**Live now:** `Build and contrast` (`.github/workflows/checks.yml`): `npm ci`, `npm run check:contrast`, `npm run build`. Axe, Lighthouse CI and the link check are added in the last Phase 2 PR.

## Security headers (Phase 7)

Set in `public/_headers`: Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, `frame-ancestors 'none'`. Verify with an external header scanner before launch.

## Domain (Phase 8)

durbeen.io is registered on Cloudflare. `www` redirects to the main address, HTTPS only ("Always Use HTTPS"). Connected only after launch approval.
