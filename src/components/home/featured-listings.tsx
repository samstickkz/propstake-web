import Link from "next/link";
import Image from "next/image";
import { supabase, type PropertyRow } from "@/lib/supabase";

const money = (n: number | null | undefined) =>
  n == null
    ? "—"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(n);

// Featured-listings strip on the landing page (#26).
// Server-rendered, pulls 6 most-recent approved listings (mixed types) so
// visitors see real inventory immediately instead of marketing copy.
export default async function FeaturedListings() {
  const { data } = await supabase
    .from("properties")
    .select(
      "id, name, location, city, listing_type, price, total_cost, amount_funded, rent_period, images"
    )
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(6);

  const listings = (data as PropertyRow[] | null) ?? [];
  if (listings.length === 0) return null;

  return (
    <section className="bg-gray-50 py-14 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Live on PropStake
            </p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
              Featured properties
            </h2>
            <p className="mt-1 max-w-xl text-gray-500">
              Invest in a fraction, rent a home, or buy outright — all listings
              vetted before they go live.
            </p>
          </div>
          <Link
            href="/properties"
            className="hidden shrink-0 rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:border-emerald-600 hover:text-emerald-700 sm:inline-block"
          >
            Browse all →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((p) => {
            const isCrowdfund = p.listing_type === "crowdfund";
            const isRent = p.listing_type === "rent";
            const funded =
              p.total_cost && p.total_cost > 0
                ? Math.round(((p.amount_funded ?? 0) / p.total_cost) * 100)
                : 0;
            const img = p.images?.[0] || "";
            return (
              <Link
                key={p.id}
                href={`/properties/${p.id}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition hover:shadow-md"
              >
                <div className="relative h-44 w-full bg-gray-100">
                  {img && (
                    <Image
                      src={img}
                      alt={p.name ?? "Property"}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition group-hover:scale-[1.03]"
                    />
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
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
                  {isCrowdfund ? (
                    <div className="mt-3">
                      <div className="flex items-baseline justify-between">
                        <span className="text-base font-bold text-emerald-700">
                          {money(p.amount_funded)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {funded}% funded
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 w-full rounded bg-gray-200">
                        <div
                          className="h-1.5 rounded bg-emerald-600"
                          style={{ width: `${Math.min(funded, 100)}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="mt-3 text-base font-bold text-emerald-700">
                      {money(p.price)}
                      {isRent && (
                        <span className="text-sm font-medium text-gray-500">
                          {p.rent_period === "year" ? " /year" : " /month"}
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/properties"
            className="rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700"
          >
            Browse all properties →
          </Link>
        </div>
      </div>
    </section>
  );
}
