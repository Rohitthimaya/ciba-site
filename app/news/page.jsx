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

        <section className="section section--cream">
          <div className="container news-list">
            {NEWS.map((n, i) => (
              <a
                href={`/news/${n.slug}`}
                className="news-row reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
                key={n.slug}
              >
                <div className="news-row__media">
                  <img src={findImage(n.base) ?? n.fallback} alt="" />
                </div>
                <div className="news-row__body">
                  <div className="news-meta">
                    <span className="news-meta__avatar" aria-hidden="true">
                      {n.author.slice(0, 1)}
                    </span>
                    <span>
                      {n.author} · {n.date} · {n.readTime}
                    </span>
                  </div>
                  <h2>{n.title}</h2>
                  <p>{n.text}</p>
                  <div className="news-row__foot">
                    <span>{n.views} views</span>
                    <span className="news-likes">
                      {n.likes > 0 ? n.likes : ""}{" "}
                      <span aria-hidden="true">{n.likes > 0 ? "♥" : "♡"}</span>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
