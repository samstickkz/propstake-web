"use client";

import { createClient } from "@supabase/supabase-js";

// Browser client for authenticated flows (admin moderation, etc.).
// Persists the session in the browser so an admin stays logged in.
// Privileged actions are still gated server-side by Postgres RLS +
// the is_admin() check inside approve_listing / reject_listing.
export const supabaseBrowser = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
    "https://doqlxpzksknbbbseazzg.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    "sb_publishable_ydHtYk15cAqPETW7dUSznw_t_F-eZPW",
  { auth: { persistSession: true, autoRefreshToken: true } }
);
