"use client";

// Thin client wrapper that lets us use ssr:false with next/dynamic.
// Next 15.5 forbids ssr:false from a Server Component.
import nextDynamic from "next/dynamic";

const ListingMap = nextDynamic(
  () => import("@/components/properties/listing-map"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[360px] animate-pulse rounded-2xl bg-gray-100" />
    ),
  }
);

export default ListingMap;
