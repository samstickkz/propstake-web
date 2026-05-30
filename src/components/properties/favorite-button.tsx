"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { supabaseBrowser } from "@/lib/supabase-browser";

// #17 — toggle a bookmark (save_count is auto-bumped by a DB trigger).
// Guests get bounced to /signin?next=… so they keep their place.

export default function FavoriteButton({
  propertyId,
  size = "md",
}: {
  propertyId: string;
  size?: "sm" | "md";
}) {
  const { user, ready } = useAuth();
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) {
      setSaved(false);
      return;
    }
    supabaseBrowser
      .from("bookmarks")
      .select("user_id")
      .eq("user_id", user.id)
      .eq("property_id", propertyId)
      .maybeSingle()
      .then(({ data }) => setSaved(!!data));
  }, [user, propertyId]);

  const toggle = async () => {
    if (!ready) return;
    if (!user) {
      router.push(`/signin?next=${encodeURIComponent(location.pathname)}`);
      return;
    }
    setBusy(true);
    if (saved) {
      await supabaseBrowser
        .from("bookmarks")
        .delete()
        .eq("user_id", user.id)
        .eq("property_id", propertyId);
      setSaved(false);
    } else {
      await supabaseBrowser
        .from("bookmarks")
        .insert({ user_id: user.id, property_id: propertyId });
      setSaved(true);
    }
    setBusy(false);
  };

  const dim = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const icon = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <button
      onClick={toggle}
      disabled={busy}
      aria-label={saved ? "Remove from favorites" : "Save to favorites"}
      className={`inline-flex ${dim} items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:scale-105 disabled:opacity-60`}
    >
      <svg
        className={`${icon} ${saved ? "fill-rose-500 text-rose-500" : "fill-none text-gray-400"}`}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
        />
      </svg>
    </button>
  );
}
