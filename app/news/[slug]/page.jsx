import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { NEWS, getPost, getRecentPosts } from "@/lib/newsData";
import { findImage } from "@/lib/serverImages";

export function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "News — CIBA" };
  return {
    title: `${post.title} — Central Interior Business Accelerator`,
    description: post.text,
  };
}

function renderBlock(block, i) {
  switch (block.type) {
    case "h2":
      return <h2 key={i}>{block.text}</h2>;
    case "quote":
      return <blockquote key={i}>{block.text}</blockquote>;
    case "ul":
      return (
        <ul key={i}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "about":
      return (
        <div className="article__about" key={i}>
          <h2>{block.title}</h2>
          <p>{block.text}</p>
        </div>
      );
    default:
      return <p key={i}>{block.text}</p>;
  }
}

export default async function NewsArticlePage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const img = findImage(post.base) ?? post.fallback;
  const recent = getRecentPosts(post.slug, 3);
  const shareUrl = `https://www.acceleratebusiness.ca/news/${post.slug}`;
  const shareText = encodeURIComponent(post.title);
  const contact = post.mediaContact;

  return (
    <>
      <Navbar />
      <main>
        <article className="article">
          <div className="container article__inner">
            <div className="news-meta reveal">
              <span className="news-meta__avatar" aria-hidden="true">
                {post.author.slice(0, 1)}
              </span>
              <span>
                {post.author} · {post.date} · {post.readTime}
              </span>
            </div>

            <h1 className="reveal">{post.title}</h1>
            <p className="article__dek reveal">{post.text}</p>

            <div className="article__hero reveal">
              <img src={img} alt="" />
            </div>

            <div className="article__body reveal">
              {post.blocks.map(renderBlock)}

              {contact && (
                <div className="article__contact">
                  <h3>Media Contact</h3>
                  <p>
                    <strong>{contact.name}</strong>
                    {contact.role && (
                      <>
                        <br />
                        {contact.role}
                      </>
                    )}
                    {contact.org && (
                      <>
                        <br />
                        {contact.org}
                      </>
                    )}
                    {contact.phone && (
                      <>
                        <br />
                        {contact.phone}
                      </>
                    )}
                    {contact.email && (
                      <>
                        <br />
                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                      </>
                    )}
                    {contact.website && (
                      <>
                        <br />
                        <a
                          href={contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {contact.website.replace(/^https?:\/\//, "")}
                        </a>
                      </>
                    )}
                  </p>
                </div>
              )}
            </div>

            <div className="article__share reveal">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
              >
                f
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X"
              >
                𝕏
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
              >
                in
              </a>
              <a
                href={`mailto:?subject=${shareText}&body=${encodeURIComponent(shareUrl)}`}
                aria-label="Share by email"
              >
                ✉
              </a>
            </div>

            <div className="article__stats reveal">
              <span>{post.views} views</span>
              <span className="news-likes">
                {post.likes > 0 ? post.likes : ""}{" "}
                <span aria-hidden="true">{post.likes > 0 ? "♥" : "♡"}</span>
              </span>
            </div>
          </div>
        </article>

        <section className="section section--cream recent-posts">
          <div className="container">
            <div className="recent-posts__head reveal">
              <h2>Recent posts</h2>
              <a href="/news">See all</a>
            </div>
            <div className="recent-posts__grid">
              {recent.map((n, i) => (
                <a
                  href={`/news/${n.slug}`}
                  className="recent-card reveal"
                  style={{ transitionDelay: `${i * 80}ms` }}
                  key={n.slug}
                >
                  <img src={findImage(n.base) ?? n.fallback} alt="" />
                  <div className="recent-card__body">
                    <h3>{n.title}</h3>
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
          </div>
        </section>
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
