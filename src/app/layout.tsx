import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import Script from "next/script";
import { AuthProvider } from "@/contexts/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- ENHANCED METADATA FOR SEO ---
export const metadata: Metadata = {
  metadataBase: new URL("https://www.propstake.org"),
  title: {
    template: "%s | PropStake REIT",
    default: "PropStake - Global Real Estate Investment",
  },
  description:
    "Invest in high-growth properties across global markets including Dubai, Qatar, Nigeria, Kenya, South Africa, the US, UK, and Europe. Start earning passive income effortlessly with PropStake.",
  keywords: [
    "global real estate",
    "international property investment",
    "fractional investment",
    "real estate tokenization",
    "proptech",
    "digital real estate platform",
    "passive income",
    "real estate crowdfunding",
    "REITs",
    "property management solutions",
    "Dubai real estate",
    "Qatar real estate",
    "UAE property investment",
    "Saudi Arabia real estate",
    "Middle East property market",
    "Nigeria real estate",
    "Kenya real estate",
    "South Africa real estate",
    "Ghana property investment",
    "Egypt real estate",
    "Morocco property market",
    "UK real estate",
    "London property investment",
    "Europe real estate",
    "Asia real estate",
    "India property market",
    "Singapore property investment",
    "China real estate market",
    "USA real estate",
    "New York property investment",
    "fractional ownership real estate",
    "shared property investment",
    "blockchain real estate",
    "crypto real estate investment",
    "digital REITs",
    "crowdfunded property",
    "sustainable real estate investing",
    "luxury property investment",
    "affordable housing investment",
    "PropStake",
    "PropStake Africa",
    "PropStake Dubai",
    "PropStake investment platform",
    "PropStake fractional ownership",
    "PropStake real estate blockchain",
    "emerging markets real estate",
    "African property investment",
    "Middle East housing market",
    "vacation rental investment",
    "commercial real estate investment",
    "residential property investment",
    "student housing investment",
    "short-term rental property",
    "real estate wealth building",
    "global property diversification",
  ],
  openGraph: {
    title: "PropStake - Global Real Estate Investment",
    description:
      "Invest in high-growth properties across global markets and earn passive income effortlessly.",
    url: "https://www.propstake.org",
    siteName: "PropStake",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PropStake - Global Real Estate Investment",
    description:
      "Invest in high-growth properties across global markets and earn passive income effortlessly.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // No site-wide canonical here: it would be inherited by every page and tell
  // search engines each listing is a duplicate of the homepage. Pages set
  // their own `alternates.canonical`.
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.propstake.org/#organization",
      name: "PropStake",
      url: "https://www.propstake.org",
      logo: "https://ik.imagekit.io/4pztqoubze/landing-page/Property%20Stake%20with%20write%20up%201.png?updatedAt=1741191496767",
      sameAs: [
        "https://www.linkedin.com/company/propstake/",
        "https://play.google.com/store/apps/details?id=com.prostake.app",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.propstake.org/#website",
      name: "PropStake",
      url: "https://www.propstake.org",
      publisher: { "@id": "https://www.propstake.org/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <AuthProvider>{children}</AuthProvider>
        <Analytics />

        {/* Replio AI support chat (PropStake tenant). */}
        <Script
          id="replio-widget"
          src="https://replio.live/widget.js"
          data-replio="duoW3uB9eyB27VlH"
          data-theme="light"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
