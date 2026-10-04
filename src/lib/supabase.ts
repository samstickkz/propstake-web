import { createClient } from "@supabase/supabase-js";

// Shared Supabase client for the web marketplace (issue #16 Phase D).
// Uses the public URL + publishable/anon key; all privileged writes are
// gated by Postgres RLS, so the anon key is safe in the browser/SSR.
//
// The fallbacks are the project's *publishable* values — Supabase designs
// these to be exposed client-side, and NEXT_PUBLIC_* vars end up in the
// bundle anyway. They let the app run on a fresh Vercel deploy even before
// env vars are configured; set the env vars to point at a different project.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://doqlxpzksknbbbseazzg.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "sb_publishable_ydHtYk15cAqPETW7dUSznw_t_F-eZPW";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

// Row shape returned by the `properties` table (subset we render).
export type PropertyRow = {
  id: string;
  name: string | null;
  country: string | null;
  location: string | null;
  city: string | null;
  listing_type: "crowdfund" | "rent" | "sale";
  status: string | null;
  bed_amount: number | null;
  total_cost: number | null;
  amount_funded: number | null;
  return_percentage_per_year: number | null;
  return_percentage_five_years: number | null;
  total_investors: number | null;
  price: number | null;
  price_on_request: boolean | null;
  area_sqm: number | null;
  fit_out: "white_frame" | "renovated" | "fully_furnished" | null;
  rent_period: "month" | "year" | null;
  property_kind: string | null;
  description: string | null;
  images: string[] | null;
  lat: number | null;
  lng: number | null;
  view_count: number | null;
  save_count: number | null;
  is_verified: boolean | null;
  rejection_reason: string | null;
  approved_at: string | null;
  owner_id: string | null;
  created_at: string;
};

export type ListingType = "crowdfund" | "rent" | "sale";

export const LISTING_TABS: { key: ListingType; label: string }[] = [
  { key: "crowdfund", label: "Invest" },
  { key: "rent", label: "Rent" },
  { key: "sale", label: "Buy" },
];

// A seller who has not released a price still gets a listing; the UI says so
// rather than rendering $0.
export const FIT_OUT_LABELS: Record<string, string> = {
  white_frame: "White Frame (shell)",
  renovated: "Renovated, unfurnished",
  fully_furnished: "Fully furnished",
};

export const priceLabel = (p: {
  price?: number | null;
  price_on_request?: boolean | null;
}) =>
  p.price_on_request || p.price == null
    ? "Price on request"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(p.price);
