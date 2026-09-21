import catalogUrl from "../styles/styles.json?url";

export type StyleEntry = {
  id: string;
  slug: string;
  name_en: string;
  name_zh: string;
  description_en: string;
  description_zh: string;
  source: "creative" | "style-diverge" | string;
  image: string;
  width: number;
  height: number;
  aspect: string;
};

export function asset(path: string) {
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\//, "")}`;
}

/** Grid thumbs written by `npm run thumbs` → public/styles/thumbs/<basename>.webp */
export function thumbPath(image: string): string {
  const basename = image.replace(/^\/?styles\//, "").replace(/\.[^.]+$/, "");
  return `styles/thumbs/${basename}.webp`;
}

export async function loadCatalog(): Promise<StyleEntry[]> {
  const res = await fetch(catalogUrl);
  if (!res.ok) {
    throw new Error(`Catalog HTTP ${res.status}`);
  }
  const data = (await res.json()) as StyleEntry[];
  // styles.json is append-only; reverse so the gallery shows newest first.
  return [...data].reverse();
}
