# Deployment

> **Status (Phase 0):** the site, the Cloudflare project and the checks do not exist yet. This page records the intended setup and will be updated as each part is built.

## How it works

| Branch | Where it goes |
|---|---|
| `main` | Production (durbeen.io). **Not connected until the Phase 8 launch approval.** Until then `main` deploys only to a `*.pages.dev` address |
| Any other branch or pull request | A preview URL on `*.pages.dev` |

- Hosting: Cloudflare Pages (free plan), connected to the GitHub repo `durbeen-io/website`.
- The site is static. The build produces plain files; there is no server code.
- Nothing is deployed to durbeen.io before the founder approves the launch.

## Build settings (intended)

| Setting | Value |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | Active LTS (currently 26) |

These will be confirmed when the Astro site exists.

## Environment variables

Names only. Never put values in this repo.

| Name | Purpose |
|---|---|
| None yet | |

## Automatic checks (from Phase 2)

Run by GitHub Actions on every pull request: build, frontmatter validation, broken-link check, accessibility (axe), Lighthouse CI. A failing check blocks the merge. They become *required* status checks on `main` once they exist.

## Security headers (Phase 7)

Set in `public/_headers`: Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, `frame-ancestors 'none'`. Verify with an external header scanner before launch.

## Domain (Phase 8)

durbeen.io is registered on Cloudflare. `www` redirects to the main address, HTTPS only. Connected only after launch approval.

## Rolling back

Rollback steps are kept in the private operations repository.
