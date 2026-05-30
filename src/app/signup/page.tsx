"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useAuth } from "@/contexts/auth-context";

export default function SignUpPage() {
  return (
    <Suspense fallback={<main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4" />}>
      <SignUpForm />
    </Suspense>
  );
}

function SignUpForm() {
  const { signUp, signIn } = useAuth();
  const router = useRouter();
  const next = useSearchParams().get("next") || "/properties";
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [needsConfirm, setNeedsConfirm] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    const { error } = await signUp(email, password, fname.trim() || undefined);
    if (error) {
      setBusy(false);
      setErr(error);
      return;
    }
    // Try sign-in immediately — works if email confirmation is off.
    const { error: signInErr } = await signIn(email, password);
    setBusy(false);
    if (signInErr) {
      setNeedsConfirm(true);
      return;
    }
    router.push(next);
    router.refresh();
  };

  if (needsConfirm) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4">
        <div className="w-full rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <p className="text-base font-semibold text-emerald-800">
            Check your email
          </p>
          <p className="mt-1 text-sm text-emerald-700">
            We sent a confirmation link to <strong>{email}</strong>. Click it,
            then come back to sign in.
          </p>
          <Link
            href="/signin"
            className="mt-4 inline-block rounded-xl border border-emerald-600 px-4 py-2 text-sm font-semibold text-emerald-700"
          >
            Back to sign in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4">
      <form
        onSubmit={submit}
        className="w-full rounded-2xl border border-gray-200 p-6"
      >
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-800">
          ← PropStake
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Create account</h1>
        <p className="mt-1 text-sm text-gray-500">
          Free to join. List properties, save favorites, and contact owners.
        </p>
        <div className="mt-5 space-y-3">
          <input
            type="text"
            placeholder="First name (optional)"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
          />
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
          />
          <input
            type="password"
            required
            minLength={8}
            placeholder="Password (min 8 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
          />
          {err && <p className="text-sm text-red-600">{err}</p>}
        </div>
        <button
          disabled={busy}
          className="mt-5 w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {busy ? "Creating account…" : "Create account"}
        </button>
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href={`/signin?next=${encodeURIComponent(next)}`}
            className="font-semibold text-emerald-700 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}
