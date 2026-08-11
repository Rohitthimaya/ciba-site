import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import GenChrome from "@/components/GenChrome";

export const metadata = {
  title: "Resources — TRU Generator",
  description:
    "Frequently asked questions and startup resources for the TRU Generator — mentorship, education, and entrepreneurial support.",
};

const FAQS = [
  {
    q: "What is the TRU Generator?",
    a: "We provide mentorship, education, and entrepreneurial support, as well as helping identify possible grant opportunities for TRU students, alumni, faculty, and staff. We help turn their passions into paychecks! We also host educational events and workshops, inspirational speakers, and startup coffees. Not to mention, we're a pretty cool place to study. Come and visit us!",
  },
  {
    q: "What is Kamloops Innovation Centre?",
    a: "We're the organization that supports the TRU Generator! We are a non-profit that supports tech entrepreneurs by offering affordable programs that guide, coach and mentor early-stage ventures, collaborative and shared office spaces, and host, facilitate, initiate, partner, sponsor, and generally support all sorts of events that help to grow the tech community in Kamloops and our region.",
  },
  {
    q: "What is the TRU Generator space?",
    a: "It's a great place to come work on projects (school or entrepreneurial), meet other likeminded individuals, and hang out. We have comfy couches and a quiet place to study!",
  },
  {
    q: "Can you help me start my business?",
    a: "Definitely! We can provide a business mentor to help get you started and connect you with available resources in the community.",
  },
  {
    q: "I have an idea, where do I start?",
    a: "Here! The Generator offers workshops to help you build on your ideas, a mentor network for you to connect with for advice, and space for you to work and collaborate with other students. Come on down and talk to us! Or follow us on Facebook, Twitter, and Instagram to stay up to date!",
  },
  {
    q: "How can the TRU Generator help students?",
    a: "Talk with a business coach, meet other student entrepreneurs, and learn about entrepreneurship. We also host educational events, inspirational speakers, and startup coffees.",
  },
  {
    q: "Does my business need to feature a lot of technology?",
    a: "No. Although businesses coming to the TRU Generator need to be innovative, they do not need to be technologically focused.",
  },
  {
    q: "Do I have to be Canadian to start a business in BC?",
    a: "Short answer, no, but there are some legal and tax requirements to look at. For more information, contact us!",
  },
  {
    q: "Do I need funding to start my business?",
    a: "Not necessarily. We can help you navigate the principles around Lean Startup and how to start a business with the least amount of investment as possible. You will, however, need the right amount of time, energy and dedication necessary to create a successful startup.",
  },
  {
    q: "Does the TRU Generator or Kamloops Innovation take a share in my company?",
    a: "No, we do not. Kamloops Innovation is a non-profit funded by the Province of BC and neither the TRU Generator nor Kamloops Innovation will take any stakes in your company. We're just here to help!",
  },
  {
    q: "What happens after I leave TRU?",
    a: "Some companies leave the TRU Generator and go off on their own, some graduate to Kamloops Innovation programs where you'll be brought into our North Shore facility and your mentorship will continue.",
  },
  {
    q: "I'm not interested in starting a business right now, but can I still participate?",
    a: "Absolutely. You can level up your skills for when you embark on an entrepreneurial journey in the future or apply this approach to the work you will do. TRU Generator events are open to everyone.",
  },
  {
    q: "I don't want to run a business, but can I help out?",
    a: (
      <>
        Absolutely. Even if you don&apos;t want to start your own business the TRU
        Generator can be a great place to meet like-minded peers who could use your
        skills. It&apos;s also a great place to study!
        <br />
        <br />
        I want to volunteer for events. Sure, send us an email:{" "}
        <a href="mailto:generator@acceleratebusiness.ca">
          generator@acceleratebusiness.ca
        </a>
      </>
    ),
  },
];

const STARTUP_LINKS = [
  {
    label: "Lean Startup Principles",
    href: "http://theleanstartup.com/principles",
  },
  {
    label: "Business Model Canvas",
    href: "https://canvanizer.com/new/business-model-canvas",
  },
];

export default function TruGeneratorResourcesPage() {
  return (
    <>
      <Navbar />
      <main className="gen">
        <GenChrome active="resources" />

        <div className="gen-hero__frame gen-crumbs">
          <a href="/">Home</a>
          <span aria-hidden="true">›</span>
          <a href="/tru-generator">TRU Generator</a>
          <span aria-hidden="true">›</span>
          <span>Resources</span>
        </div>

        <section className="gen-main gen-main--pad">
          <div className="gen-hero__frame gen-resources">
            <h1 className="gen-resources__title reveal">Resources</h1>

            <h2 className="gen-resources__heading reveal">Frequently asked questions</h2>
            <div className="gen-faq">
              {FAQS.map((item, i) => (
                <details
                  className="gen-faq__item reveal"
                  style={{ transitionDelay: `${Math.min(i, 8) * 40}ms` }}
                  key={item.q}
                >
                  <summary>{item.q}</summary>
                  <div className="gen-faq__body">
                    {typeof item.a === "string" ? <p>{item.a}</p> : item.a}
                  </div>
                </details>
              ))}
            </div>

            <h2 className="gen-resources__heading reveal">Startup resources</h2>
            <ul className="gen-startup-links reveal">
              {STARTUP_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label} <span aria-hidden="true">›</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="gen-powered">
          <div className="container gen-powered__inner reveal">
            <span className="gen-powered__bolt" aria-hidden="true">
              ⚡
            </span>
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
