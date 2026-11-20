# Changelog

User-visible changes, newest first. Dates are when the change was made.

## Unreleased

Nothing is live on durbeen.io yet. A placeholder site is deployed to a Cloudflare `workers.dev` address and hidden from search engines. The site is being built: the design system, components and the home page are done; the blog engine is next (Phase 4).

### 2026-11-20
- Insights list (`/insights/`) with filters for category, type and level, plus category pages (all six), tag pages (tags in use) and basic series pages. Without scripts the full list still shows. Phase 4, PR 4.
- Article images: AVIF and WebP in several sizes, lazy loading, a soft blur-to-sharp preview, `FIG. 01 —` captions and tap-to-zoom. The build fails if an image has no alt text. Hero images are supported through frontmatter. Phase 4, PR 3.
- Articles: a thin reading-progress line at the top, share links (LinkedIn, X, copy link) and a copy button on code blocks. Phase 4, PR 2.
- Article page template (`/insights/[slug]/`): header with breadcrumb, byline, dates, reading time, type, level and tags; contents list, body styles, pull quotes, code blocks, callouts, review scorecard, affiliate note, signup, related articles and previous/next. Every page now has a canonical URL, Open Graph and Twitter tags; articles carry `Article` and `BreadcrumbList` data and the home page `Organization` data. Phase 4, PR 1.
- Home page, Method band (four steps, Doto numerals) and Projects section (one row: durbeen.io, in progress). Projects now come from a `projects` content collection. New token `--on-band-2` for secondary text on dark bands, with a contrast check. Phase 3, PR 4.
- Home page, Insights section: one featured article plus the next three, read from the content collection. The featured-card placeholder disc is now ink (black) instead of accent. Phase 3, PR 3.
- Home page, first half: the hero with the Observation Log (latest four articles, read from the content collection) and the "Look closer. Then build." statement with the reticle. The status strip now shows the newest article's date and number on every page. Phase 3, PR 2.
- Content system: articles are written as `.mdx` files, and the build fails on invalid frontmatter or a tag not on the approved list. Six sample drafts (hidden from every normal build) added for testing. Phase 3, PR 1.
- Three more automatic checks on every pull request: accessibility (axe, light and dark), Lighthouse (mobile, 90+ for Performance, Accessibility and Best Practices) and an internal link check. Pages that are not built yet are listed in `lychee.toml` until they ship. Phase 2, PR 7.
- TOC (contents list with the current section marked), Callout (note and warning) and VerdictBox (with optional Setup, Docs, Maintenance, Safety scores) components added to the hidden component preview page. They are not on any live page yet. Phase 2, PR 6.
- ArticleCard (featured and standard looks) and LogRow (one line of the Observation Log) components added to the hidden component preview page. They are not on any live page yet. Phase 2, PR 5.
- Header and Footer now appear on every page. Header: logo, nav (Insights, Projects, Toolkit, About), theme toggle, and a MENU button on small screens. Footer: newsletter box, link groups, the large DURBEEN wordmark and the policy links. Phase 2, PR 4.
- Newsletter form added. It is shown disabled ("SIGNUP OPENS AT LAUNCH") until Kit is connected in Phase 5.
- Header, status strip, Button, Tag and SectionLabel components added, with a hidden component preview page at `/design-system/components/`. Phase 2, PRs 2-3.
- Automatic checks added: every pull request now runs the build and the colour-contrast check, and the contrast check covers the new border colour for inputs and buttons. Phase 2, PR 1.
- Nav and footer links to Insights, Projects, Toolkit, About, Work with Durbeen, RSS and the policy pages lead to pages that do not exist yet. They are built in Phases 4-5.

### 2026-11-19
- Colour contrast check added (`npm run check:contrast`): every text and background pair passes WCAG AA in light and dark mode. Phase 1, step 5.
- Durbeen logo and favicon added to the site: browser-tab icon, iPhone home-screen icon, and a reusable Logo component (mark, wordmark, tagline; light, dark and dark-band versions). Astro's default favicon removed. Phase 1, step 4.
- Dark-mode toggle added. The site follows your device's light/dark setting by default; the toggle overrides it and the choice is remembered. Phase 1, step 3.
- Base styles (reset, headings, links, focus outlines, layout helpers, reduced-motion support) and a shared page layout added. A hidden internal preview page, `/design-system/`, shows all tokens. Phase 1, step 2.
- Design tokens added (colours for light and dark mode, type scale, spacing, layout) and the four brand fonts (Inter, Inter Tight, JetBrains Mono, Doto) self-hosted. Phase 1, step 1.
- Empty Astro site added and first deployed to a Cloudflare `workers.dev` address. It is a placeholder and is hidden from search engines. durbeen.io is not connected yet.

### 2026-11-18
- Project started: brand, logo files and approved design mockups added to the repository.
- Project brief (`CLAUDE.md`) added.
- Documentation skeleton added: README, decision log, publishing routine, deployment notes.
