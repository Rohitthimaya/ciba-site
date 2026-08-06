import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { NEWS } from "@/lib/newsData";
import { findImage } from "@/lib/serverImages";

export const metadata = {
  title: "News — Central Interior Business Accelerator",
  description: "News, announcements, and success stories from the Central Interior Business Accelerator.",
};

export default function NewsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="page-head">
          <div className="container">
            <p className="eyebrow eyebrow--light">News</p>
            <h1>What&apos;s happening</h1>
            <p className="page-head__sub">
              Announcements, press releases, and success stories from across the
              Central Interior.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="news-grid">
              {NEWS.map((n, i) => (
                <article
                  className="news-card reveal"
                  style={{ transitionDelay: `${i * 90}ms` }}
                  key={n.title}
                >
                  <img src={findImage(n.base) ?? n.fallback} alt="" />
                  <div className="news-card__body">
                    <span className="news-card__date">{n.tag}</span>
                    <h3>{n.title}</h3>
                    <p>{n.text}</p>
                  </div>
                </article>
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
