"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/tru-generator", label: "TRU Generator" },
  { href: "/partners", label: "Partners" },
  { href: "/news", label: "News" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isGen = pathname === "/tru-generator" || pathname?.startsWith("/tru-generator/");

  return (
    <header className={`nav-wrap${isGen ? " nav-wrap--gen" : ""}${open ? " open" : ""}`}>
      <nav className="nav" aria-label="Main navigation">
        <a className="nav__logo" href="/">
          {isGen ? (
            <img
              src="/images/generator/logo.png"
              alt="TRU Generator"
              className="nav__logo-img nav__logo-img--gen"
            />
          ) : (
            <img
              src="/images/ciba-logo.png"
              alt="Central Interior Business Accelerator"
              className="nav__logo-img"
            />
          )}
        </a>

        <ul className="nav__links">
          {LINKS.map((l) => {
            const active =
              l.href === "/"
                ? pathname === "/"
                : pathname === l.href || pathname?.startsWith(`${l.href}/`);
            return (
              <li key={l.href}>
                <a href={l.href} className={active ? "is-active" : undefined}>
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="nav__actions">
          <a className={`btn ${isGen ? "btn--gen" : "btn--dark"}`} href="/#contact">
            Contact us
          </a>
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
