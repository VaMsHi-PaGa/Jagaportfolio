# Jagapathi Babu Allam — Portfolio

A fast, accessible, recruiter-friendly personal portfolio with a
**terminal-meets-observability-dashboard** theme for a Senior Platform Engineer.

- **Static site**, zero backend — plain **HTML + CSS + vanilla JS**, no frameworks, no build step.
- **Dark mode by default** with a light-mode toggle; respects `prefers-color-scheme` and remembers your choice.
- **Mobile-first & fully responsive.** Tasteful motion only (typed hero, hover, scroll-reveal), all gated behind `prefers-reduced-motion`.
- **System fonts** (mono for headings/code, sans for body) — nothing render-blocking, no external font CDN.
- Targets Lighthouse **95+** for Performance, Accessibility, and Best Practices.

## Project structure

```
.
├── index.html          # Semantic single-page site (all sections)
├── css/
│   └── styles.css      # Design tokens + all component styles
├── js/
│   └── main.js         # Theme toggle, typed hero, scroll-reveal, active nav, mobile menu
├── assets/
│   ├── favicon.svg     # Terminal-prompt mark
│   └── resume.pdf      # PLACEHOLDER — replace with your real résumé (see below)
├── netlify.toml        # Static publish config + security/cache headers
├── robots.txt
└── README.md
```

## Sections

Hero (terminal `whoami`) · About · Skills (`kubectl get`-style dashboard cards) ·
Experience (CI/CD pipeline timeline) · Certifications · Projects (placeholders) ·
Contact · vim/tmux-style status-bar footer.

## Design system

| Token group | Values |
| --- | --- |
| **Background** | `#0a0e14` (deep slate) with a faint SVG-free CSS grid |
| **Surfaces** | `#111721` / `#161d29` / `#1c2532`, borders `#232c3b` |
| **Primary accent** | terminal green `#4ade80` |
| **Secondary accent** | cyan `#38bdf8` |
| **Status accent** | amber `#fbbf24` |
| **Fonts** | mono: `ui-monospace, "SF Mono", "JetBrains Mono", Cascadia…`; sans: `system-ui, -apple-system, "Segoe UI", Roboto…` |
| **Spacing** | 4px scale via `--space-1`…`--space-16` |
| **Radii / motion** | `--radius*`, `--ease`, `--dur` custom properties |

Light-mode equivalents are defined under `[data-theme="light"]` with darker accent shades for WCAG-compliant contrast.

## Run locally

No build needed. Any static server works — pick one:

```bash
# Python 3
python3 -m http.server 8080

# Node (no install)
npx serve .

# Or just open index.html in a browser
```

Then visit <http://localhost:8080>.

## Deploy to Netlify

This repo is build-free; `netlify.toml` publishes the root directory as-is.

**Option A — Git (recommended):**
1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Netlify: **Add new site → Import an existing project** and select the repo.
3. Build command: *(leave empty)* · Publish directory: `.` (already set in `netlify.toml`).
4. Deploy. Netlify rebuilds automatically on every push.

**Option B — Drag & drop / CLI:**
```bash
npm i -g netlify-cli
netlify deploy            # draft URL
netlify deploy --prod     # production
```

## Customize

- **Résumé:** update `assets/resume.docx` with your résumé file (keep the same path and name so the
  "Download Résumé" buttons keep working). Or upload a PDF and update the link to `resume.pdf` in the HTML).
- **Projects:** edit the three placeholder cards in `index.html` under
  `<!-- TODO: PROJECTS ... -->` (title, stack tags, blurb, repo/live links).
- **GitHub link:** update the GitHub `href` in the Contact section (marked with a `TODO`).
- **Contact form (optional):** an uncommented-ready **Netlify Forms** snippet sits at the
  bottom of the Contact section in `index.html`. Uncomment to enable — Netlify auto-detects it; no backend required.
- **Colors/spacing:** tweak the CSS custom properties at the top of `css/styles.css`.

## Accessibility & performance notes

- Single semantic `<main>`, skip link, ARIA labels, keyboard-operable nav and theme toggle.
- Theme is set pre-paint via a tiny inline script to avoid a flash of the wrong theme.
- All animations honor `prefers-reduced-motion`. Decorative elements are `aria-hidden`.
- No external requests at runtime → fast first load and a clean Best-Practices score.
