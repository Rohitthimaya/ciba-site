import { Fragment } from "react";
import TruShell from "@/components/tru/TruShell";
import TruAccordion from "@/components/tru/TruAccordion";
import { findImage } from "@/lib/serverImages";

/*
 * TRU Generator resources — rebuild of https://www.tru.ca/generator/resources.html
 * (FAQ accordion + "Startup resources" sidebar) inside the shared TRU page shell.
 */

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
    a: "Absolutely. Even if you don't want to start your own business the TRU Generator can be a great place to meet like-minded peers who could use your skills. It's also a great place to study!",
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
  const banner =
    findImage("images/generator/resources-banner") ?? findImage("images/generator/hero") ?? undefined;

  return (
    <TruShell
      active="resources"
      title="Resources"
      truBar={false}
      banner={banner}
      crumbs={[
        { label: "TRU Home", href: "https://www.tru.ca/home.html" },
        { label: "TRU Generator", href: "/tru-generator" },
        { label: "Resources" },
      ]}
    >
      <div className="row">
        <div className="medium-9 columns">
          <h4>Frequently asked questions</h4>
          <TruAccordion
            items={FAQS.map((item) => ({
              q: item.q,
              a: <p>{item.a}</p>,
            }))}
          />
          <p>
            I want to volunteer for events. Sure, send us an email:{" "}
            <a href="mailto:generator@acceleratebusiness.ca">generator@acceleratebusiness.ca</a>
          </p>
        </div>
        <div className="medium-3 columns sidebar-right">
          <div className="widget">
            <h4 className="altHead">Startup resources</h4>
            <ul className="block nopadding arrowlist">
              {STARTUP_LINKS.map((link) => (
                <Fragment key={link.href}>
                  <li>
                    <a href={link.href}>{link.label}</a>
                  </li>
                  {/* inline-block items: keep the word space TRU's markup has between them */}{" "}
                </Fragment>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </TruShell>
  );
}
