import { useLayoutEffect, useRef, useState } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { asset, thumbPath, type StyleEntry } from "./catalog";

const GAP = 22;
const MIN_COL = 520;
const CAPTION = 74;

function colsForWidth(width: number): number {
  if (width < MIN_COL) return 1;
  return Math.max(1, Math.floor((width + GAP) / (MIN_COL + GAP)));
}

function initialGridWidth() {
  if (typeof window === "undefined") return 0;
  const shellPad = 56;
  return Math.min(1440 - shellPad, Math.max(0, window.innerWidth - shellPad));
}

type StyleGridProps = {
  visible: StyleEntry[];
  indexById: Map<string, number>;
  onOpen: (catalogIndex: number) => void;
};

export default function StyleGrid({ visible, indexById, onOpen }: StyleGridProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(initialGridWidth);
  const [scrollMargin, setScrollMargin] = useState(0);

  useLayoutEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const update = () => {
      const nextWidth = el.clientWidth;
      const nextMargin = el.getBoundingClientRect().top + window.scrollY;
      setWidth((prev) => (prev === nextWidth ? prev : nextWidth));
      setScrollMargin((prev) => (Math.abs(prev - nextMargin) < 0.5 ? prev : nextMargin));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const colCount = colsForWidth(width || MIN_COL);
  const rowCount = Math.max(1, Math.ceil(visible.length / colCount));
  const colWidth =
    width > 0 ? (width - GAP * (colCount - 1)) / colCount : MIN_COL;
  const estimateSize = Math.round(colWidth * (9 / 16) + CAPTION + GAP);

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => estimateSize,
    overscan: 4,
    scrollMargin,
  });

  useLayoutEffect(() => {
    virtualizer.measure();
  }, [colCount, estimateSize, rowCount, virtualizer]);

  const virtualRows = virtualizer.getVirtualItems();
  const mountedCards = virtualRows.reduce((n, row) => {
    const start = row.index * colCount;
    return n + visible.slice(start, start + colCount).length;
  }, 0);

  return (
    <div
      ref={listRef}
      className="grid"
      data-virtual-rows={virtualRows.length}
      data-mounted-cards={mountedCards}
    >
      <div
        className="grid-inner"
        style={{
          height: virtualizer.getTotalSize(),
          width: "100%",
          position: "relative",
        }}
      >
        {virtualRows.map((vr) => {
          const start = vr.index * colCount;
          const row = visible.slice(start, start + colCount);
          return (
            <div
              key={vr.key}
              data-index={vr.index}
              ref={virtualizer.measureElement}
              className="grid-row"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${vr.start - scrollMargin}px)`,
                gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
              }}
            >
              {row.map((s) => {
                const idx = indexById.get(s.id) ?? 0;
                return (
                  <button
                    key={s.id}
                    className="card"
                    type="button"
                    onClick={() => onOpen(idx)}
                  >
                    <figure>
                      <div className="thumb">
                        <img
                          src={asset(thumbPath(s.image))}
                          alt={`${s.name_en} / ${s.name_zh}`}
                          width={400}
                          height={225}
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            const img = e.currentTarget;
                            if (img.dataset.fallback) return;
                            img.dataset.fallback = "1";
                            img.src = asset(s.image);
                          }}
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
          );
        })}
      </div>
    </div>
  );
}
