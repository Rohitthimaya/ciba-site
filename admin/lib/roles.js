export const ROLES = {
  SUPER_ADMIN: "super_admin",
  EDITOR: "editor",
  VIEWER: "viewer",
};

export const ROLE_LABELS = {
  super_admin: "Super admin",
  editor: "Editor",
  viewer: "Viewer",
};

export function canManageUsers(role) {
  return role === ROLES.SUPER_ADMIN;
}

export function canWriteContent(role) {
  return role === ROLES.SUPER_ADMIN || role === ROLES.EDITOR;
}

export function canAccessAdmin(role, active = true) {
  return Boolean(active && role && Object.values(ROLES).includes(role));
}

export const NAV_MODULES = [
  { href: "/", label: "Dashboard", roles: ["super_admin", "editor", "viewer"] },
  { href: "/news", label: "News", roles: ["super_admin", "editor", "viewer"] },
  { href: "/events", label: "Events", roles: ["super_admin", "editor", "viewer"] },
  { href: "/people", label: "People", roles: ["super_admin", "editor", "viewer"] },
  { href: "/partners", label: "Partners", roles: ["super_admin", "editor", "viewer"] },
  { href: "/programs", label: "Programs", roles: ["super_admin", "editor", "viewer"] },
  { href: "/faqs", label: "FAQs", roles: ["super_admin", "editor", "viewer"] },
  { href: "/media", label: "Media", roles: ["super_admin", "editor", "viewer"] },
  { href: "/settings", label: "Settings", roles: ["super_admin", "editor", "viewer"] },
  { href: "/users", label: "Users", roles: ["super_admin"] },
];
