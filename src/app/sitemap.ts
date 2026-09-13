import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const SITE = "https://www.propstake.org";

// Rebuilt at most hourly so new approved listings show up without a redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE}/properties`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE}/properties?type=rent`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE}/properties?type=sale`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
  ];

  // A backend outage must never take the sitemap down with it: fall back to
  // the static pages above.
  try {
    const { data, error } = await supabase
      .from("properties")
      .select("id, owner_id, approved_at, created_at")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(5000);
    if (error || !data) return pages;

    const agents = new Map<string, Date>();
    for (const p of data) {
      const modified = new Date(p.approved_at ?? p.created_at);
      pages.push({
        url: `${SITE}/properties/${p.id}`,
        lastModified: modified,
        changeFrequency: "weekly",
        priority: 0.7,
      });
      if (p.owner_id && !agents.has(p.owner_id)) agents.set(p.owner_id, modified);
    }
    for (const [id, modified] of agents) {
      pages.push({
        url: `${SITE}/agents/${id}`,
        lastModified: modified,
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }
  } catch {
    // fall through with static pages
  }
  return pages;
}
