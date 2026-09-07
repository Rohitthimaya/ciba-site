import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import GenChrome from "@/components/GenChrome";
import GenCalendar from "@/components/GenCalendar";
import { findImage } from "@/lib/serverImages";
import { dummyImage } from "@/lib/siteImages";
import { getPublishedEvents, getSiteSettings } from "@/lib/cms";

export const metadata = {
  title: "TRU Generator — Central Interior Business Accelerator",
  description:
    "Make your passion your paycheck. Start your entrepreneurial journey at the TRU Generator — mentorship, education, and venture support for TRU students, faculty, staff, and alumni.",
};

const VIDEO_ID = "teA9WDKivuY";

const FEATURES = [
  {
    title: "Visit Us",
    text: "Book an appointment to visit us in the Brown Family House of Learning. We are located in the basement.",
    cta: "Learn more",
    href: "mailto:generator@acceleratebusiness.ca?subject=Visit%20TRU%20Generator",
    img: "images/generator/visit",
    fallback: dummyImage("ciba-gen-visit", 640, 420),
  },
  {
    title: "Events",
    text: "Speakers, workshops, programs, and activities. Look for us where innovative things are happening.",
    cta: "View calendar",
    href: "#calendar",
    img: "images/generator/events",
    fallback: dummyImage("ciba-gen-events", 640, 420),
  },
  {
    title: "Come Meet Us",
    text: "Meet with Generator staff, who will help you formulate your idea and get you started down the right path.",
    cta: "Get started",
    href: "mailto:generator@acceleratebusiness.ca?subject=Meet%20TRU%20Generator",
    img: "images/generator/meet",
    fallback: dummyImage("ciba-gen-meet", 640, 420),
  },
];

export default async function TruGeneratorPage() {
  const quoteImg = findImage("images/generator/quote") ?? dummyImage("ciba-gen-quote", 1400, 700);
  const [events, settings] = await Promise.all([getPublishedEvents(), getSiteSettings()]);
  const videoId = settings.generator?.videoId || VIDEO_ID;

  return (
    <>
      <Navbar />
      <main className="gen">
        <GenChrome active="home" />

        <div className="gen-hero__frame gen-crumbs">
          <a href="/">Home</a>
          <span aria-hidden="true">›</span>
          <span>TRU Generator</span>
        </div>

        {/* Intro + video */}
        <section className="gen-main" id="about-gen">
          <div className="gen-hero__frame gen-intro">
            <div className="gen-intro__media reveal">
              <div className="gen-video">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                  title="Visit TRU Generator"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="gen-intro__text reveal">
              <h2>Today is a great day to start a business</h2>
              <p>
                You&apos;ve already learned how to juggle a full schedule, a social life and a
                bank account! You have some of the basic skills required to become a
                successful entrepreneur. The TRU Generator will help develop those skills
                and teach you how to take an entrepreneurial approach to building your
                business or career.
              </p>
            </div>
          </div>
        </section>

        {/* Feature cards */}
        <section className="gen-features-wrap" id="events">
          <div className="gen-hero__frame">
            <div className="gen-features">
              {FEATURES.map((f, i) => (
                <article
                  className="gen-feature reveal"
                  style={{ transitionDelay: `${i * 90}ms` }}
                  key={f.title}
                >
                  <img src={findImage(f.img) ?? f.fallback} alt="" />
                  <div className="gen-feature__body">
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                    <a
                      className="gen-btn gen-btn--teal"
                      href={f.href}
                      {...(f.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {f.cta} <span aria-hidden="true">›</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Events calendar */}
        <section className="gen-calendar-wrap" id="calendar">
          <div className="gen-hero__frame">
            <div className="gen-calendar-wrap__head reveal">
              <h2>Upcoming events</h2>
              <p>
                Workshops, mentorship hours, speaker nights, and more — browse by
                month, week, day, or year.
              </p>
            </div>
            <div className="reveal">
              <GenCalendar events={events} />
            </div>
          </div>
        </section>

        {/* Mentorship / testimonial */}
        <section className="gen-quote" id="mentorship">
          <img className="gen-quote__bg" src={quoteImg} alt="" />
          <div className="gen-quote__shade" />
          <blockquote className="container gen-quote__inner reveal">
            <p>
              &ldquo;Startup Academy Workshops helped our team focus on next steps and get
              the coaching required to launch our business.&rdquo;
            </p>
            <cite>— Lee Bergstrand, Amplytica.io</cite>
          </blockquote>
        </section>

        {/* Powered by / partnership */}
        <section className="gen-powered">
          <div className="container gen-powered__inner reveal">
            <span className="gen-powered__bolt" aria-hidden="true">⚡</span>
            <span className="gen-powered__label">Powered by</span>
            <img src="/images/ciba-logo.png" alt="Central Interior Business Accelerator" />
          </div>
        </section>
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
