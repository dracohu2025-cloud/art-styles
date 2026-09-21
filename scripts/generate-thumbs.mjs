#!/usr/bin/env node
/**
 * Generate grid thumbnails from native 16:9 PNGs.
 *
 *   npm run thumbs           # skip thumbs that are newer than their PNG
 *   npm run thumbs -- --force
 *
 * Reads public/styles/*.png (top-level only) and writes
 * public/styles/thumbs/<basename>.webp at THUMB_WIDTH × ~9/16, WebP quality 70.
 *
 * Thumbs are gitignored and produced as part of `npm run build` so the
 * committed tree does not drift from a one-off partial set.
 *
 * Width is kept around a few hundred pixels so GitHub Pages (already over
 * the 1GB artifact cap from full PNGs) does not grow much further.
 */
import { mkdir, readdir, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const THUMB_WIDTH = 400;
const WEBP_QUALITY = 70;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = path.join(root, "public", "styles");
const DEST_DIR = path.join(root, "public", "styles", "thumbs");
const force = process.argv.includes("--force");
const concurrency = Math.max(2, Math.min(8, os.cpus().length || 4));

async function fileMtime(file) {
  try {
    return (await stat(file)).mtimeMs;
  } catch {
    return 0;
  }
}

async function pool(items, limit, worker) {
  let i = 0;
  let failed = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const item = items[i++];
      try {
        await worker(item);
      } catch (err) {
        failed += 1;
        console.error(`thumb failed: ${item}`, err?.message ?? err);
      }
    }
  });
  await Promise.all(runners);
  return failed;
}

async function main() {
  await mkdir(DEST_DIR, { recursive: true });
  const names = (await readdir(SRC_DIR)).filter((name) =>
    name.toLowerCase().endsWith(".png"),
  );
  if (names.length === 0) {
    console.warn("No PNGs in public/styles; nothing to thumbnail.");
    return;
  }

  let generated = 0;
  let skipped = 0;
  const started = Date.now();
  console.log(
    `Style Atlas thumbs: ${names.length} png → webp (${THUMB_WIDTH}px, q${WEBP_QUALITY}, ${concurrency} workers)`,
  );

  const failed = await pool(names, concurrency, async (name) => {
    const src = path.join(SRC_DIR, name);
    const dest = path.join(DEST_DIR, name.replace(/\.png$/i, ".webp"));
    if (!force) {
      const [srcMs, destMs] = await Promise.all([fileMtime(src), fileMtime(dest)]);
      if (destMs !== 0 && destMs >= srcMs) {
        skipped += 1;
        return;
      }
    }
    await sharp(src)
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toFile(dest);
    generated += 1;
    if (generated % 250 === 0) {
      console.log(`  generated ${generated} / ${names.length}…`);
    }
  });

  let bytes = 0;
  const thumbs = (await readdir(DEST_DIR)).filter((n) => n.endsWith(".webp"));
  for (const name of thumbs) {
    bytes += (await stat(path.join(DEST_DIR, name))).size;
  }

  const secs = ((Date.now() - started) / 1000).toFixed(1);
  const mbOut = (bytes / (1024 * 1024)).toFixed(1);
  console.log(
    `thumbs: generated ${generated}, skipped ${skipped}, failed ${failed} in ${secs}s`,
  );
  console.log(`output: public/styles/thumbs (${thumbs.length} files, ${mbOut} MB)`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
