# Infographic style card

One page to brief an image tool (for example ChatGPT) so an infographic matches durbeen.io. All colours come from `src/styles/tokens.css` (checked 21 Nov 2026). Style name: **Instrument Lab**: Swiss minimalism with a precision-instrument feel.

## Colours (exact)

Make the light version by default. Make a dark version only if asked. Use **only** these colours.

| Role | Light | Dark |
|---|---|---|
| Background (paper) | `#F4F4F1` | `#101317` |
| Panel / input | `#FAFAF8` | `#1A1F25` |
| Image placeholder, tabs | `#E9EAE6` | `#232A31` |
| Headings, strong rules, main shapes (ink) | `#14181D` | `#F4F4F1` |
| Body text | `#22272E` | `#E8E6E1` |
| Secondary text | `#3A4149` | `#C5CAD0` |
| Labels, metadata (muted) | `#5B636B` | `#A3AAB1` |
| Hairlines | `#D9DBD8` | `#2A3038` |
| Borders that matter | `#80878E` | `#6B737B` |
| **Accent (signal orange): one only** | `#B4501E` | `#F08A4B` |
| Dark band background | `#14181D` | `#1A1F25` |
| Text on dark band / secondary | `#F4F4F1` / `#C5CAD0` | same |

Accent on a dark band: `#F08A4B`. Use the accent sparingly: one dot, one highlight, one number. Never for paragraphs of text. Text must keep WCAG AA contrast (4.5:1; 3:1 for text 24px and larger).

## Type

| Use | Font | Notes |
|---|---|---|
| Titles, headings | **Inter Tight** 600 or 700 | tight tracking (about -0.03em) at large sizes |
| Body, captions | **Inter** 400 / 500 / 600 | |
| Labels, metadata, code | **JetBrains Mono** 400 | 11-12px at web size, **UPPERCASE**, letter-spacing 0.04em |
| Big step numbers only | **Doto** 900 (dot-matrix) | never for sentences |

If the tool cannot use these fonts, ask for the closest tight geometric sans, a clean monospace for labels, and no decorative type.

## Lines, shapes, grid

- Hairlines **1px** (`#D9DBD8`). Strong rules and main outlines **1px to 1.5px** in ink. The crosshair centre may be 2px in the accent. Measured at about 700px image width.
- **Square corners.** No rounded boxes.
- A visible thin grid is welcome (40px squares, 1px hairline). Spacing in multiples of 8px, plenty of empty space, one idea per image.
- The **only illustration style is the telescope reticle**: concentric circles, a crosshair, one small accent dot. No other icons, no icon rows, no stock images.

## Label style

Monospace, uppercase, muted, terse. Examples to copy:

- `N°012 · REPO REVIEW · 8 MIN`
- `[ 01 ] INSIGHTS` (bracket section labels)
- `FIG. 03 — DESIGN INTELLIGENCE, MEASURED` (figure caption)
- `STEP 02` with the number in Doto

## Never

Gold or metallic effects, gradients, glow, drop shadows, 3D, emoji, decorative stock imagery, widely letter-spaced taglines, rounded "card" looks, more than one accent colour.

## Size and readability

- Ask for **1600 x 1000 px** (landscape, the site's 16:10 frame) or **1600 x 2000 px** (4:5 portrait). Export PNG.
- The site shows images about 700px wide, so every word must still be readable at that width.
- Keep the text in the picture short. **The full content must also be written in the article's `summary` field** (the "Text version" shown on the page); alt text stays one short sentence. See `docs/PUBLISHING.md`, "Infographics".

## Paste-ready brief

> Create an infographic in the "Instrument Lab" style: Swiss minimalism, precise and calm. Canvas 1600x1000 px, flat background #F4F4F1. Headings in a tight bold geometric sans (Inter Tight), body in Inter, small UPPERCASE labels in a monospace (JetBrains Mono) with 0.04em letter-spacing, in #5B636B. Main text and outlines #14181D; secondary text #3A4149; hairlines #D9DBD8. One accent colour only, #B4501E, used for a single dot or highlight. Thin 1px lines, a faint 40px grid, square corners, generous white space, one idea per image. The only illustration motif is a telescope reticle (concentric circles, crosshair, one small accent dot). No gradients, glow, shadows, gold, emoji, icons or stock images. Label figures like "FIG. 01 — TITLE" and sections like "[ 01 ] TOPIC". Topic and content: [FILL].
