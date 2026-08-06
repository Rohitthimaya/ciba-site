/**
 * Supporter / partner tile: shows the logo (resolved server-side)
 * when it exists, otherwise the name as text.
 * Links out to the organization's website in a new tab.
 * variant="logo" applies grayscale → color on hover (partners page).
 */
export default function LogoTile({ name, src, url, variant }) {
  const className = `partner${variant === "logo" ? " partner--logo" : ""}`;
  const content = src ? <img src={src} alt={name} /> : <span>{name}</span>;

  if (!url) {
    return (
      <div className={className} title={name}>
        {content}
      </div>
    );
  }

  return (
    <a
      className={className}
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
