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
| Cloudflare Pages (free), domain on Cloudflare | One place for hosting, DNS, email routing and analytics | Other hosts |
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
| Deploy to `*.pages.dev` preview URLs only until the Phase 8 launch approval | Nothing goes live on durbeen.io by accident | Early production deploy |
