# Changelog

User-visible changes, newest first. Dates are when the change was made.

## Unreleased

Nothing is live on durbeen.io yet. A placeholder site is deployed to a Cloudflare `workers.dev` address and hidden from search engines. The site is being built: the design system is done and the shared components are in progress (Phase 2).

### 2026-11-20
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
