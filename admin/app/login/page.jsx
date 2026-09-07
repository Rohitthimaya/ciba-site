import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="login-page">Loading…</div>}>
      <LoginClient />
    </Suspense>
  );
}
