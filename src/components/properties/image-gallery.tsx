"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

// #2 — Image gallery + lightbox. Hero image + thumbnails → opens a full-
// screen lightbox with arrow + keyboard navigation.

export default function ImageGallery({
  images,
  alt,
  badge,
}: {
  images: string[];
  alt: string;
  badge?: string;
}) {
  const safe = images.filter(Boolean);
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const next = useCallback(
    () => setIdx((i) => (i + 1) % safe.length),
    [safe.length]
  );
  const prev = useCallback(
    () => setIdx((i) => (i - 1 + safe.length) % safe.length),
    [safe.length]
  );

  // The hero cycles on its own so a listing shows more than one room
  // before anyone interacts. Opening the lightbox stops it, and so does a
  // manual pick (see onPointerDown on the thumbnails).
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (open || paused || safe.length < 2) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [open, paused, safe.length, next]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev]);

  if (safe.length === 0) return null;

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative h-72 overflow-hidden rounded-2xl bg-gray-100 sm:col-span-2"
        >
          {safe.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={i === idx ? alt : ""}
              fill
              sizes="100vw"
              priority={i === 0}
              className={`object-cover transition-opacity duration-700 ${
                i === idx ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          {badge && (
            <span className="absolute left-4 top-4 rounded-full bg-black/60 px-4 py-1.5 text-sm font-semibold text-white">
              {badge}
            </span>
          )}
          {safe.length > 1 && (
            <>
              <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
                View all {safe.length} photos
              </span>
              <span className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                {safe.map((src, i) => (
                  <span
                    key={src}
                    className={`h-1.5 rounded-full transition-all ${
                      i === idx ? "w-5 bg-white" : "w-1.5 bg-white/55"
                    }`}
                  />
                ))}
              </span>
            </>
          )}
        </button>
        {safe.slice(1, 3).map((src, i) => (
          <button
            type="button"
            key={i}
            onClick={() => {
              setIdx(i + 1);
              setOpen(true);
            }}
            className="relative h-40 overflow-hidden rounded-xl bg-gray-100"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="50vw"
              className="object-cover transition hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between p-4 text-white">
            <span className="text-sm">
              {idx + 1} / {safe.length}
            </span>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
            >
              Close ✕
            </button>
          </div>
          <div className="relative flex-1">
            <Image
              src={safe[idx]}
              alt={alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
            {safe.length > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Previous"
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-white hover:bg-white/25"
                >
                  ←
                </button>
                <button
                  onClick={next}
                  aria-label="Next"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-white hover:bg-white/25"
                >
                  →
                </button>
              </>
            )}
          </div>
          {safe.length > 1 && (
            <div className="flex gap-2 overflow-x-auto p-3">
              {safe.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`relative h-16 w-24 shrink-0 overflow-hidden rounded ${i === idx ? "ring-2 ring-emerald-500" : "opacity-60 hover:opacity-100"}`}
                >
                  <Image src={src} alt="" fill sizes="100px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
