"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function RowActions({ href, table, id, confirmLabel = "Delete this item?" }) {
  const router = useRouter();

  async function onDelete() {
    if (!confirm(confirmLabel)) return;
    const supabase = createClient();
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    router.refresh();
  }

  return (
    <span style={{ whiteSpace: "nowrap" }}>
      <Link className="btn btn--ghost btn--sm" href={href}>
        Edit
      </Link>{" "}
      <button type="button" className="btn btn--ghost btn--sm" onClick={onDelete}>
        Delete
      </button>
    </span>
  );
}
