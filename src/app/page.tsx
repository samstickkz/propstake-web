"use client";
import React from "react";
import PageLayout from "@/components/layouts/page-layout";
import Hero from "@/components/home/hero";
import MarketSection from "@/components/home/market-section";
import CTASection from "@/components/home/cta";
import ReferralSection from "@/components/home/referral";
import HowItWorks from "@/components/home/how-it-works";
import WealthSecuritySection from "@/components/home/security";
import Analytics from '@/components/Analytics' // Adjust the import path if needed

// import InvestmentMetrics from "@/components/home/investment-metrics";
// import PropertyInvestmentShowcase from "@/components/home/property-investment";

export default function Home() {
  return (
    <div>
      <PageLayout>
        <Hero />
        <Analytics />
        <HowItWorks />
        {/* <InvestmentMetrics /> */}
        <MarketSection />
        {/* <PropertyInvestmentShowcase /> */}
        <ReferralSection />
        {/* <FeatureAnnouncement /> */}

        <WealthSecuritySection />
        <CTASection />
      </PageLayout>
    </div>
  );
}
