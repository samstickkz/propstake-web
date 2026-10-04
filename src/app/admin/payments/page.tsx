"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase-browser";

// Bank transfers land as `pending` investments and, until this page existed,
// stayed that way forever: nothing in the app or the schema ever marked money
// as received. This is the missing half of that flow — someone checks the bank
// statement, finds the reference, and confirms or rejects here.

type Phase = "loading" | "login" | "denied" | "ready";
type Tab = "pending" | "decided";

type Row = {
  id: string;
  amount: number | null;
  status: string | null;
  payment_type: string | null;
  wallet: string | null;
  memo_code: string | null;
  payment_reference: string | null;
  receipt_url: string | null;
  admin_note: string | null;
  created_at: string;
  reviewed_at: string | null;
  property: { id: string; name: string | null; city: string | null } | null;
  investor: { email: string | null; fname: string | null; lname: string | null } | null;
};

const money = (n: number | null | undefined) =>
  n == null
    ? "—"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      }).format(n);

const when = (iso: string | null) =>
  iso ? new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }) : "—";

const SELECT =
  "id, amount, status, payment_type, wallet, memo_code, payment_reference, receipt_url, admin_note, created_at, reviewed_at, property:properties(id, name, city), investor:profiles!investments_user_id_fkey(email, fname, lname)";

export default function AdminPaymentsPage() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authErr, setAuthErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [tab, setTab] = useState<Tab>("pending");
  const [rows, setRows] = useState<Row[]>([]);
  const [acting, setActing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rejectFor, setRejectFor] = useState<Row | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const load = useCallback(async (which: Tab) => {
    const statuses = which === "pending" ? ["pending"] : ["confirmed", "cancelled"];
    const { data, error: err } = await supabaseBrowser
      .from("investments")
      .select(SELECT)
      .in("status", statuses)
      .order("created_at", { ascending: false })
      .limit(200);
    if (err) {
      setError(err.message);
      return;
    }
    setError(null);
    setRows((data ?? []) as unknown as Row[]);
  }, []);

  const resolveSession = useCallback(async () => {
    const {
      data: { user },
    } = await supabaseBrowser.auth.getUser();
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
    setPhase("ready");
    await load("pending");
  }, [load]);

  useEffect(() => {
    resolveSession();
  }, [resolveSession]);

  useEffect(() => {
    if (phase === "ready") load(tab);
  }, [tab, phase, load]);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setAuthErr(null);
    const { error: err } = await supabaseBrowser.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (err) {
      setAuthErr(err.message);
      return;
    }
    setPhase("loading");
    resolveSession();
  }

  async function confirmPayment(row: Row) {
    setActing(row.id);
    setError(null);
    const { error: err } = await supabaseBrowser.rpc("confirm_investment", {
      p_investment_id: row.id,
    });
    setActing(null);
    if (err) {
      // The function refuses to over-fund a property or re-confirm, so the
      // message here is the real reason, not a generic failure.
      setError(err.message);
      return;
    }
    await load(tab);
  }

  async function rejectPayment() {
    if (!rejectFor) return;
    setActing(rejectFor.id);
    setError(null);
    const { error: err } = await supabaseBrowser.rpc("reject_investment", {
      p_investment_id: rejectFor.id,
      p_reason: rejectReason.trim() || null,
    });
    setActing(null);
    setRejectFor(null);
    setRejectReason("");
    if (err) {
      setError(err.message);
      return;
    }
    await load(tab);
  }

  async function openReceipt(path: string) {
    // Receipts live in a private bucket; admins get a short-lived link.
    const { data, error: err } = await supabaseBrowser.storage
      .from("payment-receipts")
      .createSignedUrl(path, 120);
    if (err || !data?.signedUrl) {
      setError(err?.message ?? "Could not open that receipt");
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  if (phase === "loading") {
    return <main className="p-10 text-gray-500">Loading…</main>;
  }

  if (phase === "login") {
    return (
      <main className="mx-auto max-w-sm px-4 py-20">
        <h1 className="font-display text-2xl font-semibold">Admin sign in</h1>
        <form onSubmit={signIn} className="mt-6 space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
          {authErr && <p className="text-sm text-red-600">{authErr}</p>}
          <button
            disabled={busy}
            className="w-full rounded-lg bg-emerald-600 py-2 font-semibold text-white disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </main>
    );
  }

  if (phase === "denied") {
    return (
      <main className="mx-auto max-w-lg px-4 py-20">
        <h1 className="font-display text-2xl font-semibold">Not an admin</h1>
        <p className="mt-2 text-gray-600">
          This account cannot review payments.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-gray-900 sm:text-3xl">
            Payments
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Bank transfers stay pending until someone checks the account and
            confirms here. Confirming moves the listing&rsquo;s funding bar.
          </p>
        </div>
        <Link href="/admin" className="text-sm font-semibold text-emerald-700 hover:underline">
          Listings →
        </Link>
      </div>

      <div className="mt-6 inline-flex rounded-xl bg-gray-100 p-1">
        {(["pending", "decided"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-5 py-2 text-sm font-semibold capitalize transition ${
              tab === t ? "bg-emerald-600 text-white shadow" : "text-gray-600"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      {rows.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-gray-300 px-6 py-12 text-center text-gray-500">
          {tab === "pending"
            ? "No payments waiting. Transfers appear here the moment someone reports one."
            : "Nothing reviewed yet."}
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="py-3 pr-4">Reported</th>
                <th className="py-3 pr-4">Property</th>
                <th className="py-3 pr-4">Investor</th>
                <th className="py-3 pr-4">Amount</th>
                <th className="py-3 pr-4">Memo / reference</th>
                <th className="py-3 pr-4">Receipt</th>
                <th className="py-3 pr-4">{tab === "pending" ? "Action" : "Outcome"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((r) => (
                <tr key={r.id} className="align-top">
                  <td className="py-4 pr-4 text-gray-600">{when(r.created_at)}</td>
                  <td className="py-4 pr-4">
                    <span className="font-semibold text-gray-900">
                      {r.property?.name ?? "—"}
                    </span>
                    <span className="block text-xs text-gray-500">{r.property?.city ?? ""}</span>
                  </td>
                  <td className="py-4 pr-4">
                    <span className="block text-gray-900">
                      {[r.investor?.fname, r.investor?.lname].filter(Boolean).join(" ") || "—"}
                    </span>
                    <span className="block text-xs text-gray-500">{r.investor?.email ?? ""}</span>
                  </td>
                  <td className="py-4 pr-4 font-semibold text-gray-900">{money(r.amount)}</td>
                  <td className="py-4 pr-4">
                    <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">
                      {r.memo_code ?? "—"}
                    </code>
                    <span className="block text-xs text-gray-500">
                      {r.payment_reference ? `ref ${r.payment_reference}` : "no reference given"}
                    </span>
                    <span className="block text-xs text-gray-400">{r.wallet ?? ""}</span>
                  </td>
                  <td className="py-4 pr-4">
                    {r.receipt_url ? (
                      <button
                        onClick={() => openReceipt(r.receipt_url!)}
                        className="text-xs font-semibold text-emerald-700 hover:underline"
                      >
                        View
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">none</span>
                    )}
                  </td>
                  <td className="py-4 pr-4">
                    {tab === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          disabled={acting === r.id}
                          onClick={() => confirmPayment(r)}
                          className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                        >
                          {acting === r.id ? "…" : "Confirm"}
                        </button>
                        <button
                          disabled={acting === r.id}
                          onClick={() => setRejectFor(r)}
                          className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 disabled:opacity-60"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <>
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            r.status === "confirmed"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {r.status}
                        </span>
                        <span className="block text-xs text-gray-500">{when(r.reviewed_at)}</span>
                        {r.admin_note && (
                          <span className="block text-xs text-gray-500">{r.admin_note}</span>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {rejectFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">
            <h2 className="font-display text-lg font-semibold">Reject this payment</h2>
            <p className="mt-1 text-sm text-gray-600">
              {money(rejectFor.amount)} for {rejectFor.property?.name ?? "this property"}. The
              investor keeps the record, marked cancelled.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
              placeholder="Reason, e.g. no matching transfer found in the account"
              className="mt-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => {
                  setRejectFor(null);
                  setRejectReason("");
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={rejectPayment}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
