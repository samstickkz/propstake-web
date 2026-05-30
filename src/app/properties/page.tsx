import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  supabase,
  LISTING_TABS,
  type ListingType,
  type PropertyRow,
} from "@/lib/supabase";
import type { MapPoint } from "@/components/properties/listing-map";
import ListingMap from "@/components/properties/listing-map-client";

export const dynamic = "force-dynamic"; // always reflect live listings

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SP>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const type: ListingType =
    sp.type === "rent" || sp.type === "sale" ? sp.type : "crowdfund";
  const titles: Record<ListingType, { title: string; desc: string }> = {
    crowdfund: {
      title: "Fractional property investment",
      desc: "Browse and invest in vetted properties for as little as a fraction of the listing price — passive income from prime real estate.",
    },
    rent: {
      title: "Properties for rent",
      desc: "Apartments, villas and townhouses available to rent across Dubai, Abu Dhabi and the wider region. Filter by city, beds and price.",
    },
    sale: {
      title: "Properties for sale",
      desc: "Apartments, villas, and homes for sale. Browse verified listings from owners and agents — filter by city, beds and price range.",
    },
  };
  const t = titles[type];
  return {
    title: t.title,
    description: t.desc,
    openGraph: { title: t.title, description: t.desc, type: "website" },
    twitter: { card: "summary_large_image", title: t.title, description: t.desc },
  };
}

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
        <div className="mx-auto mt-16 max-w-md rounded-2xl border border-dashed border-gray-300 px-6 py-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
            <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9.75L12 3l9 6.75M5.25 9.75v10.5h13.5V9.75M9.75 20.25v-6h4.5v6" />
            </svg>
          </div>
          <h3 className="mt-4 text-base font-semibold text-gray-900">
            No {LISTING_TABS.find((t) => t.key === type)?.label.toLowerCase()} listings{city ? ` in ${city}` : ""} — yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {city
              ? "Try another city, or browse all locations."
              : type === "crowdfund"
                ? "New investment opportunities are added regularly. Check back soon."
                : "Be among the first to see new listings as they come online."}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {city && (
              <Link
                href={buildHref(currentSP, { city: undefined })}
                className="rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                All cities
              </Link>
            )}
            {type !== "crowdfund" && (
              <Link
                href="/properties"
                className="rounded-full border border-gray-300 px-4 py-1.5 text-sm font-semibold text-gray-700 hover:border-gray-400"
              >
                Browse crowdfund
              </Link>
            )}
          </div>
        </div>
      ) : (
        <>
          {(() => {
            const points: MapPoint[] = listings
              .filter((p) => p.lat != null && p.lng != null)
              .map((p) => ({
                id: p.id,
                name: p.name,
                lat: p.lat as number,
                lng: p.lng as number,
                type: p.listing_type,
                price: p.price,
                total_cost: p.total_cost,
                rent_period: p.rent_period,
                city: p.city,
              }));
            return points.length > 0 ? (
              <div className="mt-6">
                <ListingMap points={points} />
              </div>
            ) : null;
          })()}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((p) => (
              <ListingCard key={p.id} p={p} />
            ))}
          </div>
        </>
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
  const verified = p.is_verified === true;
  const views = p.view_count ?? 0;
  const saves = p.save_count ?? 0;

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
        {verified && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 shadow">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 10-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified
          </span>
        )}
        {(views > 0 || saves > 0) && (
          <div className="absolute bottom-3 left-3 flex gap-1.5">
            {views > 0 && (
              <span className="rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white">
                {views.toLocaleString()} {views === 1 ? "view" : "views"}
              </span>
            )}
            {saves > 0 && (
              <span className="rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white">
                ♥ {saves.toLocaleString()}
              </span>
            )}
          </div>
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
