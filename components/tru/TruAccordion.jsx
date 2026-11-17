"use client";

import { Fragment, useState } from "react";
import Slide from "./Slide";
import TruIcon from "./TruIcon";

/**
 * TRU's content accordion (used for the FAQ on the resources page): each heading toggles the panel
 * that follows it, and several panels can be open at once.
 *
 * items: [{ q: string, a: ReactNode }]
 */
export default function TruAccordion({ items }) {
  const [open, setOpen] = useState(() => new Set());

  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <Fragment key={item.q}>
            <h6
              className={`accordion-toggle altHead${isOpen ? " expanded" : ""}`}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              onClick={() => toggle(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(i);
                }
              }}
            >
              <TruIcon name={isOpen ? "minus" : "plus"} sp />
              {item.q}
            </h6>
            <Slide className="accordion-content" open={isOpen}>
              {item.a}
            </Slide>
          </Fragment>
        );
      })}
    </div>
  );
}
