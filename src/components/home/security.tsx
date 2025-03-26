"use client";

import Image from "next/image";
import Link from "next/link";
import { RiBankFill } from "react-icons/ri";
import { motion } from "framer-motion";

export default function WealthSecuritySection() {
  return (
    <section className="bg-black text-white md:py-24 py-12">
      <div className="container md:px-0 px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h3 className="md:text-lg text-base font-medium mb-4">
            Safeguarding Your Wealth
          </h3>
          <h2 className="text-[1.125rem] md:text-[2.25rem] font-bold mb-6 max-w-3xl mx-auto">
            We prioritize your trust as much as your investments.
          </h2>
          <p className="text-white md:text-base text-sm">
            423K+ real estate investors earned 14.1% returns in 2024, join them
          </p>
        </div>

        {/* Main Content Card */}
        <div className="border-[0.5px] border-gray-500/80 rounded-3xl p-6 md:p-20">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="flex flex-col md:pt-12">
              <div className="mb-6">
                <div className=" w-fit">
                  <RiBankFill className="h-10 w-10 text-white" />
                </div>
              </div>

              <h3 className="text-[1.125rem] md:text-[2rem] font-bold mb-4">
                Secure Ownership Verification
              </h3>

              <p className="text-gray-400 md:text-[1.5rem] text-base md:leading-9 leading-7">
                Invest with confidence—receive verifiable ownership documents
                issued by globally recognized authorities and leading financial
                institutions.
              </p>

              <div className="mt-7 md:block hidden">
                <Link
                  href="https://play.google.com/store/apps/details?id=com.prostake.app"
                  target="_blank"
                  className="inline-flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white font-satoshibold bg-[#1E7791] hover:bg-[#1E7791]"
                >
                  Download the App
                </Link>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* UAE Certificate Card */}
              <div className="border-[0.5px] border-gray-500/80 rounded-2xl md:p-6 p-4">
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black border border-gray-700 rounded-full">
                    <Image
                      src="https://ik.imagekit.io/4pztqoubze/landing-page/united%20arab%20emirates.png?updatedAt=1741193541891"
                      alt="UAE Flag"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <span className="md:text-sm text-xs">
                      United Arab Emirates
                    </span>
                  </div>
                </div>

                <h4 className="md:text-[1.5rem] text-sm text-white font-bold mb-4">
                  Verified Certificates & Title Deeds
                </h4>

                <p className="text-white font-regular  md:text-[1.25rem] text-sm md:leading-9 leading-7">
                  Ownership certificates are backed by top financial hubs,
                  ensuring legitimacy and security for all investors.
                </p>
              </div>

              {/* Saudi Arabia Fund Card */}
              <div className="border-[0.5px] border-gray-500/80 rounded-2xl p-6">
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black border border-gray-700 rounded-full">
                    <Image
                      src="https://res.cloudinary.com/dxwxyv9ry/image/upload/v1727526602/b3ccc9k2ibrclmiequxt.webp"
                      alt="Saudi Arabia Flag"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <span className="md:text-sm text-xs">Nigeria</span>
                  </div>
                </div>

                <h4 className="md:text-[1.5rem] text-sm text-white font-bold mb-4">
                  Fund Unit Certificates & Registries
                </h4>

                <p className="text-white font-regular md:text-[1.25rem] text-sm md:leading-9 leading-7">
                  Official fund unit certificates and registries are provided by
                  accredited financial administrators, ensuring full
                  transparency and compliance.
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="md:hidden flex md:items-start items-center md:justify-start justify-center"
              >
                <Link
                  href="https://play.google.com/store/apps/details?id=com.prostake.app"
                  target="_blank"
                  className="inline-flex items-center md:px-6 px-4 md:py-3 py-2 rounded-lg  text-white text-base font-medium bg-[#1E7791] hover:bg-[#1E7791] transition-colors font-satoshibold duration-200"
                >
                  Download the App
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
