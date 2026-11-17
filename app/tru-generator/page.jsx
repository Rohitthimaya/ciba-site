import TruShell from "@/components/tru/TruShell";
import TruIcon from "@/components/tru/TruIcon";
import { GENERATOR_CONTACT_FORM } from "@/components/tru/truLinks";
import GenCalendar from "@/components/GenCalendar";
import { findImage } from "@/lib/serverImages";
import { dummyImage } from "@/lib/siteImages";
import { getPublishedEvents, getSiteSettings } from "@/lib/cms";

/*
 * TRU Generator home — a like-for-like rebuild of https://www.tru.ca/generator.html, plus the
 * events calendar (which tru.ca does not have). Markup and class names follow TRU's page so the
 * ported stylesheet (./tru-port.css) applies unchanged.
 */

export const metadata = {
  title: "TRU Generator — Central Interior Business Accelerator",
  description:
    "Make your passion your paycheck. Start your entrepreneurial journey at the TRU Generator — mentorship, education, and venture support for TRU students, faculty, staff, and alumni.",
};

const VIDEO_ID = "teA9WDKivuY";

const FEATURES = [
  {
    title: "Visit Us",
    text: "Book an appointment to visit us in OM662, our new Generator office at Thompson Rivers University.",
    cta: "Learn More",
    href: GENERATOR_CONTACT_FORM,
    img: "images/generator/visit",
    fallback: dummyImage("ciba-gen-visit", 700, 300),
  },
  {
    title: "Events",
    text: "Speakers, workshops, programs, and activities. Look for us where innovative things are happening.",
    cta: "Learn More",
    href: "#calendar",
    img: "images/generator/events",
    fallback: dummyImage("ciba-gen-events", 700, 300),
  },
  {
    title: "Come Meet Us",
    text: "Meet with Generator staff, who will help you formulate your idea and get you started down the right path.",
    cta: "Get Started",
    href: GENERATOR_CONTACT_FORM,
    img: "images/generator/meet",
    fallback: dummyImage("ciba-gen-meet", 700, 300),
  },
];

export default async function TruGeneratorPage() {
  const banner = findImage("images/generator/hero") ?? undefined;
  const quoteImg = findImage("images/generator/quote") ?? dummyImage("ciba-gen-quote", 1100, 300);
  const cibaLogo = findImage("images/generator/ciba-logo") ?? "/images/ciba-logo.png";
  const [events, settings] = await Promise.all([getPublishedEvents(), getSiteSettings()]);
  const videoId = settings.generator?.videoId || VIDEO_ID;

  return (
    <TruShell
      active="home"
      title="TRU Generator"
      hideTitle
      truBar={false}
      banner={banner}
      crumbs={[{ label: "TRU Home", href: "https://www.tru.ca/home.html" }, { label: "TRU Generator" }]}
    >
      {/* Video + intro */}
      <div className="row">
        <div className="medium-8 columns">
          <div className="flex-video widescreen">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?rel=0`}
              title="Visit TRU Generator"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <div className="medium-4 columns">
          <h2>Today is a great day to start a business</h2>
          <p>
            You&apos;ve already learned how to juggle a full schedule, a social life and a bank
            account! You have some of the basic skills required to become a successful
            entrepreneur. The TRU Generator will help develop those skills and teach you how to
            take an entrepreneurial approach to building your business or career.
          </p>
        </div>
      </div>

      <hr className="spacer" />

      {/* Three teasers */}
      <div className="row">
        {FEATURES.map((f) => (
          <div className="medium-4 columns" key={f.title}>
            <img src={findImage(f.img) ?? f.fallback} alt="" />
            <h4>{f.title}</h4>
            <p>{f.text}</p>
            <a className="button tealbg nomargin" href={f.href}>
              {f.cta}
            </a>
          </div>
        ))}
      </div>

      <hr className="spacer" />

      {/* Events calendar — our addition; everything else on this page mirrors tru.ca */}
      <section id="calendar" aria-labelledby="calendar-heading">
        <h2 id="calendar-heading">Upcoming events</h2>
        <p>
          Workshops, mentorship hours, speaker nights, and more — browse by month, week, day, or
          year.
        </p>
        <GenCalendar events={events} renderedAt={new Date().toISOString()} />
      </section>

      <hr className="spacer" />

      {/* Testimonial over a photo */}
      <div
        id="background"
        className="widget"
        style={{ paddingTop: "9rem", paddingBottom: 0, "--tru-quote": `url("${quoteImg}")` }}
      >
        <div id="mentorship" className="widget v1top v1bottom bluebg-st clearfix">
          <p className="lead whitetext size-22">
            &ldquo;Startup Academy Workshops helped our team focus on next steps and get the
            coaching required to launch our business.&rdquo; &mdash; Lee Bergstrand, Amplytica.io
          </p>
        </div>
      </div>

      <hr className="spacer" />

      {/* Powered by CIBA */}
      <div className="panel greybg-pale">
        <div className="row">
          <div className="medium-3 columns">&nbsp;</div>
          <div className="medium-3 columns">
            <h4 className="right">
              <TruIcon name="bolt" sp className="yellowtext" />
              Powered by:
            </h4>
          </div>
          <div className="medium-3 columns">
            <a className="nobg" href="/">
              <img
                style={{ marginTop: 10 }}
                src={cibaLogo}
                alt="Central Interior Business Accelerator"
              />
            </a>
          </div>
          <div className="medium-3 columns">&nbsp;</div>
        </div>
      </div>
    </TruShell>
  );
}
