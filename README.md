# Style Atlas · 风格图鉴

Style-first gallery. Characters may differ. Each still has one dominant art style.
Native 16:9 (1672×941). English primary, Chinese secondary (`name_en` / `name_zh`).

Live: https://dracohu2025-cloud.github.io/art-styles/

## Preview

```bash
npm install
npm run dev
```

Production:

```bash
npm run build
npm run preview
```

Vite `base` is `/art-styles/` for GitHub Pages project site.

## Catalog

| Path | Role |
|---|---|
| `styles/styles.json` | `id`, `slug`, `name_en`, `name_zh`, descriptions, `source`, `image` |
| `public/styles/<file>.png` | Native 16:9 stills, unmodified imports |

Sources imported (REJECT files and `strips/` skipped):

- `creative` — 15 craft / print / material styles
- `style-diverge` — 28 graphic / anime style studies

## Stack

Vite + React + TypeScript. Deployed from `main` via GitHub Actions → Pages.
