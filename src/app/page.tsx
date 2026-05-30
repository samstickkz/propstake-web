import React from "react";
import PageLayout from "@/components/layouts/page-layout";
import Hero from "@/components/home/hero";
import FeaturedListings from "@/components/home/featured-listings";
import MarketSection from "@/components/home/market-section";
import CTASection from "@/components/home/cta";
import ReferralSection from "@/components/home/referral";
import HowItWorks from "@/components/home/how-it-works";
import WealthSecuritySection from "@/components/home/security";
import Analytics from "@/components/Analytics";

export const dynamic = "force-dynamic"; // FeaturedListings reads live Supabase

export default function Home() {
  return (
    <div>
      <PageLayout>
        <Hero />
        <FeaturedListings />
        <Analytics />
        <HowItWorks />
        <MarketSection />
        <ReferralSection />
        <WealthSecuritySection />
        <CTASection />
      </PageLayout>
    </div>
  );
}
