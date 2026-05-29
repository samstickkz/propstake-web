"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { supabaseBrowser } from "@/lib/supabase-browser";
import type { PropertyRow } from "@/lib/supabase";

const money = (n: number | null | undefined) =>
  n == null
    ? "—"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(n);

type Phase = "loading" | "login" | "denied" | "ready";

export default function AdminPage() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authErr, setAuthErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [pending, setPending] = useState<PropertyRow[]>([]);
  const [acting, setActing] = useState<string | null>(null);

  // Confirm the signed-in user is an admin, then load the queue.
  const resolveSession = useCallback(async () => {
    const { data: { user } } = await supabaseBrowser.auth.getUser();
    if (!user) {
      setPhase("login");
      return;
    }
    const { data: profile } = await supabaseBrowser
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();
    if (profile?.role !== "admin") {
      setPhase("denied");
      return;
    }
    await loadQueue();
    setPhase("ready");
  }, []);

  const loadQueue = async () => {
    const { data } = await supabaseBrowser
      .from("properties")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false });
    setPending((data as PropertyRow[] | null) ?? []);
  };

  useEffect(() => {
    resolveSession();
  }, [resolveSession]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthErr(null);
    setBusy(true);
    const { error } = await supabaseBrowser.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(false);
    if (error) {
      setAuthErr(error.message);
      return;
    }
    setPhase("loading");
    resolveSession();
  };

  const logout = async () => {
    await supabaseBrowser.auth.signOut();
    setPhase("login");
  };

  const decide = async (id: string, approve: boolean, reason?: string) => {
    setActing(id);
    const { error } = approve
      ? await supabaseBrowser.rpc("approve_listing", { p_property_id: id })
      : await supabaseBrowser.rpc("reject_listing", {
          p_property_id: id,
          p_reason: reason ?? null,
        });
    setActing(null);
    if (error) {
      alert(`Action failed: ${error.message}`);
      return;
    }
    setPending((cur) => cur.filter((p) => p.id !== id));
  };

  if (phase === "loading") {
    return <Centered>Loading…</Centered>;
  }

  if (phase === "login") {
    return (
      <Centered>
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-2xl border border-gray-200 p-6"
        >
          <h1 className="text-xl font-bold text-gray-900">Admin sign in</h1>
          <p className="mt-1 text-sm text-gray-500">
            Moderate property listings.
          </p>
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
          {authErr && <p className="mt-2 text-sm text-red-600">{authErr}</p>}
          <button
            disabled={busy}
            className="mt-4 w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </Centered>
    );
  }

  if (phase === "denied") {
    return (
      <Centered>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">Not authorized</p>
          <p className="mt-1 text-sm text-gray-500">
            This account isn’t an admin.
          </p>
          <button
            onClick={logout}
            className="mt-4 rounded-lg border border-gray-300 px-4 py-2 text-sm"
          >
            Sign out
          </button>
        </div>
      </Centered>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Listing review</h1>
          <p className="text-sm text-gray-500">
            {pending.length} pending {pending.length === 1 ? "listing" : "listings"}
          </p>
        </div>
        <button
          onClick={logout}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:border-gray-400"
        >
          Sign out
        </button>
      </div>

      {pending.length === 0 ? (
        <p className="mt-16 text-center text-gray-500">
          Nothing to review. 🎉
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {pending.map((p) => (
            <div
              key={p.id}
              className="flex flex-col gap-4 rounded-2xl border border-gray-200 p-4 sm:flex-row"
            >
              <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-40">
                {p.images?.[0] && (
                  <Image
                    src={p.images[0]}
                    alt={p.name ?? ""}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                )}
                <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
                  {p.listing_type}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{p.name}</h3>
                <p className="text-sm text-gray-500">
                  {p.location} · {p.city} · {p.bed_amount ?? 0} beds
                  {p.property_kind ? ` · ${p.property_kind}` : ""}
                </p>
                <p className="mt-1 font-bold text-emerald-700">
                  {money(p.price)}
                  {p.listing_type === "rent" &&
                    (p.rent_period === "year" ? " /year" : " /month")}
                </p>
                {p.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                    {p.description}
                  </p>
                )}
              </div>

              <div className="flex shrink-0 gap-2 sm:flex-col">
                <button
                  disabled={acting === p.id}
                  onClick={() => decide(p.id, true)}
                  className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                >
                  Approve
                </button>
                <button
                  disabled={acting === p.id}
                  onClick={() => {
                    const reason = prompt("Reason for rejection (optional):") ?? undefined;
                    decide(p.id, false, reason);
                  }}
                  className="flex-1 rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      {children}
    </main>
  );
}
