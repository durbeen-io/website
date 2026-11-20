# Changelog

User-visible changes, newest first. Dates are when the change was made.

## Unreleased

Nothing is live on durbeen.io yet. A placeholder site is deployed to a Cloudflare `workers.dev` address and hidden from search engines. The site is being built: the design system, components, home page, blog engine and the remaining pages are built; real articles are next (Phase 6).

### 2026-11-21
- Home page voice: Durbeen is now described as a founder-led independent lab run by an instrumentation & controls engineer testing AI on real work. New hero intro, status strip, footer line, meta description and Organization structured data. About, the social-image tag line and the RSS description still use the older wording.
- Home page Method section: new heading "Test before you trust." and new text for the four steps. Steps sit in one row on desktop, two by two on tablet and stacked on phone, so step 04 never sits alone. More space under each step so the divider line is not read as an underline.
- Step-by-step guide for forwarding hello@durbeen.io to Gmail with Cloudflare Email Routing (`docs/EMAIL.md`). Nothing was switched on.
- Analytics prepared but switched off: a Cloudflare Web Analytics loader that does nothing until a token is added, runs only on durbeen.io and never for visitors who send Do Not Track. The Privacy page text follows the same setting. Step-by-step instructions to get the token are in `docs/ANALYTICS.md`.
- Every article now ends with an author box (two-line bio and a link to the About page), and the Article structured data names the author with a link to About. Search no longer matches the repeated blocks (related articles, previous/next, share, contents), so a search shows only the articles that really contain the words.
- New Infographics gallery (`/infographics/`): a thumbnail grid of every Infographic article, newest first, with image, title, date and category, and filter buttons for the four categories. Linked from the footer and the Insights page. An Infographic article must now have a hero image.
- About page now carries the founder's own text (123 words in all). Terms name the courts of Hyderabad, India. The Personal CV website is Live with its address and a description. The "AI for Engineers" series was removed (the category stays); "Building Durbeen in Public", "GitHub Mastery" and "Repo Reviews" remain. `docs/CMS.md` explains how to turn on GitHub auto-merge for content pull requests.
- Starter templates for the five article types (Guide, Build note, Review, Comparison, Infographic), each with `[FILL]` hints, also offered in Pages CMS as **Start a new article**. A published article that still contains `[FILL]` now fails the build.
- Pages CMS configuration (`.pages.yml`, generated from the site's own lists) so articles can be written and edited in forms at app.pagescms.org after you install its GitHub app. Instructions and a short first test are in `docs/CMS.md`. The article schema now treats empty optional values as not set.
- Personal CV website is now marked Live (no link yet). Privacy and Terms name the law of India (Terms still need the city of the courts). A one-page infographic style card, `docs/INFOGRAPHIC-STYLE.md`, was added.
- Categories are now exactly four: AI & AI Tools, AI for Engineers, GitHub & Open Source, Building Durbeen. The tag list is now 32 tags built around the founder's four topic areas, the Toolkit and the projects. Sample drafts were remapped.

### 2026-11-20
- 404 page built: on-brand, with a Search button, a link home and the latest articles. **Not yet served by Cloudflare for unknown addresses:** that needs a Worker setting that failed to build when tried (see docs/DEPLOYMENT.md). Phase 5.
- Privacy, Terms, Editorial policy and Affiliate disclosure pages, all marked as preliminary drafts (not legal advice; the governing law is not decided). They describe what the site really does: no cookies, no accounts, no third-party scripts or fonts, no analytics yet, no affiliate links. Phase 5.
- About page (89 words; three `[BRACKET]` placeholders for the founder: field, years of experience, why Durbeen started) and a Resources page with eleven hand-checked links. `hello@durbeen.io` appears as plain text. A new command, `npm run check:brackets`, lists any placeholder still on the built site. Phase 5.
- Toolkit page: ten tools used daily (ChatGPT, Claude, Gemini, NotebookLM, Hazel, MarkItDown, GitHub, Git, Cloudflare, macOS) and three being learned (TypeScript, Bash, Astro), one line each, no affiliate links. Project pages link to the tools they use. Phase 5.
- Projects: a Projects page (dark header band and rows with status labels) and one page per project: durbeen.io (in progress), TokenSave (complete, version 1.0, private repository) and a personal CV website (in progress, private repository). Home project rows now link to them. Phase 5.
- Scope change: Durbeen starts as a blog. The newsletter form and the Work with Durbeen link are removed from the footer (both deferred); the footer now shows `hello@durbeen.io` as plain text and a Resources link. New article type **Infographic** (the page shows a written text version) and a new series **AI for Engineers**; series are now a controlled list.
- Two articles with the same log number now fail the build even if one is a draft. Phase 4 gate review.
- Social-preview images: every article gets its own 1200x630 image (number, type, reading time, title, logo, reticle), and every other page uses a default one. Phase 4, PR 7.
- RSS feed (`/rss.xml`) and sitemap (`/sitemap-index.xml`), plus a `robots.txt` that points to the sitemap. The sitemap leaves out the internal design-system pages and empty category pages. Phase 4, PR 6.
- Search: a search button in the header opens a search window over the articles (Pagefind, built into the site, no tracking). Phase 4, PR 5.
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
