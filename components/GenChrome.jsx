import { findImage } from "@/lib/serverImages";

const CONTACT = "mailto:generator@acceleratebusiness.ca";

export default function GenChrome({ active = "home" }) {
  const heroImg =
    findImage("images/generator/hero") ??
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80";

  return (
    <section className="gen-hero" id="generator-home">
      <div className="gen-hero__stage">
        <img className="gen-hero__bg" src={heroImg} alt="" />

        <div className="gen-hero__band">
          <div className="gen-hero__frame gen-hero__band-inner">
            <div className="gen-hero__copy">
              <h1>Make your passion your paycheck</h1>
              <p>Start your entrepreneurial journey at the Generator</p>
            </div>
            <a
              className="gen-btn gen-btn--yellow"
              href="mailto:generator@acceleratebusiness.ca?subject=Join%20TRU%20Generator"
            >
              Join TRU Generator <span aria-hidden="true">›</span>
            </a>
          </div>
        </div>
      </div>

      <nav className="gen-subnav" aria-label="TRU Generator">
        <div className="gen-hero__frame gen-subnav__inner">
          <a
            href="/tru-generator"
            className={active === "home" ? "is-active" : undefined}
          >
            <span className="gen-subnav__home" aria-hidden="true">
              ⌂
            </span>
            TRU Generator
          </a>
          <a
            href="/tru-generator#calendar"
            className={active === "events" ? "is-active" : undefined}
          >
            Events
          </a>
          <a
            href="/tru-generator#mentorship"
            className={active === "mentorship" ? "is-active" : undefined}
          >
            Mentorship
          </a>
          <a href={CONTACT}>Contact Us</a>
          <a
            href="/tru-generator/resources"
            className={active === "resources" ? "is-active" : undefined}
          >
            Resources
          </a>
        </div>
      </nav>
    </section>
  );
}
