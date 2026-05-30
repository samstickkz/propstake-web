import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase, type PropertyRow } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { data } = await supabase
    .from("properties")
    .select("name, city, country, description, images, listing_type, price, total_cost, rent_period")
    .eq("id", id)
    .eq("status", "approved")
    .maybeSingle();
  const p = data as Pick<PropertyRow,
    "name" | "city" | "country" | "description" | "images" | "listing_type" | "price" | "total_cost" | "rent_period"
  > | null;
  if (!p) return { title: "Property not found" };

  const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
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
      images: img ? [{ url: img, width: 1200, height: 630, alt: p.name ?? "Property" }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: headline,
      description: desc,
      images: img ? [img] : undefined,
    },
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
  const images = p.images?.length ? p.images : [];

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href={`/properties?type=${p.listing_type}`}
        className="text-sm text-gray-500 hover:text-gray-800"
      >
        ← Back to listings
      </Link>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="relative h-72 overflow-hidden rounded-2xl bg-gray-100 sm:col-span-2">
          {images[0] && (
            <Image
              src={images[0]}
              alt={p.name ?? "Property"}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          )}
          {!isCrowdfund && (
            <span className="absolute left-4 top-4 rounded-full bg-black/60 px-4 py-1.5 text-sm font-semibold text-white">
              {isRent ? "For rent" : "For sale"}
            </span>
          )}
        </div>
        {images.slice(1, 3).map((src, i) => (
          <div key={i} className="relative h-40 overflow-hidden rounded-xl bg-gray-100">
            <Image src={src} alt="" fill sizes="50vw" className="object-cover" />
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {p.name}
          </h1>
          <p className="mt-1 text-gray-500">{p.location}</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-600">
            <span>{p.bed_amount ?? 0} bedrooms</span>
            {p.property_kind && <span className="capitalize">{p.property_kind}</span>}
            <span>{p.city ?? p.country}</span>
          </div>
          {p.description && (
            <p className="mt-5 leading-relaxed text-gray-700">{p.description}</p>
          )}
        </div>

        {/* Pricing / CTA panel */}
        <div className="w-full shrink-0 rounded-2xl border border-gray-200 p-5 lg:w-80">
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
              <button className="mt-5 w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
                Enquire
              </button>
              <p className="mt-2 text-center text-xs text-gray-400">
                Contact handling coming soon
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
