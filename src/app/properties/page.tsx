import Link from "next/link";
import Image from "next/image";
import {
  supabase,
  LISTING_TABS,
  type ListingType,
  type PropertyRow,
} from "@/lib/supabase";

export const dynamic = "force-dynamic"; // always reflect live listings

const money = (n: number | null | undefined) =>
  n == null
    ? "—"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(n);

type SP = { type?: string; city?: string; sort?: string };

function buildHref(base: SP, patch: Partial<SP>) {
  const merged = { ...base, ...patch };
  const params = new URLSearchParams();
  if (merged.type) params.set("type", merged.type);
  if (merged.city) params.set("city", merged.city);
  if (merged.sort) params.set("sort", merged.sort);
  const qs = params.toString();
  return `/properties${qs ? `?${qs}` : ""}`;
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const type: ListingType =
    sp.type === "rent" || sp.type === "sale" ? sp.type : "crowdfund";
  const city = sp.city;
  const sort = sp.sort ?? "newest";
  const priceCol = type === "crowdfund" ? "total_cost" : "price";

  let query = supabase
    .from("properties")
    .select("*")
    .eq("status", "approved")
    .eq("listing_type", type);
  if (city) query = query.eq("city", city);
  if (sort === "price_asc") query = query.order(priceCol, { ascending: true });
  else if (sort === "price_desc")
    query = query.order(priceCol, { ascending: false });
  else query = query.order("created_at", { ascending: false });

  const { data, error } = await query;
  const listings = (data as PropertyRow[] | null) ?? [];

  // Distinct cities for the active type → filter chips.
  const { data: cityRows } = await supabase
    .from("properties")
    .select("city")
    .eq("status", "approved")
    .eq("listing_type", type);
  const cities = Array.from(
    new Set((cityRows ?? []).map((r) => r.city).filter(Boolean) as string[])
  ).sort();

  const currentSP: SP = { type, city, sort };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-800">
          ← PropStake
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        Properties
      </h1>
      <p className="mt-1 text-gray-500">
        Invest in fractions, rent a home, or buy outright — all in one place.
      </p>

      {/* Type tabs */}
      <div className="mt-6 inline-flex rounded-xl bg-gray-100 p-1">
        {LISTING_TABS.map((t) => {
          const active = t.key === type;
          return (
            <Link
              key={t.key}
              href={buildHref({}, { type: t.key })}
              className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
                active
                  ? "bg-emerald-600 text-white shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </div>

      {/* Filters: city + sort */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {cities.length > 0 && (
          <>
            <Link
              href={buildHref(currentSP, { city: undefined })}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                !city
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              All cities
            </Link>
            {cities.map((c) => (
              <Link
                key={c}
                href={buildHref(currentSP, { city: c })}
                className={`rounded-full border px-3 py-1 text-xs font-medium ${
                  city === c
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                {c}
              </Link>
            ))}
          </>
        )}
        <span className="mx-2 hidden h-4 w-px bg-gray-300 sm:inline-block" />
        {[
          { k: "newest", l: "Newest" },
          { k: "price_asc", l: "Price ↑" },
          { k: "price_desc", l: "Price ↓" },
        ].map((s) => (
          <Link
            key={s.k}
            href={buildHref(currentSP, { sort: s.k })}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${
              sort === s.k
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-300 text-gray-700 hover:border-gray-400"
            }`}
          >
            {s.l}
          </Link>
        ))}
      </div>

      {/* Grid */}
      {error ? (
        <p className="mt-10 text-red-600">
          Couldn’t load listings. Please try again.
        </p>
      ) : listings.length === 0 ? (
        <p className="mt-16 text-center text-gray-500">
          No {LISTING_TABS.find((t) => t.key === type)?.label.toLowerCase()}{" "}
          listings{city ? ` in ${city}` : ""} yet.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((p) => (
            <ListingCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </main>
  );
}

function ListingCard({ p }: { p: PropertyRow }) {
  const img = p.images?.[0] || "";
  const isCrowdfund = p.listing_type === "crowdfund";
  const isRent = p.listing_type === "rent";
  const funded =
    p.total_cost && p.total_cost > 0
      ? Math.round(((p.amount_funded ?? 0) / p.total_cost) * 100)
      : 0;

  return (
    <Link
      href={`/properties/${p.id}`}
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:shadow-lg"
    >
      <div className="relative h-48 w-full bg-gray-100">
        {img ? (
          <Image
            src={img}
            alt={p.name ?? "Property"}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition group-hover:scale-[1.03]"
          />
        ) : null}
        {!isCrowdfund && (
          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
            {isRent ? "For rent" : "For sale"}
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>{p.bed_amount ?? 0} beds</span>
          {p.property_kind && <span className="capitalize">{p.property_kind}</span>}
          <span>{p.city ?? p.country}</span>
        </div>
        <h3 className="mt-1 truncate text-base font-semibold text-gray-900">
          {p.name}
        </h3>
        <p className="truncate text-sm text-gray-500">{p.location}</p>

        {isCrowdfund ? (
          <div className="mt-3">
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-bold text-emerald-700">
                {money(p.amount_funded)}
              </span>
              <span className="text-xs text-gray-500">{funded}% funded</span>
            </div>
            <div className="mt-1 h-1.5 w-full rounded bg-gray-200">
              <div
                className="h-1.5 rounded bg-emerald-600"
                style={{ width: `${Math.min(funded, 100)}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              {(p.return_percentage_per_year ?? 0).toFixed(0)}% / yr ·{" "}
              {(p.return_percentage_five_years ?? 0).toFixed(0)}% / 5 yr
            </p>
          </div>
        ) : (
          <p className="mt-3 text-lg font-bold text-emerald-700">
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
}
