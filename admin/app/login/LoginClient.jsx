"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginClient() {
  const router = useRouter();
  const params = useSearchParams();
  const setup = params.get("setup") === "1";
  const errorParam = params.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("password");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(
    errorParam === "unauthorized"
      ? "Your account is not authorized for admin access."
      : "",
  );
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !(
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
      )
    ) {
      setError(
        "Supabase is not configured. Copy admin/.env.example to admin/.env.local and add your keys.",
      );
      setLoading(false);
      return;
    }

    const supabase = createClient();

    try {
      if (mode === "magic") {
        const { error: err } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (err) throw err;
        setMessage("Check your email for the magic link.");
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (err) throw err;
        router.replace(params.get("next") || "/");
        router.refresh();
      }
    } catch (err) {
      setError(err.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>CIBA Admin</h1>
        <p>Sign in to manage news, events, people, and site content.</p>

        {setup && (
          <div className="alert alert--info">
            Configure <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code>admin/.env.local</code>.
          </div>
        )}
        {error && <div className="alert alert--error">{error}</div>}
        {message && <div className="alert alert--ok">{message}</div>}

        <form className="form" onSubmit={onSubmit}>
          <label>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </label>
          {mode === "password" && (
            <label>
              Password
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </label>
          )}
          <div className="form__actions">
            <button className="btn btn--primary" type="submit" disabled={loading}>
              {loading ? "Please wait…" : mode === "magic" ? "Send magic link" : "Sign in"}
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setMode(mode === "password" ? "magic" : "password")}
            >
              Use {mode === "password" ? "magic link" : "password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
