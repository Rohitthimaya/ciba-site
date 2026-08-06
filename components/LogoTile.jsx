/**
 * Supporter tile: shows the logo (resolved server-side from
 * public/images/partners/) when it exists, otherwise the name as text.
 * Links out to the supporter's website in a new tab.
 */
export default function LogoTile({ name, src, url }) {
  const content = src ? <img src={src} alt={name} /> : <span>{name}</span>;

  if (!url) {
    return (
      <div className="partner" title={name}>
        {content}
      </div>
    );
  }

  return (
    <a
      className="partner"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={name}
      aria-label={`Visit ${name} (opens in a new tab)`}
    >
      {content}
    </a>
  );
}
