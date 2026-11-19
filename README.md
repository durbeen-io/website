# Durbeen

**Durbeen** ([durbeen.io](https://durbeen.io)) is an independent technology lab and publication. "Durbeen" means *telescope*: look further, look closer, then build.

- Tagline: **Discover. Build. Innovate.**
- Method: Discover → Evaluate → Build → Share.
- Content: honest, first-hand articles on AI, open source, automation, tools and building products.

> **Status:** Phase 0 (setup). The site is not built yet. Nothing is deployed to durbeen.io.

## Stack

Astro with MDX, plain CSS (custom properties), self-hosted fonts, Pagefind search, Cloudflare Pages hosting. The site is fully static: no server code, no database, no login.

## Run it locally

The Astro site is not scaffolded yet. Once it is:

```bash
npm install
npm run dev      # local preview
npm run build    # production build
```

Requires Node.js LTS (currently v26).

## Where things are

| Path | What |
|---|---|
| `CLAUDE.md` | The project brief: decisions, design tokens, phases and working rules |
| `brand/` | Logo and icon files |
| `design-reference/` | Approved design mockups (visual references only) |
| `docs/PUBLISHING.md` | How to publish an article |
| `docs/DEPLOYMENT.md` | How builds, previews and production work |
| `docs/DECISIONS.md` | Decision log |
| `docs/CHANGELOG.md` | User-visible changes |

Operational and account documents are kept in a separate private repository and are not published here.

## Contributing

All changes to `main` go through a pull request. Never commit secrets, `.env` files or personal data.

## Licence

Not yet decided. Until a licence is added, all rights are reserved. The Durbeen name and logo are not licensed for reuse.
