"use client";

import { useEffect, useRef } from "react";

const STATS = [
  { tone: "mist", label: "Established in", value: 2012 },
  { tone: "plum", label: "Helped over", value: 80, plus: true, suffix: "Companies" },
  { tone: "plumdeep", label: "Provided one-to-one mentorship", value: 250, plus: true, suffix: "Entrepreneurs" },
  { tone: "ink", label: "Jobs created", value: 150, plus: true },
  { tone: "sage", label: "New revenue", value: 42, prefix: "$", suffix: "M" },
  { tone: "bronze", label: "New investment", value: 8.8, prefix: "$", suffix: "M", decimals: 1 },
];

export default function Stats() {
  const rootRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = rootRef.current.querySelectorAll("[data-count]");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);

          const el = entry.target;
          const end = parseFloat(el.dataset.count);
          const decimals = parseInt(el.dataset.decimals || "0", 10);
          if (reduced) {
            el.textContent = end.toFixed(decimals);
            return;
          }

          // years tick up from nearby instead of from zero
          const start = end > 1000 ? end - 60 : 0;
          const duration = 1800;
          const t0 = performance.now();

          const tick = (now) => {
            const p = Math.min(1, (now - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = (start + (end - start) * eased).toFixed(decimals);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="stats" ref={rootRef} aria-label="Our impact in numbers">
      <div className="stats__grid">
        {STATS.map((s, i) => (
          <div
            className={`stat stat--${s.tone} reveal`}
            style={{ transitionDelay: `${i * 90}ms` }}
            key={s.label}
          >
            <span className="stat__label">{s.label}</span>
            <div className="stat__value">
              {s.prefix}
              <span data-count={s.value} data-decimals={s.decimals || 0}>0</span>
              {s.plus && "+"}
              {s.suffix && <small>{s.suffix}</small>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
