"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function MarketSection() {
  return (
    <div className="relative md:min-h-screen h-full  overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:px-0">
        <div className="relative w-full mx-auto flex flex-col md:gap-y-[140px] gap-y-[60px]">
          <div className="grid lg:grid-cols-2 md:gap-20 gap-10 items-center bg-[#F6F6F6] md:p-20 rounded-[24px] p-4">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Country Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute top-6 md:-left-16 -left-5 z-10"
              >
                <div className="bg-white border-[1.5px] border-[#E0DEF7] backdrop-blur-sm rounded-xl shadow-lg md:p-5 p-2 flex items-center md:space-x-4 space-x-2">
                  <div className="md:w-[64px] md:h-[64px] w-[30px] h-[30px] rounded-full overflow-hidden">
                    <Image
                      src="https://ik.imagekit.io/4pztqoubze/landing-page/united%20arab%20emirates.png?updatedAt=1741193541891"
                      alt="UAE Flag"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </div>
                  <span className="text-gray-800 md:text-base text-xs font-satoshibold font-medium">
                    United Arab Emirates
                  </span>
                </div>
              </motion.div>

              {/* Main Image */}
              <motion.div
                initial={{ borderRadius: 0 }}
                animate={{ borderRadius: "24px" }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative aspect-[4/3] overflow-hidden"
              >
                <Image
                  src="https://ik.imagekit.io/4pztqoubze/landing-page/Rectangle%202826(1).png?updatedAt=1741192791511"
                  alt="Dubai Skyline"
                  fill
                  className="object-cover pointer-events-none"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative z-10"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-[1.25rem] md:text-[2.5rem] md:w-[70%] w-full leading-[120%] font-bold text-gray-900 md:mb-6 mb-4 font-satoshibold md:text-start text-center"
              >
                Tap into the World Top Real Estate Markets
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="md:text-[1.5rem] text-base md:text-start text-center text-[#5F5F5F] mb-8 md:leading-10 leading-7"
              >
                Invest in high-growth properties across United Arab Emirates and
                start earning passive income effortlessly.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="flex md:items-start items-center md:justify-start justify-center"
              >
                <Link
                  href="https://play.google.com/store/apps/details?id=com.prostake.app"
                  target="_blank"
                  className="inline-flex items-center md:px-6 px-4 md:py-3 py-2 rounded-lg  text-white text-base font-medium bg-[#1E7791] hover:bg-[#1E7791] transition-colors font-satoshibold duration-200"
                >
                  Download the App
                </Link>
              </motion.div>
            </motion.div>
          </div>
          <div className="grid lg:grid-cols-2 md:gap-20 gap-10 items-center bg-[#F6F6F6] md:p-20 rounded-[24px] p-4">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Country Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute top-6 md:-left-16 -left-5 z-10"
              >
                <div className="bg-white border-[1.5px] border-[#E0DEF7] backdrop-blur-sm rounded-xl shadow-lg md:p-5 p-2 flex items-center md:space-x-4 space-x-2">
                  <div className="md:w-[64px] md:h-[64px] w-[30px] h-[30px] rounded-full overflow-hidden">
                    <Image
                      src="https://ik.imagekit.io/4pztqoubze/landing-page/saudi%20arabia.png?updatedAt=1741194736893"
                      alt="UAE Flag"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </div>
                  <span className="text-gray-800 md:text-base text-xs font-satoshibold font-medium">
                    Saudi Arabia
                  </span>
                </div>
              </motion.div>

              {/* Main Image */}
              <motion.div
                initial={{ borderRadius: 0 }}
                animate={{ borderRadius: "24px" }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative aspect-[4/3] overflow-hidden"
              >
                <Image
                  src="https://ik.imagekit.io/4pztqoubze/landing-page/Rectangle%202826(2)(1).png?updatedAt=1741194985664"
                  alt="Dubai Skyline"
                  fill
                  className="object-cover pointer-events-none"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative z-10"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-[1.25rem] md:text-[2.5rem] md:w-[70%] w-full leading-[120%] font-bold text-gray-900 md:mb-6 mb-4 font-satoshibold md:text-start text-center"
              >
                Exclusive Access to a Booming Real Estate Market
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="md:text-[1.5rem] text-base md:text-start text-center text-[#5F5F5F] mb-8 md:leading-10 leading-7"
              >
                Invest in premium commercial and residential properties
                traditionally reserved for high-net-worth individuals—now
                accessible to you.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="flex md:items-start items-center md:justify-start justify-center"
              >
                <Link
                  href="https://play.google.com/store/apps/details?id=com.prostake.app"
                  target="_blank"
                  className="inline-flex items-center px-6 py-3 rounded-lg  text-white text-base font-medium bg-[#1E7791] hover:bg-[#1E7791] transition-colors font-satoshibold duration-200"
                >
                  Download the App
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
