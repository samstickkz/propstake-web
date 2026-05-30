import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase, type PropertyRow } from "@/lib/supabase";

// Lister profile page (#11) — shows public bio + their approved listings.
// Builds the "Listed by X — see other listings" trust loop from detail pages.

export const dynamic = "force-dynamic";

const money = (n: number | null | undefined) =>
  n == null
    ? "—"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(n);

type PublicProfile = {
  id: string;
  fname: string | null;
  lname: string | null;
  image_url: string | null;
  created_at: string;
  listing_count: number;
};

async function loadAgent(id: string): Promise<{
  agent: PublicProfile | null;
  listings: PropertyRow[];
}> {
  const { data: rows } = await supabase.rpc("get_public_profile", { p_id: id });
  const agent = (rows as PublicProfile[] | null)?.[0] ?? null;
  if (!agent) return { agent: null, listings: [] };
  const { data: listings } = await supabase
    .from("properties")
    .select("*")
    .eq("owner_id", id)
    .eq("status", "approved")
    .order("created_at", { ascending: false });
  return { agent, listings: (listings as PropertyRow[] | null) ?? [] };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { agent } = await loadAgent(id);
  if (!agent) return { title: "Agent not found" };
  const name = [agent.fname, agent.lname].filter(Boolean).join(" ") || "Agent";
  return {
    title: `${name} on PropStake`,
    description: `${agent.listing_count} active ${
      agent.listing_count === 1 ? "listing" : "listings"
    } from ${name}.`,
  };
}

export default async function AgentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { agent, listings } = await loadAgent(id);
  if (!agent) notFound();

  const name = [agent.fname, agent.lname].filter(Boolean).join(" ") || "Agent";
  const initial = (agent.fname || "A").charAt(0).toUpperCase();
  const memberSince = new Date(agent.created_at).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/properties" className="text-sm text-gray-500 hover:text-gray-800">
        ← Browse all properties
      </Link>

      {/* Hero */}
      <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-gray-200 p-6 sm:flex-row sm:items-center">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-emerald-600">
          {agent.image_url ? (
            <Image
              src={agent.image_url}
              alt={name}
              fill
              sizes="80px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-white">
              {initial}
            </div>
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">{name}</h1>
          <p className="mt-1 text-sm text-gray-500">
            On PropStake since {memberSince} ·{" "}
            <span className="font-medium text-gray-700">
              {agent.listing_count}{" "}
              {agent.listing_count === 1 ? "active listing" : "active listings"}
            </span>
          </p>
        </div>
      </div>

      {/* Listings */}
      <h2 className="mt-8 text-lg font-semibold text-gray-900">Active listings</h2>
      {listings.length === 0 ? (
        <p className="mt-3 text-sm text-gray-500">
          {name} has no live listings right now.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((p) => {
            const isCrowdfund = p.listing_type === "crowdfund";
            const isRent = p.listing_type === "rent";
            const img = p.images?.[0] || "";
            return (
              <Link
                key={p.id}
                href={`/properties/${p.id}`}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:shadow-md"
              >
                <div className="relative h-44 w-full bg-gray-100">
                  {img && (
                    <Image
                      src={img}
                      alt={p.name ?? ""}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition group-hover:scale-[1.03]"
                    />
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase text-white">
                    {isCrowdfund ? "Invest" : isRent ? "Rent" : "Sale"}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="truncate text-base font-semibold text-gray-900">
                    {p.name}
                  </h3>
                  <p className="truncate text-sm text-gray-500">
                    {p.location ?? p.city}
                  </p>
                  <p className="mt-2 text-base font-bold text-emerald-700">
                    {isCrowdfund ? money(p.amount_funded) : money(p.price)}
                    {isRent && (
                      <span className="text-sm font-medium text-gray-500">
                        {p.rent_period === "year" ? " /year" : " /month"}
                      </span>
                    )}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
