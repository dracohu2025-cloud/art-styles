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

## Hermes-explore batch (exactly 5)

Shipped 5 new technique keywords (`source: hermes-explore`), ids h01–h05:

| id  | name_en              | name_zh   | image                            |
|-----|----------------------|-----------|----------------------------------|
| h01 | Gouache Wash         | 水粉湿画  | styles/44-gouache-wash.png       |
| h02 | Screen Print Overlay | 丝网叠印  | styles/45-screen-print-overlay.png |
| h03 | Egg Tempera          | 蛋彩细笔  | styles/46-egg-tempera.png        |
| h04 | Suminagashi          | 墨流      | styles/47-suminagashi.png        |
| h05 | Mezzotint            | 美柔汀    | styles/48-mezzotint.png          |

Native 1672×941 PNGs via gpt-image-2-medium. Catalog 48, PNG count 48. No REJECT names. UI left flat (no filters/tabs).

## Verified

- Catalog length and PNG count match
- No REJECT filenames in `public/styles`
- `npm run build` with project base

## Live

https://dracohu2025-cloud.github.io/art-styles/
