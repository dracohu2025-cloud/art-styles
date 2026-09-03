import { useEffect, useMemo, useState } from "react";
import catalog from "../styles/styles.json";
import "./App.css";

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

// styles.json is append-only; reverse so the gallery shows newest first.
const styles = [...(catalog as StyleEntry[])].reverse();

function asset(path: string) {
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\//, "")}`;
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
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<number | null>(null);
  useEscape(() => setOpen(null), open !== null);

  const visible = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return styles.filter((s) => {
      if (!needle) return true;
      return [s.name_en, s.name_zh, s.slug, s.description_en, s.description_zh, s.id]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [q]);

  useEffect(() => {
    if (open === null) return;
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
      setOpen(styles.findIndex((s) => s.id === next));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, visible]);

  const active = open === null ? null : styles[open];

  const step = (dir: -1 | 1) => {
    if (open === null) return;
    const ids = visible.map((s) => s.id);
    const pos = ids.indexOf(styles[open].id);
    if (pos < 0) return;
    const next = ids[(pos + dir + ids.length) % ids.length];
    setOpen(styles.findIndex((s) => s.id === next));
  };

  return (
    <div className="shell">
      <header className="mast">
        <div className="brand">
          <p className="kicker">Style-first · 风格优先</p>
          <h1>
            Style Atlas <span>风格图鉴</span>
          </h1>
        </div>
        <p className="lede">
          One dominant art style per frame. Characters may differ.
          <br />
          每帧一种主导画风。角色可变。Native 16:9.
        </p>
        <div className="meta">
          {styles.length} stills · 1672×941 · native 16:9
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
            {visible.length} / {styles.length}
          </span>
        </label>
      </div>

      {visible.length === 0 ? (
        <p className="empty">No styles match. 没有匹配的画风。</p>
      ) : (
        <div className="grid">
          {visible.map((s) => {
            const idx = styles.findIndex((x) => x.id === s.id);
            return (
              <button
                key={s.id}
                className="card"
                type="button"
                onClick={() => setOpen(idx)}
              >
                <figure>
                  <div className="thumb">
                    <img
                      src={asset(s.image)}
                      alt={`${s.name_en} / ${s.name_zh}`}
                      loading="lazy"
                    />
                  </div>
                  <figcaption>
                    <h2>{s.name_en}</h2>
                    <p className="zh">{s.name_zh}</p>
                  </figcaption>
                </figure>
              </button>
            );
          })}
        </div>
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
            <img src={asset(active.image)} alt={active.name_en} />
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
        <span>name_en primary · name_zh secondary</span>
      </footer>
    </div>
  );
}
