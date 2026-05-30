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
  "https://dfkqfyylqfkbgqxarmxm.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "sb_publishable_Z6UG3LsEiop9-K2sU3YZCQ_jOXnJCkX";

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
  rent_period: "month" | "year" | null;
  property_kind: string | null;
  description: string | null;
  images: string[] | null;
  lat: number | null;
  lng: number | null;
  view_count: number | null;
  save_count: number | null;
  is_verified: boolean | null;
  created_at: string;
};

export type ListingType = "crowdfund" | "rent" | "sale";

export const LISTING_TABS: { key: ListingType; label: string }[] = [
  { key: "crowdfund", label: "Invest" },
  { key: "rent", label: "Rent" },
  { key: "sale", label: "Buy" },
];
