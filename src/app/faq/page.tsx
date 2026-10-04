import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/layouts/page-layout";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "How investing, renting and buying work on PropStake: fractional shares, enquiries, fees, documents and what we will not promise.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    q: "What does PropStake actually let me do?",
    a: "Three things. Invest in a fractional share of a property, so you own part of a building rather than all of it. Rent a home from listings on the platform. Or buy a property outright. The Properties page separates the three.",
  },
  {
    q: "Where do I complete an investment?",
    a: "In the PropStake mobile app. You can browse and compare everything on the website, but fractional purchases, your holdings and your documents live in the app.",
  },
  {
    q: "What does 'Price on request' mean?",
    a: "The seller has not released a price for that unit yet. This is common for new developments, where prices change by floor, view and handover condition. Send an enquiry and we will come back with the current price list.",
  },
  {
    q: "Why do some units list three different prices?",
    a: "New-build apartments are often sold in three handover conditions. White Frame is a bare shell with services connected. Renovated has floors, walls, ceilings and internal doors finished but no furniture. Fully furnished is turnkey, including appliances. Each costs a different amount for the same apartment.",
  },
  {
    q: "What returns will I make?",
    a: "We do not promise returns, and you should be sceptical of any platform that does. Property values can fall as well as rise, rental income varies, and off-plan developments can be delivered late. Where a listing shows projected figures, those come from the seller and are projections, not guarantees.",
  },
  {
    q: "What fees are there?",
    a: "Fees depend on the property and are shown on the listing where the seller has published them. Buildings with shared facilities usually charge an ongoing service fee per square metre, which covers security, reception, maintenance and the shared amenities. If a fee is not shown, ask us before committing.",
  },
  {
    q: "Do I get ownership documents?",
    a: "Investors receive ownership or fund-unit documentation for their holdings. The exact form depends on the property and the jurisdiction, so ask us about a specific listing and we will tell you what is issued for it.",
  },
  {
    q: "Can I list my own property?",
    a: "Yes. Rent and sale listings from owners and agents go through a review before they appear publicly, so that buyers are not wading through duplicates and dead listings.",
  },
  {
    q: "How do I reach a person?",
    a: "Message us on WhatsApp at +234 911 676 2327. The assistant on the site answers common questions any time, and hands you to the team when you need a person.",
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <PageLayout>
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <h1 className="font-display text-3xl font-semibold text-gray-900 sm:text-4xl">
          Frequently asked questions
        </h1>

        <dl className="mt-10 space-y-8">
          {faqs.map((f) => (
            <div key={f.q} className="border-b border-gray-200 pb-8">
              <dt className="font-display text-lg font-semibold text-gray-900">
                {f.q}
              </dt>
              <dd className="mt-2 leading-relaxed text-gray-700">{f.a}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 text-gray-700">
          Still unsure?{" "}
          <a
            href="https://wa.me/2349116762327"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-emerald-700 hover:underline"
          >
            Ask us on WhatsApp
          </a>{" "}
          or browse the{" "}
          <Link
            href="/properties"
            className="font-semibold text-emerald-700 hover:underline"
          >
            current listings
          </Link>
          .
        </p>
      </main>
    </PageLayout>
  );
}
