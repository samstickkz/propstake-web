import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics"; // Your analytics component
import Script from "next/script"; // 👈 Add this

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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PropStake - Global Real Estate Investment Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PropStake - Global Real Estate Investment",
    description:
      "Invest in high-growth properties across global markets and earn passive income effortlessly.",
    images: ["/og-image.png"],
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
  alternates: {
    canonical: "https://www.propstake.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />

        {/* 👇 Tawk.to Script */}
        <Script
          id="tawk-to"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://tawk.to/chat/68b34731835f92191f4a84da/1j5em6e6c';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
