const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/acceleratebusiness.ca/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/centralinteriorbusinessaccelerator",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M14 8h2.5V5.5H14c-1.9 0-3.5 1.6-3.5 3.5v2H8v3h2.5V20H14v-6h2.3l.5-3H14V9c0-.6.4-1 1-1z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/c-i-b-a/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.5 9.5H4V20h2.5V9.5zM5.25 4A1.75 1.75 0 1 0 5.25 7.5 1.75 1.75 0 0 0 5.25 4zM20 20h-2.5v-5.3c0-1.5-.5-2.5-1.8-2.5-1 0-1.5.7-1.75 1.3-.1.2-.1.5-.1.8V20H11.4s.05-9.3 0-10.3H13.9v1.5c.35-.55 1.15-1.7 2.9-1.7 2.15 0 3.2 1.4 3.2 4.15V20z" />
      </svg>
    ),
  },
];

/**
 * Follow-us social icons.
 * variant: "on-dark" (footer / CTA) | "on-light" (cream sections)
 */
export default function SocialLinks({ variant = "on-dark", className = "" }) {
  return (
    <div className={`socials socials--${variant} ${className}`.trim()} aria-label="Follow us on social media">
      {SOCIALS.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${s.name} (opens in a new tab)`}
          title={s.name}
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}
