export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src="/images/ciba-logo.png" alt="Central Interior Business Accelerator" />
          <p>Helping Central Interior businesses launch, grow, and thrive.</p>
        </div>
        <div className="footer__cols">
          <div>
            <h4>Explore</h4>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/programs">Programs</a>
          </div>
          <div>
            <h4>Connect</h4>
            <a href="/#partners">Partners</a>
            <a href="/news">News</a>
            <a href="/#contact">Contact Us</a>
          </div>
        </div>
      </div>
      <div className="container footer__legal">
        <span>© 2026 Central Interior Business Accelerator. All rights reserved.</span>
      </div>
    </footer>
  );
}
