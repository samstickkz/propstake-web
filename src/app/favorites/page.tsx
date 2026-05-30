"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { supabaseBrowser } from "@/lib/supabase-browser";
import type { PropertyRow } from "@/lib/supabase";

// #17 — the signed-in user's saved listings.

const money = (n: number | null | undefined) =>
  n == null
    ? "—"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(n);

export default function FavoritesPage() {
  const { user, ready } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<PropertyRow[]>([]);

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.replace("/signin?next=/favorites");
      return;
    }
    supabaseBrowser
      .from("bookmarks")
      .select("property:properties(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        const rows = ((data ?? []) as unknown as { property: PropertyRow | null }[])
          .map((r) => r.property)
          .filter((p): p is PropertyRow => p !== null);
        setItems(rows);
        setLoading(false);
      });
  }, [ready, user, router]);

  if (!ready || loading) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-gray-200">
              <div className="h-44 animate-pulse bg-gray-200" />
              <div className="space-y-3 p-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        Favorites
      </h1>
      <p className="mt-1 text-gray-500">
        Listings you&apos;ve saved. Click the heart again to remove.
      </p>

      {items.length === 0 ? (
        <div className="mx-auto mt-16 max-w-md rounded-2xl border border-dashed border-gray-300 px-6 py-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50">
            <svg className="h-7 w-7 text-rose-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
            </svg>
          </div>
          <h3 className="mt-4 text-base font-semibold text-gray-900">
            No saved listings yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Tap the heart on any listing to save it for later.
          </p>
          <Link
            href="/properties"
            className="mt-4 inline-block rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Browse properties
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Link
              key={p.id}
              href={`/properties/${p.id}`}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:shadow-lg"
            >
              <div className="relative h-44 w-full bg-gray-100">
                {p.images?.[0] && (
                  <Image
                    src={p.images[0]}
                    alt={p.name ?? "Property"}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="truncate text-base font-semibold text-gray-900">
                  {p.name}
                </h3>
                <p className="truncate text-sm text-gray-500">
                  {p.location ?? p.city}
                </p>
                <p className="mt-2 text-base font-bold text-emerald-700">
                  {p.listing_type === "crowdfund"
                    ? money(p.amount_funded)
                    : money(p.price)}
                  {p.listing_type === "rent" && (
                    <span className="text-sm font-medium text-gray-500">
                      {p.rent_period === "year" ? " /year" : " /month"}
                    </span>
                  )}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
