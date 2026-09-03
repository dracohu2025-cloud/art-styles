# STATUS — Style-first pivot

Date: 2026-09-03

## Done

- Gallery pivoted from locked-OC portraits to **style-first** 16:9 stills
- Characters may differ; each image is one dominant art style
- Imported native 1672×941 PNGs from `creative` and `style-diverge`
- Skipped `REJECT` files and all `strips/` contact sheets
- Catalog fields: `name_en` (primary), `name_zh` (secondary)
- Vite `base: "/art-styles/"` for GitHub Pages
- Deploy workflow: `.github/workflows/pages.yml`

## Verified

- Catalog length and PNG count match
- No REJECT filenames in `public/styles`
- `npm run build` with project base

## Live

https://dracohu2025-cloud.github.io/art-styles/
