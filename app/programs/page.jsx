import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { findImage } from "@/lib/serverImages";

function ProgramLogo({ slug, alt = "" }) {
  const src = findImage(`images/programs/${slug}`);
  if (!src) return null;
  return (
    <div className="program-card__logo">
      <img src={src} alt={alt} />
    </div>
  );
}

export const metadata = {
  title: "Programs — Central Interior Business Accelerator",
  description:
    "Programs and services offered by the Central Interior Business Accelerator — TRU Generator, Road to Web Summit Vancouver, AccelerateIP, ThreeSixty & Delta, and Applied AI Implementation Clinics.",
};

const WORKSHOPS = [
  {
    date: "November 10, 2026",
    title: "Fall Session 1 – Find Your AI Opportunity",
    href: "https://www.eventbrite.ca/e/fall-session-1-find-your-ai-opportunity-tickets-2003386574173",
  },
  {
    date: "November 17, 2026",
    title: "Fall Session 2 – Design and Test Your AI Workflow",
    href: "https://www.eventbrite.ca/e/fall-session-2-design-and-test-your-ai-workflow-tickets-2003924049777",
  },
  {
    date: "November 24, 2026",
    title: "Fall Session 3 – Prove the Value and Plan the Rollout",
    href: "https://www.eventbrite.ca/e/fall-session-3-prove-the-value-and-plan-the-rollout-tickets-2003925838126",
  },
];

export default function ProgramsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="page-head">
          <div className="container">
            <p className="eyebrow eyebrow--light">Programs</p>
            <h1>More support. More growth.</h1>
            <p className="page-head__sub">
              Find customized solutions to elevate your business through our programs
              and services.
            </p>
          </div>
        </section>

        <section className="section section--cream">
          <div className="container">
            <div className="program-grid">

              <article className="program-card reveal">
                <ProgramLogo slug="tru-generator" alt="TRU Generator" />
                <h3>TRU Generator Program</h3>
                <p>
                  TRU Generator is an on-campus accelerator based in Kamloops, jointly
                  operated by Thompson Rivers University and Central Interior Business
                  Accelerator to support students, faculty, staff, and alumni with
                  mentorship, workshops, and events.
                </p>
                <p className="program-card__cta">
                  <a href="/tru-generator">Explore TRU Generator</a>
                  {" · "}
                  <a href="mailto:generator@acceleratebusiness.ca">
                    generator@acceleratebusiness.ca
                  </a>
                </p>
              </article>

              <article className="program-card reveal" style={{ transitionDelay: "80ms" }}>
                <ProgramLogo slug="innovate-bc" alt="Innovate BC" />
                <h3>Road to Web Summit Vancouver</h3>
                <p>
                  CIBA is proud to partner with Innovate BC on the Road to Web Summit
                  Vancouver (R2WSV) program, supporting Interior BC startups preparing to
                  pitch at Web Summit Vancouver.
                </p>
                <p>
                  Entrepreneurs interested in showcasing their venture can inquire by
                  emailing{" "}
                  <a href="mailto:info@acceleratebusiness.ca?subject=R2WSV">
                    info@acceleratebusiness.ca
                  </a>{" "}
                  with &ldquo;R2WSV&rdquo; in the subject line. More details coming soon.
                </p>
              </article>

              <article className="program-card reveal" style={{ transitionDelay: "160ms" }}>
                <ProgramLogo slug="accelerate-ip" alt="AccelerateIP" />
                <h3>AccelerateIP Program</h3>
                <p>
                  In collaboration with New Ventures BC and Innovate BC, Central Interior
                  Business Accelerator offers support to protect, develop, and implement
                  your Intellectual Property, and is designed to support hundreds of
                  innovative startups throughout the Central Interior of B.C. to grow and
                  protect their ideas and intellectual assets.
                </p>
                <p className="program-card__cta">
                  Learn more here:{" "}
                  <a href="https://www.accelerateip.ca" target="_blank" rel="noopener noreferrer">
                    www.accelerateip.ca
                  </a>
                </p>
              </article>

              <article className="program-card reveal">
                <ProgramLogo slug="accelerate-okanagan" alt="Accelerate Okanagan" />
                <h3>ThreeSixty &amp; Delta Programs</h3>
                <p>
                  <strong>CIBA</strong> is a regional delivery partner for Accelerate
                  Okanagan&apos;s PacifiCan-funded scale-up programs, supporting
                  tech-enabled companies across BC&apos;s Interior. Founders gain access to
                  strategic mentorship, expert advisors, peer networks, and co-investment
                  opportunities to accelerate growth and navigate key inflection points.
                </p>
                <p className="program-card__cta">
                  Click to learn more:{" "}
                  <a
                    href="https://www.accelerateokanagan.com/programs/threesixty/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ThreeSixty
                  </a>{" "}
                  ·{" "}
                  <a
                    href="https://www.accelerateokanagan.com/programs/delta/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Delta
                  </a>
                </p>
              </article>

              <article className="program-card reveal" style={{ transitionDelay: "80ms" }}>
                <ProgramLogo slug="discovery-foundation" alt="Discovery Foundation" />
                <h3>Applied AI Implementation Clinics Program</h3>
                <p>
                  <strong>CIBA</strong> is pleased to launch the Discovery Foundation
                  Applied AI Implementation Clinics Program, helping SMEs identify,
                  evaluate, and implement practical AI solutions that improve productivity
                  and competitiveness.
                </p>
                <p>
                  Register below for our fall workshop series to find your AI opportunity,
                  design and test your workflow, and build a practical rollout plan.
                </p>
                <ul className="workshops">
                  {WORKSHOPS.map((w) => (
                    <li key={w.title}>
                      <span className="workshops__date">{w.date}</span>
                      <a href={w.href} target="_blank" rel="noopener noreferrer">
                        {w.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="program-card program-card--promo reveal" style={{ transitionDelay: "160ms" }}>
                <p className="program-promo__eyebrow">Fall series</p>
                <h3>AI Workshop Fall&nbsp;Series</h3>
                <p>
                  Applied AI Implementation Clinics — Health, Clean &amp; Green —
                  Interior&nbsp;BC.
                </p>
                <a className="btn btn--light" href="mailto:info@acceleratebusiness.ca?subject=AI%20Workshops%20Fall%20Series">
                  Register interest
                </a>
              </article>

            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
