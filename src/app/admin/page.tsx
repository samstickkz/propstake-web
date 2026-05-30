"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { supabaseBrowser } from "@/lib/supabase-browser";
import type { PropertyRow } from "@/lib/supabase";

// Admin row includes the owner's contact info for the notification email.
type AdminRow = PropertyRow & {
  owner: { email: string | null; fname: string | null } | null;
};

type Phase = "loading" | "login" | "denied" | "ready";
type Tab = "pending" | "decided";
type TypeFilter = "all" | "crowdfund" | "rent" | "sale";

const money = (n: number | null | undefined) =>
  n == null
    ? "—"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(n);

const REJECTION_TEMPLATES = [
  { id: "photos", label: "Photos unclear", text: "Photos are blurry / too few — please add clearer images and resubmit." },
  { id: "location", label: "Location vague", text: "Location/area details are missing or inaccurate — please specify the building or neighborhood." },
  { id: "price", label: "Price seems off", text: "The price looks well above/below comparable listings — please double-check before resubmitting." },
  { id: "duplicate", label: "Duplicate", text: "This appears to be a duplicate of another listing under your account." },
  { id: "policy", label: "Policy violation", text: "Listing doesn't meet our guidelines (misleading info or prohibited content)." },
  { id: "incomplete", label: "Missing details", text: "Description and key details are missing — please add more context and resubmit." },
];

export default function AdminPage() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authErr, setAuthErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [tab, setTab] = useState<Tab>("pending");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [pending, setPending] = useState<AdminRow[]>([]);
  const [decided, setDecided] = useState<AdminRow[]>([]);
  const [acting, setActing] = useState<string | null>(null);

  // Reject dialog state
  const [rejectFor, setRejectFor] = useState<AdminRow | null>(null);
  const [rejectReason, setRejectReason] = useState("");

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
    await Promise.all([loadQueue(), loadDecided()]);
    setPhase("ready");
  }, []);

  const loadQueue = async () => {
    const { data } = await supabaseBrowser
      .from("properties")
      .select("*, owner:profiles!owner_id(email, fname)")
      .eq("status", "pending")
      .order("created_at", { ascending: false });
    setPending((data as AdminRow[] | null) ?? []);
  };

  const loadDecided = async () => {
    const since = new Date();
    since.setDate(since.getDate() - 30);
    const { data } = await supabaseBrowser
      .from("properties")
      .select("*, owner:profiles!owner_id(email, fname)")
      .in("status", ["approved", "rejected"])
      .not("owner_id", "is", null) // skip admin-curated catalog
      .gte("approved_at", since.toISOString())
      .order("approved_at", { ascending: false })
      .limit(50);
    setDecided((data as AdminRow[] | null) ?? []);
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
    const target = pending.find((p) => p.id === id);
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
    loadDecided();
    if (target?.owner?.email) {
      fetch("/api/listings/notify-decision", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          to: target.owner.email,
          listerName: target.owner.fname,
          listingName: target.name ?? "your listing",
          listingId: id,
          decision: approve ? "approved" : "rejected",
          reason: reason ?? null,
        }),
      }).catch(() => {});
    }
  };

  const filteredPending = useMemo(
    () =>
      typeFilter === "all"
        ? pending
        : pending.filter((p) => p.listing_type === typeFilter),
    [pending, typeFilter]
  );
  const filteredDecided = useMemo(
    () =>
      typeFilter === "all"
        ? decided
        : decided.filter((p) => p.listing_type === typeFilter),
    [decided, typeFilter]
  );

  // ---- skeleton ----
  if (phase === "loading") {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="h-8 w-44 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-4 w-32 animate-pulse rounded bg-gray-200" />
        <div className="mt-6 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-4 rounded-2xl border border-gray-200 p-4 sm:flex-row">
              <div className="h-28 w-full animate-pulse rounded-xl bg-gray-200 sm:w-40" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (phase === "login") {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <form onSubmit={login} className="w-full max-w-sm rounded-2xl border border-gray-200 p-6">
          <h1 className="text-xl font-bold text-gray-900">Admin sign in</h1>
          <p className="mt-1 text-sm text-gray-500">Moderate property listings.</p>
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
      </main>
    );
  }

  if (phase === "denied") {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">Not authorized</p>
          <p className="mt-1 text-sm text-gray-500">This account isn&apos;t an admin.</p>
          <button onClick={logout} className="mt-4 rounded-lg border border-gray-300 px-4 py-2 text-sm">
            Sign out
          </button>
        </div>
      </main>
    );
  }

  // ---- main UI ----
  const rows = tab === "pending" ? filteredPending : filteredDecided;
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Listing review</h1>
          <p className="text-sm text-gray-500">
            {pending.length} pending · {decided.length} decided in last 30 days
          </p>
        </div>
        <button
          onClick={logout}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:border-gray-400"
        >
          Sign out
        </button>
      </div>

      {/* Tab switcher */}
      <div className="mt-6 inline-flex rounded-xl bg-gray-100 p-1">
        {(["pending", "decided"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
              tab === t ? "bg-white text-gray-900 shadow" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {t === "pending" ? `Pending (${filteredPending.length})` : `Decided (${filteredDecided.length})`}
          </button>
        ))}
      </div>

      {/* Type filter chips */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-gray-500">Filter:</span>
        {(["all", "crowdfund", "rent", "sale"] as TypeFilter[]).map((f) => (
          <button
            key={f}
            onClick={() => setTypeFilter(f)}
            className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${
              typeFilter === f
                ? "border-emerald-600 bg-emerald-600 text-white"
                : "border-gray-300 text-gray-700 hover:border-gray-400"
            }`}
          >
            {f === "all" ? "All types" : f}
          </button>
        ))}
      </div>

      {/* Rows */}
      {rows.length === 0 ? (
        <div className="mx-auto mt-16 max-w-md rounded-2xl border border-dashed border-gray-300 px-6 py-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
            <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="mt-4 text-base font-semibold text-gray-900">
            {tab === "pending" ? "All caught up" : "Nothing decided in this window"}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {tab === "pending"
              ? "No listings waiting on review."
              : "Approved/rejected listings appear here for 30 days."}
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {rows.map((p) => (
            <ListingRow
              key={p.id}
              p={p}
              isDecidedTab={tab === "decided"}
              acting={acting === p.id}
              onApprove={() => decide(p.id, true)}
              onReject={() => {
                setRejectFor(p);
                setRejectReason("");
              }}
            />
          ))}
        </div>
      )}

      {/* Rejection dialog with templates */}
      {rejectFor && (
        <RejectDialog
          property={rejectFor}
          reason={rejectReason}
          setReason={setRejectReason}
          onCancel={() => setRejectFor(null)}
          onSubmit={() => {
            const id = rejectFor.id;
            setRejectFor(null);
            decide(id, false, rejectReason.trim() || undefined);
          }}
        />
      )}
    </main>
  );
}

function ListingRow({
  p,
  isDecidedTab,
  acting,
  onApprove,
  onReject,
}: {
  p: AdminRow;
  isDecidedTab: boolean;
  acting: boolean;
  onApprove: () => void;
  onReject: () => void;
}) {
  const statusColor =
    p.status === "approved"
      ? "bg-emerald-100 text-emerald-700"
      : p.status === "rejected"
        ? "bg-red-100 text-red-700"
        : "bg-amber-100 text-amber-800";
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 p-4 sm:flex-row">
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-40">
        {p.images?.[0] && (
          <Image src={p.images[0]} alt={p.name ?? ""} fill sizes="160px" className="object-cover" />
        )}
        <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
          {p.listing_type}
        </span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900">{p.name}</h3>
          {isDecidedTab && (
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${statusColor}`}>
              {p.status}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500">
          {p.location} · {p.city} · {p.bed_amount ?? 0} beds
          {p.property_kind ? ` · ${p.property_kind}` : ""}
        </p>
        <p className="mt-1 font-bold text-emerald-700">
          {money(p.price)}
          {p.listing_type === "rent" && (p.rent_period === "year" ? " /year" : " /month")}
        </p>
        {p.description && <p className="mt-2 line-clamp-2 text-sm text-gray-600">{p.description}</p>}
        {p.owner?.email && (
          <p className="mt-2 text-xs text-gray-500">
            Lister: <span className="font-medium">{p.owner.fname || p.owner.email}</span>
          </p>
        )}
        {isDecidedTab && p.status === "rejected" && p.rejection_reason && (
          <p className="mt-2 text-xs italic text-red-700">Reason: {p.rejection_reason}</p>
        )}
      </div>

      {!isDecidedTab && (
        <div className="flex shrink-0 gap-2 sm:flex-col">
          <button
            disabled={acting}
            onClick={onApprove}
            className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            Approve
          </button>
          <button
            disabled={acting}
            onClick={onReject}
            className="flex-1 rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

function RejectDialog({
  property,
  reason,
  setReason,
  onCancel,
  onSubmit,
}: {
  property: AdminRow;
  reason: string;
  setReason: (v: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog">
      <div className="w-full max-w-md rounded-2xl bg-white p-5">
        <h3 className="text-base font-semibold text-gray-900">
          Reject &ldquo;{property.name}&rdquo;
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Pick a template or write your own. The lister will be emailed.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {REJECTION_TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setReason(t.text)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-left text-xs font-medium text-gray-700 hover:border-emerald-500"
            >
              {t.label}
            </button>
          ))}
        </div>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          placeholder="Reason (optional)…"
          className="mt-3 w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Reject listing
          </button>
        </div>
      </div>
    </div>
  );
}
