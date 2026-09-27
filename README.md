# Stefan Zagarov — Portfolio

Personal portfolio and CV site: **https://resume-site-29ou.onrender.com/**

A single-page site with a terminal / Hyprland-inspired look: a shell prompt that tracks the current section, workspace-style navigation (keys `1`–`7`), a quick-access console (`` ` ``), terminal-style tabs and an interactive dot-grid background.

## Stack

- React 19 + TypeScript
- Vite
- Plain CSS with design tokens (dark and light themes)
- lucide-react icons

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run lint     # oxlint
```

All content (about text, skills, projects, certificates, experience) lives in `src/data/content.ts`.

## Deploy

Deployed on Render as a static site: build command `npm ci && npm run build`, publish directory `dist`, `NODE_VERSION=22`.
