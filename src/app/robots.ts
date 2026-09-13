import type { MetadataRoute } from "next";

const SITE = "https://www.propstake.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Account, admin and API routes carry no search value and are per-user.
        disallow: ["/admin", "/api/", "/favorites", "/signin", "/signup"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
