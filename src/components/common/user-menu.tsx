"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { supabaseBrowser } from "@/lib/supabase-browser";

// #17 — header user menu. Guests see Sign in / Sign up; signed-in users get
// an avatar dropdown with Favorites + Sign out, plus Admin if applicable.

export default function UserMenu() {
  const { user, ready, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    supabaseBrowser
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => setIsAdmin(data?.role === "admin"));
  }, [user]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  if (!ready) {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/signin"
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Sign in
        </Link>
        <Link
          href="/signup"
          className="rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Sign up
        </Link>
      </div>
    );
  }

  const initial = (user.user_metadata?.fname || user.email || "?")
    .toString()
    .charAt(0)
    .toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white hover:bg-emerald-700"
        aria-label="Account menu"
      >
        {initial}
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-gray-200 bg-white py-2 shadow-lg">
          <div className="px-4 pb-2">
            <p className="truncate text-xs text-gray-500">Signed in as</p>
            <p className="truncate text-sm font-semibold text-gray-900">
              {user.email}
            </p>
          </div>
          <div className="my-1 border-t border-gray-100" />
          <MenuItem href="/favorites" onClick={() => setOpen(false)}>
            ♥ Favorites
          </MenuItem>
          <MenuItem href="/properties" onClick={() => setOpen(false)}>
            Browse properties
          </MenuItem>
          {isAdmin && (
            <MenuItem href="/admin" onClick={() => setOpen(false)}>
              Admin queue
            </MenuItem>
          )}
          <div className="my-1 border-t border-gray-100" />
          <button
            onClick={async () => {
              setOpen(false);
              await signOut();
            }}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

function MenuItem({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
    >
      {children}
    </Link>
  );
}
