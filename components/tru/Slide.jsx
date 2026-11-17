"use client";

import { useLayoutEffect, useRef, useState } from "react";

const DURATION = 200; // jQuery's slideToggle("fast"), which is what tru.ca uses

/**
 * A block that slides open and closed. While it is open (or still closing) it carries the `open`
 * class; the stylesheet decides what "closed" looks like (display: none).
 */
export default function Slide({ open, className = "", children, ...rest }) {
  const ref = useRef(null);
  const mounted = useRef(false);
  const [shown, setShown] = useState(open);
  if (open && !shown) setShown(true);

  useLayoutEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const el = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduced || typeof el.animate !== "function") {
      if (!open) setShown(false);
      return;
    }

    const cs = getComputedStyle(el);
    const expanded = {
      height: cs.height,
      paddingTop: cs.paddingTop,
      paddingBottom: cs.paddingBottom,
      marginTop: cs.marginTop,
      marginBottom: cs.marginBottom,
    };
    const collapsed = {
      height: "0px",
      paddingTop: "0px",
      paddingBottom: "0px",
      marginTop: "0px",
      marginBottom: "0px",
    };

    el.style.overflow = "hidden";
    const anim = el.animate(open ? [collapsed, expanded] : [expanded, collapsed], {
      duration: DURATION,
      easing: "ease-in-out",
    });
    anim.onfinish = () => {
      el.style.overflow = "";
      if (!open) setShown(false);
    };
    return () => {
      anim.onfinish = null;
      anim.cancel();
      el.style.overflow = "";
    };
  }, [open]);

  return (
    <div ref={ref} className={`${className}${shown ? " open" : ""}`} {...rest}>
      {children}
    </div>
  );
}
