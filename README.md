# Cairn marketing site

A standalone static site (no build, no frameworks, no external CDNs) that documents
Cairn: how to install it, how coding agents use it through MCP, the architecture, the
security posture, the workspace UI, deploy guides, and the FAQ.

This lives in `site/` of the [Cairn repo](https://github.com/Arshdeep-Yadav/Cairn) and
is published as its own repo: [Arshdeep-Yadav/cairn.site](https://github.com/Arshdeep-Yadav/cairn.site).

## Preview

```sh
python -m http.server 8099 --directory site
```

Then open [http://localhost:8099](http://localhost:8099).

Or with any static file server: `npx serve site`, or `python -m http.server -d site`.

## Files

- `index.html` — the full long-scroll page: hero, why, working loop, architecture,
  memory model, MCP reference, install (per-client tabs), workspace, security,
  deploy, FAQ, CTA, footer.
- `styles.css` — everything: tokens, dark theme, header, all sections, the layered
  architecture diagram, the memory-kind cards, the MCP tables, the install tabs,
  gallery, responsive rules, print.
- `main.js` — vanilla JS: theme toggle, header scroll state, mobile menu, copy
  buttons, accessible ARIA tabs, active-navigation via IntersectionObserver,
  reveal-on-scroll with reduced-motion handling, year stamp.
- `manifest.webmanifest` — PWA metadata (the home-screen tile icon).
- `assets/shots/` — real product screenshots from `cairn/web/assets/shots/`
  (home, home-dark, graph, agents, decisions, timeline, setup, mobile).
- `assets/brand/favicon.svg` — the stone-stack logo mark used by the header and CTA.
- `README.md` — this file.
- `DESIGN.md` — design system: tokens, accessibility targets, asset provenance,
  and the decisions that shaped the page.

## Compatibility notes

- Uses `:has()` (`.cmd:has(.code-multi)`), `:focus-visible`, `color-mix()`,
  `text-wrap: balance`, and CSS grid. Supported in Edge/Chrome 95+ and Safari 15+.
- `IntersectionObserver` is used opportunistically (nav + reveal); without it,
  `main.js` falls back to revealing everything on load.
- `matchMedia('(prefers-reduced-motion: reduce)')` gates the scroll reveal
  animations.

## Verification

This is static; verification is manual/browser. Light mode is the primary audience,
and the two "docs plates" (architecture, security) are the warm stone panel
(`--plate: #e5e0d2`).

To verify:

1. Serve the page (see *Preview* above).
2. **Light mode, desktop** — open [http://localhost:8099](http://localhost:8099) at
   1440–1440px: check the hero (shows the light screenshot `home.png`), the stone
   plates, and the architecture diagram.
3. **Dark mode, desktop** — click the theme toggle in the header: the dark
   screenshot (`home-dark.png`) appears and the plates go near-black
   (`--plate: #0d0b09`).
4. **Mobile** — emulate 390×844 (Chrome DevTools device mode): the page stacks
   vertically, the mobile menu opens, the phone screenshot renders in the frame.

Contrast audit: the light-mode contrast sweeps I ran over the page — visible text
against composited backgrounds, target ≥ 3.2:1 — pass in both themes (see the
`audit.js` / `light-sweep2.js` / `dark-sweep.js` checks used in the Cairn repo).
