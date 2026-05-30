"use client";

import { useState } from "react";

// #21 — replaces the "Enquire — coming soon" placeholder with a real form.
// POSTs to /api/listings/enquire which inserts a row + emails the lister.

export default function EnquireForm({
  propertyId,
  listingType,
}: {
  propertyId: string;
  listingType: "rent" | "sale";
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    listingType === "rent"
      ? "Hi, I'm interested in renting this property. Is it still available?"
      : "Hi, I'm interested in this property. Is it still available?"
  );
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const res = await fetch("/api/listings/enquire", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          propertyId,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          message: message.trim(),
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "Failed to send");
      }
      setDone(true);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setErr(msg);
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <p className="font-semibold text-emerald-800">Enquiry sent ✓</p>
        <p className="mt-1 text-sm text-emerald-700">
          The lister will be in touch via email. Keep an eye on your inbox.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-3 rounded-2xl border border-gray-200 p-5"
    >
      <h3 className="text-base font-semibold text-gray-900">Enquire</h3>
      <input
        type="text"
        required
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
      />
      <input
        type="email"
        required
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
      />
      <input
        type="tel"
        placeholder="Phone (optional)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
      />
      <textarea
        required
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm"
      />
      {err && <p className="text-xs text-red-600">{err}</p>}
      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
      >
        {busy ? "Sending…" : "Send enquiry"}
      </button>
      <p className="text-center text-xs text-gray-400">
        Your details are shared only with the lister.
      </p>
    </form>
  );
}
