import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics"; // Your analytics component

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
  // Sets the base URL for resolving relative paths, like for Open Graph images.
  metadataBase: new URL("https://www.propstake.org"),

  title: {
    template: "%s | PropStake REIT",
    default: "PropStake - Global Real Estate Investment",
  },
  description:
    "Invest in high-growth properties across global markets including Dubai, Qatar, Nigeria, Kenya, South Africa, the US, UK, and Europe. Start earning passive income effortlessly with PropStake.",

  // Keywords for search engines to understand your content
  keywords: [
    // Core
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
  
    // Regions & Countries
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
  
    // Investment Models
    "fractional ownership real estate",
    "shared property investment",
    "blockchain real estate",
    "crypto real estate investment",
    "digital REITs",
    "crowdfunded property",
    "sustainable real estate investing",
    "luxury property investment",
    "affordable housing investment",
  
    // Specific to PropStake
    "PropStake",
    "PropStake Africa",
    "PropStake Dubai",
    "PropStake investment platform",
    "PropStake fractional ownership",
    "PropStake real estate blockchain",
  
    // Opportunities & Trends
    "emerging markets real estate",
    "African property investment",
    "Middle East housing market",
    "vacation rental investment",
    "commercial real estate investment",
    "residential property investment",
    "student housing investment",
    "short-term rental property",
    "real estate wealth building",
    "global property diversification"
  ],
  

  // --- Open Graph (for social sharing on Facebook, LinkedIn, etc.) ---
  openGraph: {
    title: "PropStake - Global Real Estate Investment",
    description:
      "Invest in high-growth properties across global markets and earn passive income effortlessly.",
    url: "https://www.propstake.org",
    siteName: "PropStake",
    // Replace with a URL to a compelling image (e.g., your logo or a hero image)
    // Recommended size: 1200x630 pixels
    images: [
      {
        url: "/og-image.png", // Path to your Open Graph image in the `public` folder
        width: 1200,
        height: 630,
        alt: "PropStake - Global Real Estate Investment Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // --- Twitter Card (for sharing on Twitter) ---
  twitter: {
    card: "summary_large_image",
    title: "PropStake - Global Real Estate Investment",
    description:
      "Invest in high-growth properties across global markets and earn passive income effortlessly.",
    // Replace with the same image URL as above
    images: ["/og-image.png"],
  },

  // --- Search Engine Instructions ---
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

  // --- Canonical URL to avoid duplicate content ---
  alternates: {
    canonical: "https://www.propstake.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}

