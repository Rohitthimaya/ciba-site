"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Slide from "./Slide";
import TruIcon from "./TruIcon";
import {
  FOOTER_COLUMNS,
  FOOTER_MOTTO_LINKS,
  FOOTER_SOCIALS,
  GENERATOR_CONTACT_FORM,
  LIBRARY_FIELDS,
  MOBILE_CTAS,
  MOBILE_MENU,
  QUICK_LINKS,
  SEARCH_MODES,
  SECTION_NAV,
  TRU_MENU,
  UTILITY_LINKS,
} from "./truLinks";

const NBSP = "\u00a0";
const HOME = "/tru-generator";
const TO_TOP_AFTER = 300; // px scrolled before the round "back to top" buttons fade in

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Page chrome for the TRU Generator section: a like-for-like rebuild of the layout used on
 * https://www.tru.ca/generator.html (top bar, search panel, banner, section menu, breadcrumbs,
 * footer, and the phone slide-out menu). Page content goes in as children.
 *
 * The markup deliberately keeps TRU's class names — the styles in app/tru-generator/tru-port.css
 * are a port of TRU's stylesheet and depend on them.
 *
 * Props
 *   active     key of the current SECTION_NAV item ("home", "resources", …)
 *   title      page <h1>
 *   hideTitle  hide the <h1> visually (the Generator home page does)
 *   crumbs     breadcrumb trail: [{ label, href? }]; the last item is the current page
 *   banner     URL of the wide banner image behind the title band
 *   logo       URL of the TRU Generator logo
 *   truLogo    URL of the white TRU logo in the footer
 *   truBar     render TRU's own top bar (TRU Menu, quick links, search panel) and phone slide-out
 *              menu. Pass false when the page puts its own site navigation above the shell —
 *              the Generator pages do, with the CIBA <Navbar />.
 */
export default function TruShell({
  active = "home",
  title,
  hideTitle = false,
  crumbs = [],
  banner = "/images/generator/hero.png",
  logo = "/images/generator/logo.png",
  truLogo = "/images/generator/tru-logo.png",
  truBar = true,
  children,
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchHeight, setSearchHeight] = useState(0);
  const [mode, setMode] = useState(SEARCH_MODES[0]);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState(() => new Set());
  const [navOpen, setNavOpen] = useState(false);
  const [showToTop, setShowToTop] = useState(false);

  const panelRef = useRef(null);
  const inputRef = useRef(null);

  // The search panel animates between height 0 and the height of its content.
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const measure = () => setSearchHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus({ preventScroll: true });
    else inputRef.current?.blur();
  }, [searchOpen]);

  useEffect(() => {
    const onScroll = () => setShowToTop(window.scrollY > TO_TOP_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const toggleSearch = (e) => {
    e.preventDefault();
    setSearchOpen((open) => !open);
  };
  const toggleSearchFromTop = (e) => {
    toggleSearch(e);
    scrollToTop();
  };
  const toggleMenu = (e) => {
    e.preventDefault();
    setMenuOpen((open) => !open);
    scrollToTop();
  };
  const toggleGroup = (i) =>
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  const onActivate = (fn) => ({
    role: "button",
    tabIndex: 0,
    onClick: fn,
    onKeyDown: (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        fn();
      }
    },
  });

  const searchButtonClass = `quicklinksButton last${searchOpen ? " open" : ""}`;

  // On phones TRU shows the Generator logo in a strip under its top bar
  const phoneLogo = (
    <div className="columns tru-logo-top">
      <a href={HOME}>
        <img src={logo} alt="TRU Generator" />
      </a>
    </div>
  );

  return (
    <div
      className={`tru${hideTitle ? " tru--hide-title" : ""}${truBar ? "" : " tru--no-bar"}`}
      style={{ "--tru-banner": `url("${banner}")` }}
    >
      <div className={`off-canvas-wrap${menuOpen ? " move-right" : ""}`}>
        <div className="inner-wrap">
          {/* ---- Search panel (slides down from the very top) ---- */}
          {truBar && (
            <div
              className={`qlc${searchOpen ? " active" : ""}`}
              style={{ height: searchOpen ? searchHeight : 0 }}
              inert={!searchOpen}
            >
              <div className="qlcc" ref={panelRef} role="navigation" aria-label="Search and quick links">
                <div className="quicklinks-search">
                  <div className="row relative">
                    <a id="closeSearchButton" href="#" className="close" onClick={toggleSearch}>
                      <TruIcon name="xmark" sp />
                      <span className="sr-only">Close</span>
                    </a>
                    <div className="row action-bar topSearch">
                      <form
                        className="action-form"
                        name="searchText"
                        id="search_form"
                        role="search"
                        method={mode.method}
                        action={mode.action}
                      >
                        <label htmlFor="ql-searchbox" className="sr-only">
                          {mode.placeholder}
                        </label>
                        <input
                          id="ql-searchbox"
                          ref={inputRef}
                          className="tealbg-light qlform-button"
                          type="text"
                          name={mode.name}
                          placeholder={mode.placeholder}
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                        />
                        <button id="submit_keywords" type="submit" value="Search">
                          <TruIcon name="search-solid" className="absolute top-30 right-20" />
                          <span className="sr-only">Search</span>
                        </button>
                        <div className="radios left">
                          {SEARCH_MODES.map((m, i) => (
                            <Fragment key={m.id}>
                              <div className="formDiv">
                                <input
                                  className="search-input"
                                  name="btnSubmit"
                                  type="radio"
                                  id={m.id}
                                  checked={mode.id === m.id}
                                  onChange={() => setMode(m)}
                                  onClick={() => inputRef.current?.focus()}
                                />
                                <label htmlFor={m.id}>
                                  {m.label}
                                  <span className="sr-only">
                                    {m.label} Option {i + 1} of {SEARCH_MODES.length}
                                  </span>
                                </label>
                              </div>
                              {/* the options are inline-blocks: TRU's spacing includes this word space */}{" "}
                            </Fragment>
                          ))}
                          <input type="hidden" name="collection" value="tru3~sp-search" />
                          <input type="hidden" name="q" value={mode.name === "query" ? query : ""} />
                          {LIBRARY_FIELDS.map(([name, value]) => (
                            <input
                              key={name}
                              type="hidden"
                              name={name}
                              value={value}
                              disabled={!mode.library}
                            />
                          ))}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="quicklinks-nav">
                  <div className="row">
                    <div className="large-12 columns ql-linklist">
                      <ul className="quick-links">
                        {QUICK_LINKS.map((column, i) => (
                          <li
                            className={`small-6 medium-3 columns${i === QUICK_LINKS.length - 1 ? " end" : ""}`}
                            key={i}
                          >
                            <ul>
                              {column.map((link) => (
                                <li key={link.href}>
                                  <a className="quicklinks-link" href={link.href}>
                                    {link.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---- Phone top bar ---- */}
          {truBar ? (
            <nav className="tab-bar show-for-small-down utility-nav" aria-label="Menu">
              <div className="sticky-nav">
                <nav className="utility-nav right" aria-label="Search">
                  <ul className="inline-list">
                    <li className={searchButtonClass}>
                      <a href="#" className="utilink quick-links-link" onClick={toggleSearchFromTop}>
                        <TruIcon name="search" />
                        <span className="sr-only">Search</span>
                      </a>
                    </li>
                  </ul>
                </nav>
                <div className="left-small bluebg">
                  <a
                    className="left-off-canvas-toggle menu-icon"
                    href="#"
                    aria-expanded={menuOpen}
                    onClick={toggleMenu}
                  >
                    <span>Menu</span>
                  </a>
                </div>
              </div>
              {phoneLogo}
            </nav>
          ) : (
            <div className="tab-bar show-for-small-down">{phoneLogo}</div>
          )}

          <div className="fds-body-wrap">
            {truBar && (
              <>
                {/* ---- Phone slide-out menu ---- */}
                <aside className="left-off-canvas-menu show-for-small-down" inert={!menuOpen}>
                  <nav className="primary-nav-mobile" aria-label="TRU main menu">
                    <ul className="primary-cta">
                      {MOBILE_CTAS.map((cta) => (
                        <li key={cta.href}>
                          <a className="button yellowbg cta" href={cta.href}>
                            {cta.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <h6 className="altHead">
                      <TruIcon name="house" />
                      {NBSP}
                      {NBSP}Main Menu
                    </h6>
                    <ul>
                      {MOBILE_MENU.map((group, i) => {
                        const open = openGroups.has(i);
                        return (
                          <li className={`top-level accordion${open ? " opened" : ""}`} key={group.label}>
                            <a
                              className={`accordion-toggle${open ? " expanded" : ""}`}
                              aria-expanded={open}
                              {...onActivate(() => toggleGroup(i))}
                            >
                              <TruIcon name={open ? "minus" : "plus"} />
                              {group.label}
                            </a>
                            <Slide className="row accordion-content" open={open}>
                              <div className="row">
                                <ul>
                                  {group.links.map((link) => (
                                    <li key={link.href}>
                                      <a href={link.href}>{link.label}</a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </Slide>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </aside>

                {/* ---- Desktop top bar ---- */}
                <header className="show-for-medium-up">
                  <div className="row bluebg">
                    <div className="medium-3 columns">
                      <nav aria-label="TRU menu">
                        <section className="tru-nav top-bar-section">
                          <ul>
                            <li className="has-dropdown not-click">
                              <a>
                                <TruIcon name="bars" />
                                {NBSP}
                                {NBSP}TRU Menu
                              </a>
                              <ul className="dropdown">
                                {TRU_MENU.map((link) => (
                                  <li key={link.href}>
                                    <a href={link.href}>{link.label}</a>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          </ul>
                        </section>
                      </nav>
                    </div>
                    <div className="medium-9 columns nopadding">
                      <nav className="utility-nav right" aria-label="TRU quick links">
                        <ul className="inline-list">
                          {UTILITY_LINKS.map((link) => (
                            <li className={link.className} key={link.href}>
                              <a href={link.href}>{link.label}</a>
                            </li>
                          ))}
                          <li className={searchButtonClass}>
                            <a
                              href="#"
                              className="utilink quick-links-link"
                              aria-expanded={searchOpen}
                              onClick={toggleSearchFromTop}
                            >
                              <TruIcon name="search" sp />
                              <span className="sr-only">Search</span>
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </header>
              </>
            )}

            <div className="row show-for-medium-up">
              <div className="collapse medium-3">
                <a href={HOME}>
                  <img className="fds-logo" src={logo} alt="TRU Generator" />
                </a>
              </div>
            </div>

            <main className="fds-subpage-content">
              {/* ---- Title band over the banner ---- */}
              <div className="fds-section-title row">
                <div className="columns bluebg-st v2pad h2pad hide-for-small">
                  <div className="row">
                    <div className="small-12 medium-9 large-10 columns">
                      <h2>Make your passion your paycheck</h2>
                      <h4 className="whitetext">
                        Start your entrepreneurial journey at the Generator
                      </h4>
                    </div>
                    <div className="small-12 medium-3 large-2 columns">
                      <a className="button nomargin radius yellowbg m1top" href={GENERATOR_CONTACT_FORM}>
                        Join TRU Generator
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* ---- Section menu ---- */}
              <div className={`sectionNav accordion stickyNav${navOpen ? " opened" : ""}`}>
                <h6
                  className={`altHead side-nav-mobile show-for-medium-down accordion-toggle${navOpen ? " expanded" : ""}`}
                  aria-expanded={navOpen}
                  {...onActivate(() => setNavOpen((open) => !open))}
                >
                  <TruIcon name={navOpen ? "minus" : "plus"} />
                  Generator Menu
                </h6>
                <Slide className="ipf-sectionmenu-collapse" open={navOpen}>
                  <nav className="row horizontal-nav" aria-label="TRU Generator">
                    <ul className="ipf-sectionmenu accordion-content">
                      {SECTION_NAV.map((item, i) => (
                        <li
                          className={
                            [i === 0 && "ipf-homepage", item.key === active && "currentItem"]
                              .filter(Boolean)
                              .join(" ") || undefined
                          }
                          data-level="1"
                          key={item.key}
                        >
                          <div>
                            <a
                              href={item.href}
                              aria-current={item.key === active ? "page" : undefined}
                            >
                              {item.label}
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </Slide>
              </div>

              <div className="row bcwrap">
                <div className="breadcrumbs hide-for-small columns">
                  {crumbs.map((crumb) => (
                    <Fragment key={crumb.label}>
                      <span className="ipb-locationline-separator">
                        {NBSP}&gt;{NBSP}
                      </span>
                      {crumb.href ? <a href={crumb.href}>{crumb.label}</a> : crumb.label}
                    </Fragment>
                  ))}
                </div>
              </div>

              <div className="row bodywrap">
                <div className="small-11 columns pageTitle small-centered">
                  <h1>{title}</h1>
                </div>
                <div className="small-11 columns contentArea small-centered">{children}</div>
              </div>
            </main>
          </div>

          {/* ---- Round buttons that appear once the page is scrolled ---- */}
          {truBar && (
            <a
              href="#"
              className={`to-top open-search${showToTop ? " is-visible" : ""}`}
              title="Back to top & Open search"
              onClick={toggleSearchFromTop}
            >
              <TruIcon name="search" />
              <span className="sr-only">Search</span>
            </a>
          )}
          <a
            href="#"
            className={`to-top${showToTop ? " is-visible" : ""}`}
            title="Back to top"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            <TruIcon name="chevron-up" />
            <span className="sr-only">To Top</span>
          </a>

          {/* ---- Footer ---- */}
          <footer className="footer-wrapper">
            <div className="footer-links">
              <div className="links-column moto-column">
                <span className="footer-moto whitetext font-900">
                  <span className="footer-moto__find">FIND</span>
                  <br />
                  <span className="footer-moto__your">YOUR</span>
                  <br />
                  <span className="orangetext">TRU</span>
                </span>
                <ul>
                  {FOOTER_MOTTO_LINKS.map((link) => (
                    <li key={link.href}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              {FOOTER_COLUMNS.map((column) => (
                <div className="links-column" key={column.title}>
                  <span className="links-title font-900 whitetext">{column.title}</span>
                  <ul>
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <a href={link.href}>{link.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="footer-logo">
              <a href="https://www.tru.ca/">
                <img src={truLogo} alt="TRU Logo" />
              </a>
              <div className="logo-links">
                <a href="https://www.tru.ca/contact.html">
                  <strong>Contact Us</strong>
                </a>
              </div>
              <div className="logo-social">
                {FOOTER_SOCIALS.map((social) => (
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={social.className}
                    key={social.href}
                  >
                    <span className="sr-only">{social.label}</span>
                    <TruIcon name={social.icon} />
                  </a>
                ))}
              </div>
            </div>
          </footer>

          {truBar && (
            <a className="exit-off-canvas" aria-hidden="true" onClick={() => setMenuOpen(false)} />
          )}
        </div>
      </div>
    </div>
  );
}
