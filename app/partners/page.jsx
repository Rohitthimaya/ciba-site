import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import LogoTile from "@/components/LogoTile";
import { findImage } from "@/lib/serverImages";

export const metadata = {
  title: "Partners — Central Interior Business Accelerator",
  description:
    "We collaborate with local partners to empower and support entrepreneurship in the Central Interior of B.C.",
};

/* Drop logos into public/images/partners/ as partner-1 … partner-13
   (any of .png/.jpg/.jpeg/.webp/.svg). Add a url to make a tile clickable. */
const PARTNERS = [
  { name: "Community Futures Thompson Country", url: "https://communityfutures.net/" },
  { name: "Merritt & District Chamber of Commerce", url: "https://www.facebook.com/MerrittChamberofCommerce/" },
  { name: "Williams Lake, British Columbia", url: "https://www.williamslake.ca" },
  { name: "Stswék̓wem̓ Economic Development", url: "https://tkemlups.ca/departments/economic-development/business-economic-development/" },
  { name: "Tourism Kamloops", url: "https://www.tourismkamloops.com" },
  { name: "Kamloops & District Chamber of Commerce", url: "https://www.kamloopschamber.ca" },
  { name: "Venture Kamloops", url: "https://www.venturekamloops.com" },
  { name: "BCLC", url: "https://www.bclc.com" },
  { name: "Community Futures Nicola Valley", url: "https://www.cfdcnv.com/" },
  { name: "City of Kamloops — Canada's Tournament Capital", url: "https://www.kamloops.ca" },
  { name: "Community Futures Sun Country", url: "https://www.cfsun.ca/" },
  { name: "Williams Lake & District Chamber of Commerce", url: "https://www.wlchamber.com" },
  { name: "Community Futures Cariboo Chilcotin", url: "https://www.cfdccariboo.com/" },
];

export default function PartnersPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="partners-hero">
          <div className="container partners-hero__inner reveal">
            <p className="eyebrow eyebrow--light">Partners</p>
            <h1>Our partners</h1>
            <p className="partners-hero__lead">
              We collaborate with local partners to empower and support entrepreneurship
              in the Central Interior of B.C. region to help foster a thriving environment
              where businesses can thrive. Here are some of the key organizations we
              collaborate with.
            </p>

            <div className="partners partners--page">
              {PARTNERS.map((p, i) => (
                <div
                  className="reveal"
                  style={{ transitionDelay: `${(i % 5) * 70}ms` }}
                  key={p.name}
                >
                  <LogoTile
                    name={p.name}
                    url={p.url}
                    src={findImage(`images/partners/partner-${i + 1}`)}
                    variant="logo"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
