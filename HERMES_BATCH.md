# Hermes Style Atlas Batch — exactly 5 NEW styles then STOP

You are expanding the Style Atlas gallery at `/workspace/art-styles` (GitHub Pages: https://dracohu2025-cloud.github.io/art-styles/).

## Hard rules for this run

1. Invent and ship **exactly 5 NEW** art styles. After those 5 are built, deployed, and reported — **STOP**. Do not invent a 6th.
2. `name_en` / `name_zh` must be **TRUE art-style keywords**, not subject/object/fashion titles.
   - GOOD examples: Batik, 1990s Cel, Risograph, Solid Flat Ground, Void Chiaroscuro, Caustic Light, Ukiyo-e, Gouache Wash, Crosshatch Noir, Low-poly Bake, Cyanotype, Screen Print Overlay
   - BAD (forbidden): Crimson Gloves, Ice Angel, Idol Stage, Ceramic-as-object, Herbarium-as-object, Gothic Lolita fashion name, any character/prop/outfit title
3. Style-first stills: characters may differ between frames; **one dominant style per frame**.
4. Native **16:9** ~**1672x941** PNGs. English primary, Chinese secondary.
5. **Read `styles/styles.json` first.** Do not duplicate any existing `name_en`, `name_zh`, `slug`, or `id`.
6. Generate images with Hermes **image_gen** using model **gpt-image-2-medium**.
7. Youthful original characters only. **No IP lookalikes, no porn, no politics.**
   - **Gender mix target ≈ 6 female : 1 male** (visual appeal favors female OC).
   - Default each 5-style batch to **5 female**. At most **1 male** per batch, and only when the live catalog’s male share is clearly under ~1/7.
   - Never ship a male-majority batch. Prefer cute/beautiful youthful female OC as the default subject vehicle for the style.
8. Save images under `public/styles/` (e.g. `NN-slug.png`). Append entries to `styles/styles.json` with `"source": "hermes-explore"`.
9. Keep the gallery UI **flat** — do **not** add creative/diverge filters or category tabs.
10. After all 5 are in catalog + images on disk:
    - Run TypeScript project build then Vite production bundle (`tsc -b` then `vite build`, i.e. package.json scripts.build).
    - `git add` relevant files, `git commit`, `git push origin main` (triggers Pages deploy).
    - Update `STATUS.md` with this batch summary.
    - Print a short report (ids, name_en/name_zh, image paths, commit hash) then **exit**.

## Workflow

1. Work in `/workspace/art-styles` (or stay in the provided `--in` workdir).
2. Read `styles/styles.json` and `styles/character-lock.md`. Note highest numeric id / next free slug filenames under `public/styles/`.
3. Invent 5 distinct style keywords (EN + ZH). Verify none collide with catalog.
4. For each style:
   - Craft a prompt that locks the **art technique/look**, not a story subject.
   - Call `image_gen` (`gpt-image-2-medium`), native landscape 16:9 ~1672x941.
   - Save PNG to `public/styles/<nn>-<slug>.png`.
   - Append a JSON object matching existing schema fields: `id`, `slug`, `name_en`, `name_zh`, `description_en`, `description_zh`, `source` (`hermes-explore`), `image` (`styles/...png`), `width`, `height`, `aspect` (`16:9`).
5. Validate: catalog length matches tracked PNGs; no REJECT names.
6. Build (`tsc -b` + `vite build`) then commit then push `main` then update `STATUS.md` then print report then **STOP**.

## Catalog entry shape (match existing)

```json
{
  "id": "h01",
  "slug": "example-style-slug",
  "name_en": "Gouache Wash",
  "name_zh": "水粉湿画",
  "description_en": "Short style-technique blurb.",
  "description_zh": "简短技法描述。",
  "source": "hermes-explore",
  "image": "styles/44-example-style-slug.png",
  "width": 1672,
  "height": 941,
  "aspect": "16:9"
}
```

Use the next free `id` / filename numbering after whatever is already in the catalog. Prefer a clear unused prefix such as `h01` for hermes-explore. Do **not** duplicate names already in catalog (Batik, Risograph, Caustic Light, 1990s Cel, Solid Flat Ground, Void Chiaroscuro and others already exist — invent different style keywords).

## Stop condition

Exactly 5 new styles shipped + build + commit + push + STATUS.md + report. Then halt. No further exploration.
## Gallery order

Append new styles to the **end** of `styles/styles.json`. The gallery UI reverses the catalog so newest entries show first.
