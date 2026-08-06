"use client";

import { useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/partners", label: "Partners" },
  { href: "/news", label: "News" },
  { href: "/#contact", label: "Contact Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className={`nav-wrap${open ? " open" : ""}`}>
      <nav className="nav" aria-label="Main navigation">
        <a className="nav__logo" href="/">
          <img src="/images/ciba-logo.png" alt="Central Interior Business Accelerator" />
        </a>

        <ul className="nav__links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav__actions">
          <a className="btn btn--dark" href="/#contact">Contact us</a>
        </div>

        <button
          className="nav__toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className="nav-mobile">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}
