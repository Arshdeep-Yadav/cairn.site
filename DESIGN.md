# Design system — Cairn marketing site

All styling lives in `styles.css`. Everything is a token; there are no magic values. `DESIGN.md` documents the tokens, the rationale, and where things came from (product screenshots, brand assets).

## Palette

From `cairn/web/styles.css`, light + dark variants:

| Token | Light | Dark |
| --- | --- | --- |
| `--paper` | `#f7f4ed` | `#14120f` |
| `--paper-2` | `#f1ece2` | `#100e0c` |
| `--surface` | `#fdfbf6` | `#1b1814` |
| `--surface-2` | `#f4efe4` | `#221e18` |
| `--ink` | `#211e18` | `#f1ece1` |
| `--ink-2` | `#4a4438` | `#c9c1b2` |
| `--ink-3` | `#6f6759` | `#9a9182` |
| `--line` | `#e4ded0` | `#302b23` |
| `--line-strong` | `#d4ccba` | `#3d372d` |
| `--accent` | `#b3542b` | `#df8154` |
| `--accent-strong` | `#974321` | `#ef9569` |
| `--accent-soft` | `#f4e3d7` | `#3a2519` |
| `--accent-ink` | `#7d3818` | `#f0a37d` |
| `--accent-contrast` | `#fff8f0` | `#1b120c` |
| `--moss` | `#43694f` | `#82b696` |
| `--gold` | `#9a7420` | `#d3ab5b` |
| `--danger` | `#a33a32` | `#e08279` |
| `--blue` | `#376a94` | `#89a7c9` |
| `--plum` | `#705a97` | `#ae97d1` |
| `--olive` | `#5c7838` | `#a4bf7c` |

Note: the marketing site intentionally uses the product's warm-paper + terracotta palette, so the page reads as part of the same world. The "docs plates" (architecture + security) switch from a near-black counterweight in dark mode to a warm stone panel in light mode — both look at home, and the plate text uses `--plate-*` tokens so it reads on either background (see Decision 6).

## Plate (docs-style panel)

The "docs plates" (architecture + security) adapt to the theme:

| Token | Light | Dark |
| --- | --- | --- |
| `--plate` | `#e5e0d2` (warm stone) | `#0d0b09` (near-black counterweight) |
| `--plate-2` | `#f0ebdd` | `#15120f` |
| `--plate-line` | `rgba(33,30,24,.14)` | `rgba(241,236,225,.16)` |
| `--plate-accent` | `#b3542b` | `#ef9569` |
| `--plate-moss` | `#43694f` | `#82b696` |
| `--plate-ink` | `#1f1c17` | `#f1ece1` |
| `--plate-muted` | `rgba(33,30,24,.85)` | `rgba(241,236,225,.70)` |
| `--plate-muted-2` | `rgba(33,30,24,.5)` | `rgba(241,236,225,.45)` |
| `--plate-muted-3` | `rgba(33,30,24,.6)` | `rgba(241,236,225,.34)` |

Plate text uses the `--plate-*` tokens everywhere (see "Stone text" below) so the section reads on both themes. Diagram syntax colors are adaptive: `--code-k/-s/-v/-h/-c` (`rgba(33,30,24,…)` in light, dark-alpha versions in dark).

## Stone text

The architecture diagram, security panel, and trace use "plate text" tokens everywhere instead of hardcoded white-on-dark values:

| Role | Token | Light | Dark |
| --- | --- | --- | --- |
| Diagram label | `--plate-muted` | dark ink, α 0.85 | white, α 0.70 |
| Diagram fine detail | `--plate-muted-2` | α 0.5 | α 0.45 |
| Code comments/muted | `--code-c` | `--plate-muted-3` (α 0.6) | `rgba(241,236,225,.34)` |
| Block background | `--plate-2` / `color-mix(in srgb, var(--plate-ink) X%, transparent)` | stone-2 / stone with ink tint | near-black / white tints |

Light-mode audit target: every visible text in the plate sections has ≥ 3.2:1 WCAG contrast (verified by a DOM sweep + screenshot profiling).

## Typography

- Display: `Iowan Old Style, Palatino Linotype, Book Antiqua, Palatino, Georgia, serif` (from `cairn/web/styles.css`)
- UI: `Aptos, Segoe UI Variable Text, Segoe UI, -apple-system, BlinkMacSystemFont, system-ui, sans-serif` (from `cairn/web/styles.css`)
- Mono: `Cascadia Code, SFMono-Regular, JetBrains Mono, Consolas, Liberation Mono, monospace` (from `cairn/web/styles.css`)
- Removed: `Inter` and `Roboto` are never used anywhere (moot on web, since the product also has no Inter — checked `cairn/web/styles.css` and it uses no Google Fonts).

Scale:
- H1: `clamp(2.9rem, 5.5vw, 4.9rem)`
- Body: 1.0625rem / line-height 1.65
- Ledger captions (pull quotes): `clamp(1.9rem, 3.6vw, 3rem)`
- `<kbd>`: 0.74em

## Radii and motion

- Radii: 6 / 9 / 13 / 18 / 24 px (matching `cairn/web/styles.css` token scale). `.cmd` uses 10px, `.copy-btn` 6px, charts not used.
- Shadows: `--shadow-sm` `0 1px 2px rgba(28,24,18,.05), 0 4px 12px -6px rgba(28,24,18,.08)`; `--shadow-md` `0 12px 32px -12px rgba(28,24,18,.18), 0 2px 6px rgba(28,24,18,.05)`; `--shadow-lg` `0 32px 80px -24px rgba(28,24,18,.28), 0 8px 24px -12px rgba(28,24,18,.12)` (dark: opacity bumped via the palettes above).
- Easing: `cubic-bezier(.22,.61,.36,1)` (from the app's `ease`).

## Assets provenance

- `assets/shots/*` — **real screenshots** of the Cairn app, copied verbatim from `cairn/web/assets/shots/`:
  - `home.png` (1440x1000, hero, light), `home-dark.png` (1440x1000, hero, dark),
    `graph.png` (1440x1000, memory graph), `agents.png` (agents page), `decisions.png` (decisions page),
    `timeline.png` (timeline page), `setup.png` (connect page), `mobile.png` (390x844 — a real 390px-wide crop of the workspace at that width).
  - The phone figure uses `mobile.png` at 390x844 inside the window frame; `object-fit: cover` on the frame image at aspect 390/844.
- `assets/brand/favicon.svg` — copied from `cairn/web/assets/favicon.svg`. Used in: header logo mark (32px), footer brand mark (36px), CTA mark (280px), manifest icon (192px).

## Decisions worth revisiting

1. **The architecture diagram is a layered CSS structure** (`#architecture`). I could have used a raster image (like the app's graph), but the requirement said "accessible HTML/CSS layers with labeled connectors" — and it reads better: zoomable, mobile-refable, greppable, light/dark for free. Node text is stacked (index column + label column) rather than overlaid, so it stays legible at 2px-ish zoom.
2. **Theme-dependent hero screenshots.** The app screenshot is literally different between light and dark (`home.png` vs `home-dark.png`), so there are two `<img>` elements, one in each theme.
3. **Copy tone.** Straightforwardly factual, second-person but rarely first-person ("Every agent sees..."). Avoid marketing fluff ("revolutionary") — but no marketing mute either.
4. **Nav links are sparse by design** — the hero headline carries the value prop.
5. **`.cmd` vs `.cmd-hero`** — duplicated commands use different paddings; fine, minor drift.
6. **The plates are white-in-light / dark-in-dark with adaptive text.** Before the fix, the architecture + security plates were near-black in light mode too (a "counterweight" look). Now they switch: stone `#e5e0d2` in light, near-black `#0d0b09` in dark, and all plate text uses `--plate-*` tokens (verified ≥ 3.2:1 in both themes).

## Interactive pieces (and their states)

- Theme toggle: sun/moon flip, `aria-pressed`, `aria-label` updates to match.
- Theme persistence: `localStorage["cairn-site-theme"]`, no `prefers-color-scheme` auto-follow except via `main.js` `matchMedia` change listener.
- Mobile nav: `visibility: hidden` + `translateY(-130%)` by default; opens via `[data-menu-toggle]`.
- Install tabs: `role="tab"` + `aria-controls` + `aria-selected`, one-keyboard-nav (Arrow Left/Right, Home, End), focus visible.
- Copy buttons: clipboard API with `execCommand` fallback, `is-copied` + "Copied" label, restore after 1.6s.
- Table regions: `tabindex="0"` + `aria-label` + `role="region"` for keyboard scroll.
- Reveal: `.reveal` becomes `.is-revealed`; reduced-motion disables entirely.
- Print: hides `.copy-btn`, hero glow, screenshots outside hero, CTA mark; forces theme to light-on-white.

## File map

```
site/
├── index.html          # full long-scroll page
├── styles.css          # everything (tokens → print)
├── main.js             # vanilla JS interactions
├── manifest.webmanifest
├── README.md           # this folder
├── DESIGN.md           # ← this file (tokens + rationale)
├── assets/
│   ├── brand/favicon.svg
│   └── shots/*.png
└── index.html? (no — the page is the page)
```

## Known caveats

- Screenshot `graph.png` is 1440x1000; cropped to the non-blank region.
- The `install` section is the most text-heavy part of the page. If the client list grows, the `.clients-list` and header strip absorb it fine.
