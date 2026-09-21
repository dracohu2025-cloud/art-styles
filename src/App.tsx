import { useEffect, useMemo, useState } from "react";
import { asset, loadCatalog, type StyleEntry } from "./catalog";
import StyleGrid from "./StyleGrid";
import "./App.css";

const REPO_URL = "https://github.com/dracohu2025-cloud/art-styles";

function GitHubMark() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
      />
    </svg>
  );
}

function useEscape(onClose: () => void, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled, onClose]);
}

export default function App() {
  const [styles, setStyles] = useState<StyleEntry[] | null>(null);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<number | null>(null);
  useEscape(() => setOpen(null), open !== null);

  useEffect(() => {
    let cancelled = false;
    loadCatalog()
      .then((entries) => {
        if (!cancelled) setStyles(entries);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setCatalogError(err instanceof Error ? err.message : "load failed");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const indexById = useMemo(() => {
    const map = new Map<string, number>();
    styles?.forEach((s, i) => map.set(s.id, i));
    return map;
  }, [styles]);

  const visible = useMemo(() => {
    if (!styles) return [];
    const needle = q.trim().toLowerCase();
    return styles.filter((s) => {
      if (!needle) return true;
      return [s.name_en, s.name_zh, s.slug, s.description_en, s.description_zh, s.id]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [q, styles]);

  useEffect(() => {
    if (open === null || !styles) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const ids = visible.map((s) => s.id);
      const current = styles[open];
      const pos = ids.indexOf(current.id);
      if (pos < 0) return;
      const next =
        e.key === "ArrowRight"
          ? ids[(pos + 1) % ids.length]
          : ids[(pos + ids.length - 1) % ids.length];
      setOpen(indexById.get(next) ?? null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, visible, styles, indexById]);

  const active = open === null || !styles ? null : styles[open];

  const step = (dir: -1 | 1) => {
    if (open === null || !styles) return;
    const ids = visible.map((s) => s.id);
    const pos = ids.indexOf(styles[open].id);
    if (pos < 0) return;
    const next = ids[(pos + dir + ids.length) % ids.length];
    setOpen(indexById.get(next) ?? null);
  };

  const countLabel = styles ? `${styles.length} stills` : "… stills";

  return (
    <div className="shell">
      <header className="mast">
        <div className="brand">
          <p className="kicker">Style-first · 风格优先</p>
          <h1>
            Style Atlas <span>风格图鉴</span>
          </h1>
        </div>
        <div className="mast-aside">
          <a
            className="gh-link"
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubMark />
            Star on GitHub · 源码
          </a>
          <p className="lede">
            One dominant art style per frame. Characters may differ.
            <br />
            每帧一种主导画风。角色可变。Native 16:9.
          </p>
        </div>
        <div className="meta">
          {countLabel} · 1672×941 · native 16:9
        </div>
      </header>

      <div className="toolbar">
        <label className="search wide">
          <input
            type="search"
            placeholder="Search name_en / name_zh…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search styles"
          />
          <span className="count">
            {visible.length} / {styles?.length ?? "…"}
          </span>
        </label>
      </div>

      {catalogError ? (
        <p className="empty">Could not load catalog. 无法载入图鉴。</p>
      ) : styles === null ? (
        <p className="empty">Loading catalog… 正在载入图鉴。</p>
      ) : visible.length === 0 ? (
        <p className="empty">No styles match. 没有匹配的画风。</p>
      ) : (
        <StyleGrid visible={visible} indexById={indexById} onOpen={setOpen} />
      )}

      {active && open !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name_en} ${active.name_zh}`}
          onClick={() => setOpen(null)}
        >
          <figure className="lb-frame" onClick={(e) => e.stopPropagation()}>
            <img
              src={asset(active.image)}
              alt={active.name_en}
              width={active.width}
              height={active.height}
            />
          </figure>
          <div className="lb-copy" onClick={(e) => e.stopPropagation()}>
            <span className="kicker">
              {active.aspect} · {active.slug}
            </span>
            <h2>{active.name_en}</h2>
            <p className="zh-lg">{active.name_zh}</p>
            <p>{active.description_en}</p>
            <p className="zh">{active.description_zh}</p>
            <div className="lb-actions">
              <button className="nav-btn" type="button" onClick={() => step(-1)}>
                Prev 上一张
              </button>
              <button className="nav-btn" type="button" onClick={() => step(1)}>
                Next 下一张
              </button>
              <button className="close" type="button" onClick={() => setOpen(null)}>
                Close 关闭
              </button>
            </div>
          </div>
        </div>
      )}

      <footer>
        <span>Style-first gallery · characters unlocked</span>
        <a
          className="gh-foot"
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <span>name_en primary · name_zh secondary</span>
      </footer>
    </div>
  );
}
