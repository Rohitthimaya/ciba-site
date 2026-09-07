"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NAV_MODULES, ROLE_LABELS } from "@/lib/roles";
import { createClient } from "@/lib/supabase/client";

export default function AdminShell({ profile, children }) {
  const pathname = usePathname();
  const router = useRouter();
  const role = profile?.role;

  const links = NAV_MODULES.filter((m) => m.roles.includes(role));

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="sidebar__brand">
          <strong>CIBA Admin</strong>
          <span>Content &amp; operations</span>
        </div>
        <nav className="sidebar__nav">
          {links.map((l) => {
            const active =
              l.href === "/"
                ? pathname === "/"
                : pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link key={l.href} href={l.href} className={active ? "is-active" : undefined}>
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="sidebar__foot">
          <div className="sidebar__user">
            {profile?.full_name || profile?.email}
            <br />
            {ROLE_LABELS[role] || role}
          </div>
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={signOut}
            style={{ color: "#fff", borderColor: "rgba(255,255,255,0.2)" }}
          >
            Sign out
          </button>
        </div>
      </aside>
      <div className="main">
        <header className="topbar">
          <h1>Central Interior Business Accelerator</h1>
          <a
            className="btn btn--ghost btn--sm"
            href={process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}
            target="_blank"
            rel="noreferrer"
          >
            View site
          </a>
        </header>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
