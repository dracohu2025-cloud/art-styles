import { useEffect, useMemo, useState } from "react";
import catalog from "../styles/styles.json";
import "./App.css";

export type StyleEntry = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  prompt: string;
};

const styles = catalog as StyleEntry[];

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

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % styles.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i + styles.length - 1) % styles.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return styles;
    return styles.filter((s) =>
      [s.name, s.slug, s.description, s.id].join(" ").toLowerCase().includes(needle)
    );
  }, [q]);

  const active = open === null ? null : styles[open];

  return (
    <div className="shell">
      <header className="nav">
        <div className="mark">
          Atelier <span>Mira</span>
        </div>
        <div className="nav-meta">Milestone 1 · {styles.length} styles · one original</div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="kicker">A locked original character</span>
          <h1>
            Fifty rooms.
            <br />
            <em>One face.</em>
          </h1>
          <p className="lede">
            Mira Solenne, rendered across distinct art histories. Search the grid.
            Open a frame. Architecture is built to grow past two hundred styles.
          </p>
          <label className="search">
            <input
              type="search"
              placeholder="Search styles — ukiyo, clay, noir…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search styles"
            />
            <span className="count">
              {filtered.length} / {styles.length}
            </span>
          </label>
        </div>
        <figure className="hero-portrait">
          <img src="/base/oc-base.png" alt="Mira Solenne, photoreal character lock" />
          <figcaption className="hero-caption">Character lock · oc-base</figcaption>
        </figure>
      </section>

      {filtered.length === 0 ? (
        <p className="empty">No styles match that search.</p>
      ) : (
        <div className="masonry">
          {filtered.map((s) => {
            const idx = styles.findIndex((x) => x.id === s.id);
            return (
              <button
                key={s.id}
                className="card"
                type="button"
                onClick={() => setOpen(idx)}
              >
                <figure>
                  <img src={s.image} alt={`${s.name} portrait of Mira Solenne`} loading="lazy" />
                  <figcaption>
                    <h2>{s.name}</h2>
                    <p>{s.description}</p>
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
          aria-label={active.name}
          onClick={() => setOpen(null)}
        >
          <img src={active.image} alt={active.name} onClick={(e) => e.stopPropagation()} />
          <div className="lb-copy" onClick={(e) => e.stopPropagation()}>
            <span className="kicker">{active.slug}</span>
            <h2>{active.name}</h2>
            <p>{active.description}</p>
            <button className="nav-btn" type="button" onClick={() => setOpen((open + styles.length - 1) % styles.length)}>
              Prev
            </button>
            <button className="nav-btn" type="button" onClick={() => setOpen((open + 1) % styles.length)}>
              Next
            </button>
            <button className="close" type="button" onClick={() => setOpen(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      <footer>
        <span>Original character · fully clothed · identity locked</span>
        <span>Catalog: styles/styles.json</span>
      </footer>
    </div>
  );
}
