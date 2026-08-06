function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

/**
 * Shows the person's photo when one exists (resolved server-side),
 * otherwise a monogram with their initials.
 */
export function Avatar({ name, photo, className = "" }) {
  if (photo) {
    return <img className={`avatar ${className}`} src={photo} alt={name} />;
  }
  return (
    <div className={`avatar avatar--initials ${className}`} aria-hidden="true">
      {initials(name)}
    </div>
  );
}

export default function TeamCard({ name, role, bio, photo, delay = 0 }) {
  return (
    <article className="team-card reveal" style={{ transitionDelay: `${delay}ms` }}>
      <header className="team-card__head">
        <Avatar name={name} photo={photo} className="avatar--sm" />
        <div>
          <h3>{name}</h3>
          {role && <span className="team-role">{role}</span>}
        </div>
      </header>
      {bio.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </article>
  );
}
