"use client";

import { useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

// #12 — bumps view_count once per page load via the increment_property_view
// RPC. Cheap, no auth needed (RPC is granted to anon).
export default function ViewTracker({ propertyId }: { propertyId: string }) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    supabase
      .rpc("increment_property_view", { p_id: propertyId })
      .then(() => {}, () => {});
  }, [propertyId]);
  return null;
}
