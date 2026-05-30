"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useAuth } from "@/contexts/auth-context";

export default function SignInPage() {
  return (
    <Suspense fallback={<main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4" />}>
      <SignInForm />
    </Suspense>
  );
}

function SignInForm() {
  const { signIn } = useAuth();
  const router = useRouter();
  const next = useSearchParams().get("next") || "/properties";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    const { error } = await signIn(email, password);
    setBusy(false);
    if (error) {
      setErr(error);
      return;
    }
    router.push(next);
    router.refresh();
  };

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4">
      <form
        onSubmit={submit}
        className="w-full rounded-2xl border border-gray-200 p-6"
      >
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-800">
          ← PropStake
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Sign in</h1>
        <p className="mt-1 text-sm text-gray-500">
          Save listings, send enquiries, and manage your investments.
        </p>
        <div className="mt-5 space-y-3">
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
            placeholder="Password"
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
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <p className="mt-4 text-center text-sm text-gray-500">
          New to PropStake?{" "}
          <Link
            href={`/signup?next=${encodeURIComponent(next)}`}
            className="font-semibold text-emerald-700 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </main>
  );
}
