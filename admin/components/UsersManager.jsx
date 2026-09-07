"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROLE_LABELS, ROLES, canManageUsers } from "@/lib/roles";

export default function UsersManager({ initialUsers, profile }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState(ROLES.EDITOR);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [loading, setLoading] = useState(false);

  if (!canManageUsers(profile?.role)) {
    return <div className="alert alert--error">Only super admins can manage users.</div>;
  }

  async function invite(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOk("");
    try {
      const res = await fetch("/api/users/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, fullName, role, password: password || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invite failed");
      setOk(data.message || "User created.");
      setEmail("");
      setFullName("");
      setPassword("");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateUser(id, patch) {
    setError("");
    try {
      const res = await fetch("/api/users/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...patch }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      router.refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteUser(id) {
    if (!confirm("Permanently delete this user?")) return;
    setError("");
    try {
      const res = await fetch("/api/users/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      router.refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <div className="toolbar">
        <h2>Users</h2>
      </div>
      {error && <div className="alert alert--error">{error}</div>}
      {ok && <div className="alert alert--ok">{ok}</div>}

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Invite / create user</h3>
        <form className="form" onSubmit={invite}>
          <div className="form__row">
            <label>
              Email
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              Full name
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </label>
          </div>
          <div className="form__row">
            <label>
              Role
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                {Object.values(ROLES).map((r) => (
                  <option key={r} value={r}>
                    {ROLE_LABELS[r]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Temp password (optional)
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="If empty, invite email is sent"
              />
            </label>
          </div>
          <div className="form__actions">
            <button className="btn btn--primary" type="submit" disabled={loading}>
              {loading ? "Working…" : "Add user"}
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {initialUsers.map((u) => (
                <tr key={u.id}>
                  <td>{u.full_name || "—"}</td>
                  <td>{u.email}</td>
                  <td>
                    <select
                      value={u.role}
                      disabled={u.id === profile.id}
                      onChange={(e) => updateUser(u.id, { role: e.target.value })}
                    >
                      {Object.values(ROLES).map((r) => (
                        <option key={r} value={r}>
                          {ROLE_LABELS[r]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <span className={`badge ${u.active ? "badge--ok" : "badge--danger"}`}>
                      {u.active ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td>
                    {u.id !== profile.id && (
                      <>
                        <button
                          type="button"
                          className="btn btn--ghost btn--sm"
                          onClick={() => updateUser(u.id, { active: !u.active })}
                        >
                          {u.active ? "Disable" : "Enable"}
                        </button>{" "}
                        <button
                          type="button"
                          className="btn btn--ghost btn--sm"
                          onClick={() => deleteUser(u.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
