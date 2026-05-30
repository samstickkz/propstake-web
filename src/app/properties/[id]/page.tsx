import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase, type PropertyRow } from "@/lib/supabase";
import ImageGallery from "@/components/properties/image-gallery";
import YieldCalculator from "@/components/properties/yield-calculator";
import EnquireForm from "@/components/properties/enquire-form";
import ViewTracker from "@/components/properties/view-tracker";
import FavoriteButton from "@/components/properties/favorite-button";

export const dynamic = "force-dynamic";

const money = (n: number | null | undefined) =>
  n == null
    ? "—"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(n);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { data } = await supabase
    .from("properties")
    .select(
      "name, city, country, description, images, listing_type, price, total_cost, rent_period"
    )
    .eq("id", id)
    .eq("status", "approved")
    .maybeSingle();
  const p = data as Pick<
    PropertyRow,
    | "name"
    | "city"
    | "country"
    | "description"
    | "images"
    | "listing_type"
    | "price"
    | "total_cost"
    | "rent_period"
  > | null;
  if (!p) return { title: "Property not found" };

  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const headline =
    p.listing_type === "crowdfund"
      ? `Invest in ${p.name}`
      : p.listing_type === "rent"
        ? `${p.name} for rent — ${fmt.format(p.price ?? 0)}${p.rent_period === "year" ? "/year" : "/month"}`
        : `${p.name} for sale — ${fmt.format(p.price ?? 0)}`;
  const desc =
    p.description?.trim() ||
    `${p.name ?? "Property"} in ${p.city ?? p.country ?? "the region"} — view full details on PropStake.`;
  const img = p.images?.[0];
  return {
    title: p.name ?? "Property",
    description: desc,
    openGraph: {
      title: headline,
      description: desc,
      type: "website",
      images: img
        ? [{ url: img, width: 1200, height: 630, alt: p.name ?? "Property" }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: headline,
      description: desc,
      images: img ? [img] : undefined,
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .eq("status", "approved")
    .maybeSingle();

  const p = data as PropertyRow | null;
  if (!p) notFound();

  const isCrowdfund = p.listing_type === "crowdfund";
  const isRent = p.listing_type === "rent";
  const funded =
    p.total_cost && p.total_cost > 0
      ? Math.round(((p.amount_funded ?? 0) / p.total_cost) * 100)
      : 0;
  const badge = !isCrowdfund ? (isRent ? "For rent" : "For sale") : undefined;
  const views = p.view_count ?? 0;
  const saves = p.save_count ?? 0;
  const verified = p.is_verified === true;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <ViewTracker propertyId={p.id} />

      <Link
        href={`/properties?type=${p.listing_type}`}
        className="text-sm text-gray-500 hover:text-gray-800"
      >
        ← Back to listings
      </Link>

      <div className="mt-4">
        <ImageGallery images={p.images ?? []} alt={p.name ?? "Property"} badge={badge} />
      </div>

      {/* trust signals row */}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
        {verified && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 10-1.4 1.4l2 2a1 1 0 001.4 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Verified listing
          </span>
        )}
        {views > 0 && (
          <span>
            {views.toLocaleString()} {views === 1 ? "view" : "views"}
          </span>
        )}
        {saves > 0 && (
          <span>
            Saved by {saves.toLocaleString()} {saves === 1 ? "person" : "people"}
          </span>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{p.name}</h1>
              <p className="mt-1 text-gray-500">{p.location}</p>
            </div>
            <FavoriteButton propertyId={p.id} />
          </div>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-600">
            <span>{p.bed_amount ?? 0} bedrooms</span>
            {p.property_kind && (
              <span className="capitalize">{p.property_kind}</span>
            )}
            <span>{p.city ?? p.country}</span>
          </div>
          {p.description && (
            <p className="mt-5 leading-relaxed text-gray-700">{p.description}</p>
          )}

          {/* #14 calculator below description */}
          <div className="mt-6">
            {isCrowdfund ? (
              <YieldCalculator
                type="crowdfund"
                yearlyPct={Number(p.return_percentage_per_year ?? 0)}
                fiveYearPct={Number(p.return_percentage_five_years ?? 0)}
              />
            ) : isRent ? (
              <YieldCalculator
                type="rent"
                amount={Number(p.price ?? 0)}
                period={p.rent_period}
              />
            ) : (
              <YieldCalculator type="sale" price={Number(p.price ?? 0)} />
            )}
          </div>
        </div>

        {/* Pricing / CTA panel */}
        <div className="w-full shrink-0 space-y-4 lg:w-80">
          <div className="rounded-2xl border border-gray-200 p-5">
            {isCrowdfund ? (
              <>
                <p className="text-sm text-gray-500">Raised so far</p>
                <p className="text-2xl font-bold text-emerald-700">
                  {money(p.amount_funded)}
                </p>
                <div className="mt-2 h-2 w-full rounded bg-gray-200">
                  <div
                    className="h-2 rounded bg-emerald-600"
                    style={{ width: `${Math.min(funded, 100)}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {funded}% of {money(p.total_cost)} target
                </p>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Yearly return</dt>
                    <dd className="font-medium">
                      {(p.return_percentage_per_year ?? 0).toFixed(0)}%
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">5-year return</dt>
                    <dd className="font-medium">
                      {(p.return_percentage_five_years ?? 0).toFixed(0)}%
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Investors</dt>
                    <dd className="font-medium">{p.total_investors ?? 0}</dd>
                  </div>
                </dl>
                <button className="mt-5 w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
                  Invest in the app
                </button>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-500">
                  {isRent ? "Rent" : "Asking price"}
                </p>
                <p className="text-2xl font-bold text-emerald-700">
                  {money(p.price)}
                  {isRent && (
                    <span className="text-base font-medium text-gray-500">
                      {p.rent_period === "year" ? " /year" : " /month"}
                    </span>
                  )}
                </p>
              </>
            )}
          </div>

          {/* #21 enquire form for rent/sale */}
          {!isCrowdfund && (
            <EnquireForm propertyId={p.id} listingType={isRent ? "rent" : "sale"} />
          )}
        </div>
      </div>
    </main>
  );
}
