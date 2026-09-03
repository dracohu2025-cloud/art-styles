# Style Atlas · 风格图鉴

[![Live gallery](https://img.shields.io/badge/gallery-live-c9a46a?style=flat-square)](https://dracohu2025-cloud.github.io/art-styles/)
[![Stars](https://img.shields.io/github/stars/dracohu2025-cloud/art-styles?style=flat-square)](https://github.com/dracohu2025-cloud/art-styles/stargazers)

**Style-first 16:9 art atlas.** Characters may differ; each still is one dominant technique — not a character sheet, not a theme pack.

**[Live gallery →](https://dracohu2025-cloud.github.io/art-styles/)** · **[★ Star this repo](https://github.com/dracohu2025-cloud/art-styles)**

English primary, Chinese secondary (`name_en` / `name_zh`). Original characters only.

## Featured styles · 精选画风

Ten techniques chosen to look as different from each other as the catalog gets — print, craft, neon, gold leaf, nacre, tile, wax-resist, and carved black.

<table>
  <tr>
    <td align="center" width="50%">
      <a href="https://dracohu2025-cloud.github.io/art-styles/"><img src="public/styles/01-stained-glass-sun.png" alt="Stained Glass / 彩绘玻璃" /></a><br />
      <strong>Stained Glass</strong><br /><sub>彩绘玻璃</sub>
    </td>
    <td align="center" width="50%">
      <a href="https://dracohu2025-cloud.github.io/art-styles/"><img src="public/styles/03-risograph-meadow.png" alt="Risograph / 孔版印刷" /></a><br />
      <strong>Risograph</strong><br /><sub>孔版印刷</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://dracohu2025-cloud.github.io/art-styles/"><img src="public/styles/03-neon-halftone.png" alt="Neon Halftone / 霓虹网点" /></a><br />
      <strong>Neon Halftone</strong><br /><sub>霓虹网点</sub>
    </td>
    <td align="center">
      <a href="https://dracohu2025-cloud.github.io/art-styles/"><img src="public/styles/C15-batik-market.png" alt="Batik / 蜡染" /></a><br />
      <strong>Batik</strong><br /><sub>蜡染</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://dracohu2025-cloud.github.io/art-styles/"><img src="public/styles/48-mezzotint.png" alt="Mezzotint / 美柔汀" /></a><br />
      <strong>Mezzotint</strong><br /><sub>美柔汀</sub>
    </td>
    <td align="center">
      <a href="https://dracohu2025-cloud.github.io/art-styles/"><img src="public/styles/50-scratchboard.png" alt="Scratchboard / 刮画" /></a><br />
      <strong>Scratchboard</strong><br /><sub>刮画</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://dracohu2025-cloud.github.io/art-styles/"><img src="public/styles/108-kirikane.png" alt="Kirikane / 截金" /></a><br />
      <strong>Kirikane</strong><br /><sub>截金</sub>
    </td>
    <td align="center">
      <a href="https://dracohu2025-cloud.github.io/art-styles/"><img src="public/styles/115-raden.png" alt="Raden / 螺钿" /></a><br />
      <strong>Raden</strong><br /><sub>螺钿</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://dracohu2025-cloud.github.io/art-styles/"><img src="public/styles/116-azulejo.png" alt="Azulejo / 阿兹勒霍" /></a><br />
      <strong>Azulejo</strong><br /><sub>阿兹勒霍</sub>
    </td>
    <td align="center">
      <a href="https://dracohu2025-cloud.github.io/art-styles/"><img src="public/styles/53-pointillism.png" alt="Pointillism / 点彩" /></a><br />
      <strong>Pointillism</strong><br /><sub>点彩</sub>
    </td>
  </tr>
</table>

[Browse 100+ stills in the live gallery →](https://dracohu2025-cloud.github.io/art-styles/)

## At a glance

| | |
|---|---|
| Catalog | **100+** technique stills, and growing |
| Frame | Native **16:9** (1672×941) — unmodified imports |
| Labels | Bilingual `name_en` / `name_zh` — true art-style keywords, never subject titles |
| Growth | Hermes-explore batches of five new techniques at a time |

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
- `hermes-explore` — ongoing technique batches (gouache, mezzotint, kirikane, raden, azulejo, …)

## Stack

Vite + React + TypeScript. Deployed from `main` via GitHub Actions → Pages.
