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

## Hermes-explore batch 1 (h01–h05)

| id  | name_en              | name_zh   | image                              |
|-----|----------------------|-----------|------------------------------------|
| h01 | Gouache Wash         | 水粉湿画  | styles/44-gouache-wash.png         |
| h02 | Screen Print Overlay | 丝网叠印  | styles/45-screen-print-overlay.png |
| h03 | Egg Tempera          | 蛋彩细笔  | styles/46-egg-tempera.png          |
| h04 | Suminagashi          | 墨流      | styles/47-suminagashi.png          |
| h05 | Mezzotint            | 美柔汀    | styles/48-mezzotint.png            |

## Hermes-explore batch 2 (exactly 5, h06–h10)

Shipped 5 new technique keywords (`source: hermes-explore`):

| id  | name_en      | name_zh   | image                     |
|-----|--------------|-----------|---------------------------|
| h06 | Encaustic    | 热蜡画    | styles/49-encaustic.png   |
| h07 | Scratchboard | 刮画      | styles/50-scratchboard.png |
| h08 | Silverpoint  | 银尖素描  | styles/51-silverpoint.png |
| h09 | Aquatint     | 飞尘蚀刻  | styles/52-aquatint.png    |
| h10 | Pointillism  | 点彩      | styles/53-pointillism.png |

Native 1672×941 PNGs via gpt-image-2-medium. Catalog 53, PNG count 53. No REJECT names. UI left flat (no filters/tabs).

## Hermes-explore batch 3 (exactly 5, h11–h15)

Shipped 5 new technique keywords (`source: hermes-explore`):

| id  | name_en         | name_zh       | image                          |
|-----|-----------------|---------------|--------------------------------|
| h11 | Drypoint        | 干刻          | styles/54-drypoint.png         |
| h12 | Grisaille       | 灰色单色      | styles/55-grisaille.png        |
| h13 | Sfumato         | 烟雾法        | styles/56-sfumato.png          |
| h14 | Monotype        | 单版画        | styles/57-monotype.png         |
| h15 | Gum Bichromate  | 树胶重铬酸盐  | styles/58-gum-bichromate.png   |

Native 1672×941 PNGs via gpt-image-2-medium. Catalog 58, PNG count 58. No REJECT names. UI left flat (no filters/tabs).

## Hermes-explore batch 4 (exactly 5, h16–h20)

Shipped 5 new technique keywords (`source: hermes-explore`):

| id  | name_en    | name_zh   | image                    |
|-----|------------|-----------|--------------------------|
| h16 | Fresco     | 湿壁画    | styles/59-fresco.png     |
| h17 | Sgraffito  | 刮刻灰泥  | styles/60-sgraffito.png  |
| h18 | Lithograph | 石版画    | styles/61-lithograph.png |
| h19 | Sanguine   | 红粉笔    | styles/62-sanguine.png   |
| h20 | Gongbi     | 工笔      | styles/63-gongbi.png     |

Native 1672×941 PNGs via gpt-image-2-medium. Catalog 63, PNG count 63. No REJECT names. UI left flat (no filters/tabs).

## Verified

- Catalog length and PNG count match
- No REJECT filenames in `public/styles`
- `npm run build` (`tsc -b` + `vite build`) with project base

## Live

https://dracohu2025-cloud.github.io/art-styles/
