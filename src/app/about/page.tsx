import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/layouts/page-layout";

export const metadata: Metadata = {
  title: "About us",
  description:
    "PropStake is a property platform for investing in a fractional share of a building, renting a home, or buying one outright, with listings in Georgia and the United Arab Emirates.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageLayout>
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-gray-900 sm:text-4xl">
          About PropStake
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-gray-700">
          PropStake is a property platform for people who want a stake in real
          estate without needing the price of a whole building. You can invest
          in a fractional share of a vetted property, rent a home, or buy one
          outright, in one place.
        </p>

        <h2 className="font-display mt-10 text-xl font-semibold text-gray-900">
          How it works
        </h2>
        <ol className="mt-4 space-y-4 text-gray-700">
          <li>
            <span className="font-semibold text-gray-900">Browse.</span> Every
            listing shows the photographs, the location, the size, the price
            and, for investments, the funding progress. Filter by city,
            bedrooms and price.
          </li>
          <li>
            <span className="font-semibold text-gray-900">Ask.</span> Send an
            enquiry on any rent or sale listing and the lister or our team
            replies. Our assistant answers questions on the site at any hour.
          </li>
          <li>
            <span className="font-semibold text-gray-900">Invest.</span> Buying
            a fractional share happens in the PropStake mobile app, where your
            holdings and documents live.
          </li>
        </ol>

        <h2 className="font-display mt-10 text-xl font-semibold text-gray-900">
          Where we list
        </h2>
        <p className="mt-4 text-gray-700">
          Our current listings are in Batumi, Georgia, and the United Arab
          Emirates. We add markets as we find developers and owners whose
          paperwork we can check.
        </p>

        <h2 className="font-display mt-10 text-xl font-semibold text-gray-900">
          What we will not do
        </h2>
        <p className="mt-4 text-gray-700">
          We do not promise returns. Property values rise and fall, rental
          income varies, and developers miss completion dates. Where a listing
          shows projected figures, those are projections supplied by the seller,
          not guarantees, and we say so on the page. If we cannot substantiate a
          claim a developer makes, we leave it off the listing rather than
          repeat it.
        </p>
        <p className="mt-4 text-gray-700">
          PropStake is not a financial adviser. For advice about your own
          circumstances, speak to a qualified professional.
        </p>

        <h2 className="font-display mt-10 text-xl font-semibold text-gray-900">
          Talk to us
        </h2>
        <p className="mt-4 text-gray-700">
          Message us on{" "}
          <a
            href="https://wa.me/2349116762327"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-emerald-700 hover:underline"
          >
            WhatsApp
          </a>
          , or start with the{" "}
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
