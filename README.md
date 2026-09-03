# Atelier Mira

Dark editorial gallery of **one original character** — Mira Solenne — re-rendered across distinct art styles.

Milestone 1 ships **50 styles**. The catalog and asset layout are built to scale past 200.

## Preview

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

Local preview (after build): `npm run preview` — Vite serves on http://localhost:4173

## Character lock

Mira Solenne: 19, honey-copper waves, amber eyes, freckles, beauty mark under left eye, gold sunburst studs, crescent pendant.

Full lock: `styles/character-lock.md`  
Base reference: `public/base/oc-base.png`

Rules: original OC only (no IP, no celebrity). Fully clothed. Hands relaxed, no complex grips.

## Architecture (scales to 200+)

| Path | Role |
|---|---|
| `styles/styles.json` | Catalog: `id`, `name`, `slug`, `description`, `image`, `prompt` |
| `public/styles/<slug>.png` | Generated stills, one file per style |
| `public/base/oc-base.png` | Identity reference for edits |
| `src/App.tsx` | Searchable masonry + lightbox |

Adding a style: generate against the lock, drop `public/styles/<slug>.png`, append one JSON object. No code change required.

Images are lazy-loaded. Masonry is CSS columns. Lightbox is in-app (Esc / arrows).

## Stack

Vite + React + TypeScript. Images generated with Hermes `image_generate` (`gpt-image-2` / `openai-codex`), using the base portrait as an image-to-image reference.

## License

Original character and site code: all rights reserved to the repo owner unless otherwise noted. Art styles are historical/generic techniques, not copies of living artists' protected works or franchises.
