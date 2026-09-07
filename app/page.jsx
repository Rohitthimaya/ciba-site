import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Stats from "@/components/Stats";
import ScrollReveal from "@/components/ScrollReveal";
import LogoTile from "@/components/LogoTile";
import SocialLinks from "@/components/SocialLinks";
import { dummyImage } from "@/lib/siteImages";
import { getPublishedNews, getSiteSettings } from "@/lib/cms";
import { findImage, listImages } from "@/lib/serverImages";

const newsImg = (n) => (n.base && findImage(n.base)) || n.image || n.fallback;

const SERVICES = [
  "Market Validation",
  "Growth Strategies",
  "Technology Development",
  "Business Planning",
  "Technology Integration",
  "IP Strategy",
];

const GOALS = [
  {
    tone: "goal--plum",
    title: "Driving Success",
    points: [
      "Elevate startups to achieve measurable success.",
      "Facilitate business growth in revenue, jobs, and market impact.",
    ],
  },
  {
    tone: "goal--ink",
    title: "Providing Critical Knowledge",
    points: [
      "Hosting knowledge-building events, workshops, and education opportunities.",
      "Mobilizing knowledge and resources vital for success.",
    ],
  },
  {
    tone: "goal--sage",
    title: "Building a Thriving Ecosystem",
    points: [
      "Growing our network throughout the Central Interior of B.C. to help you connect to a vibrant business community.",
      "Creating connections with other business leaders to help provide support and empower entrepreneurs.",
    ],
  },
  {
    tone: "goal--plumdeep",
    title: "Local Strength, Global Impact",
    points: [
      "Strengthening ties with local communities and industries.",
      "Contributing to regional economic development and resilience.",
    ],
  },
];

// Edit the url of each supporter here — tiles link out in a new tab.
const SUPPORTERS = [
  { name: "Thompson Rivers University", url: "https://www.tru.ca" },
  { name: "Discovery Foundation", url: "https://www.discoveryfoundation.ca" },
  { name: "New Ventures BC", url: "https://www.newventuresbc.com" },
  { name: "KPMG", url: "https://kpmg.com/ca" },
  { name: "ETSI-BC", url: "https://www.etsi-bc.ca" },
  { name: "PacifiCan", url: "https://www.canada.ca/en/pacific-economic-development.html" },
  { name: "Government of Canada & B.C.", url: "https://www2.gov.bc.ca" },
  { name: "Innovate BC", url: "https://www.innovatebc.ca" },
];

export default async function Home() {
  const [NEWS, settings] = await Promise.all([
    getPublishedNews(),
    getSiteSettings(),
  ]);
  const featured = NEWS[0] || NEWS[NEWS.length - 1];
  const side = NEWS.slice(1, 3);
  const contactEmail =
    settings.contact?.email || "hello@acceleratebusiness.ca";

  return (
    <>
      <Navbar />
      <main>
        <Hero images={listImages("images/hero")} />

        <section className="section section--cream" id="about">
          <div className="container split">
            <div className="split__text reveal">
              <p className="eyebrow">Who we are</p>
              <h2>Let&apos;s build something incredible&nbsp;— together</h2>
              <p>
                <strong>Central Interior Business Accelerator</strong> (formerly Kamloops
                Innovation) is a nonprofit organization dedicated to empowering emerging and
                established organizations throughout the Central Interior region of British
                Columbia to thrive and transform.
              </p>
              <p>
                Sketching out your first business plan on the back of a napkin? Or a
                battle-tested business owner looking to scale up? Either way, we&apos;ve got
                your back. No more going it alone.
              </p>
              <a className="btn btn--dark" href="#contact">Learn more</a>
            </div>
            <div className="split__media reveal">
              <img
                src={findImage("images/about") ?? dummyImage("ciba-about", 720, 560)}
                alt="Entrepreneurs collaborating"
              />
            </div>
          </div>

          <div className="container audiences">
            <h3 className="audiences__title">We work with organizations at every stage</h3>
            <div className="audiences__grid">
              <div className="audience audience--sage reveal">
                <span className="audience__num">1</span>
                <p>New business start ups that need support and guidance.</p>
              </div>
              <div className="audience audience--plum reveal" style={{ transitionDelay: "110ms" }}>
                <span className="audience__num">2</span>
                <p>Seasoned entrepreneurs who want to take their business to the next level.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mission">
          <div className="container mission__inner reveal">
            <p className="eyebrow eyebrow--light">Mission</p>
            <p className="mission__statement">
              Inspire <em>innovation</em>, support <em>growth</em>, and empower the{" "}
              <em>success</em> of startups and businesses across the Central Interior
              of&nbsp;B.C.
            </p>
          </div>
        </section>

        <section className="section" id="what-we-do">
          <div className="container whatwedo">
            <div className="whatwedo__intro reveal">
              <p className="eyebrow">What we do</p>
              <h2>Turning &ldquo;what if&rdquo; into &ldquo;what&apos;s next&rdquo;</h2>
              <p className="whatwedo__lead">
                Got a business dream you can&apos;t shake? We&apos;re here for that. Whether
                you&apos;re figuring out how to make your idea real, looking to work smarter
                with AI, growing and scaling your enterprise, or protecting your big
                ideas&nbsp;— <strong>Central Interior Business Accelerator</strong> helps
                organizations like yours thrive and transform.
              </p>
              <p className="whatwedo__sub">
                Find customized solutions to elevate your business through these programs
                and services:
              </p>
            </div>
            <ul className="services">
              {SERVICES.map((s, i) => (
                <li className="service reveal" style={{ transitionDelay: `${i * 70}ms` }} key={s}>
                  {s}
                </li>
              ))}
            </ul>
            <div className="whatwedo__outro reveal">
              <p>
                Don&apos;t see a service or program you need? Get in touch today to see how
                Central Interior Business Accelerator can elevate and strengthen your
                organization. <strong>Ready when you are! Let&apos;s connect!</strong>
              </p>
              <a className="btn btn--dark" href="#contact">Connect with us</a>
            </div>
          </div>
        </section>

        <Stats />

        <section className="section section--cream" id="goals">
          <div className="container">
            <p className="eyebrow">Our goals</p>
            <h2>What we&apos;re building toward</h2>
            <div className="goals-grid">
              {GOALS.map((g, i) => (
                <article
                  className={`goal ${g.tone} reveal`}
                  style={{ transitionDelay: `${i * 90}ms` }}
                  key={g.title}
                >
                  <h3 className="goal__head">{g.title}</h3>
                  <ul>
                    {g.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="news">
          <div className="container">
            <div className="news-head reveal">
              <div>
                <p className="eyebrow">News</p>
                <h2>What&apos;s happening</h2>
              </div>
              <a className="btn btn--ghost" href="/news">More posts</a>
            </div>
            <div className="news-feature-grid">
              {featured && (
                <a href={`/news/${featured.slug}`} className="news-card news-card--featured reveal">
                  <img src={newsImg(featured)} alt="" />
                  <div className="news-card__body">
                    <span className="news-card__date">{featured.tag}</span>
                    <h3>{featured.title}</h3>
                    <p>{featured.text}</p>
                    <span className="card__link">Read more</span>
                  </div>
                </a>
              )}
              <div className="news-side">
                {side.map((n, i) => (
                  <a
                    href={`/news/${n.slug}`}
                    className="news-card news-card--row reveal"
                    style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                    key={n.slug}
                  >
                    <img src={newsImg(n)} alt="" />
                    <div className="news-card__body">
                      <span className="news-card__date">{n.tag}</span>
                      <h3>{n.title}</h3>
                      <p>{n.text}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section section--cream" id="supporters">
          <div className="container supporters reveal">
            <p className="eyebrow">Our supporters</p>
            <h2>Stronger together</h2>
            <p className="section__lead">
              We&apos;re grateful to the partners and supporters who help open doors for
              businesses across the Central Interior.
            </p>
            <div className="partners">
              {SUPPORTERS.map((s, i) => (
                <LogoTile
                  name={s.name}
                  url={s.url}
                  src={findImage(`images/partners/supporter-${i + 1}`)}
                  key={s.name}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="land" aria-label="Land acknowledgment">
          <div className="container land__inner reveal">
            <p>
              We acknowledge that Central Interior Business Accelerator operates within the
              unceded, ancestral lands of the Secwépemc, Nłeʔkepmxc, Ktunaxa, Syilx, Sníxt,
              and Nlaka&apos;pamux Nations. We are thankful to be able to work, build, and
              live on this land.
            </p>
          </div>
        </section>

        <section className="cta" id="contact">
          <div className="container cta__inner">
            <h2>Ready to build something?</h2>
            <p>
              Tell us about your business — we&apos;ll help you find the right program, people,
              and path forward.
            </p>
            <a className="btn btn--light btn--lg" href={`mailto:${contactEmail}`}>
              Contact us
            </a>
            <SocialLinks variant="on-dark" className="cta__socials" />
          </div>
        </section>
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
