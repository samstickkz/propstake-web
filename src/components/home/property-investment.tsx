"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { DollarSign, BarChart3 } from "lucide-react";

export default function PropertyInvestmentShowcase() {
  return (
    <section className="py-20 px-4 bg-white overflow-hidden">
      <div className="container md:px-0 p-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-[2rem] font-bold text-gray-900 mb-6"
            >
              Investing in new properties
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-[1.5rem] text-[#5F5F5F] mb-12"
            >
              Grow your portfolio with prime real estate deals. Earn steady
              rental income and watch your assets appreciate over time.
            </motion.p>

            {/* Feature Cards */}
            <div className="flex flex-wrap gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-green-100 rounded-xl p-6 w-40 h-40 flex flex-col items-center justify-center text-center"
              >
                <div className="bg-white p-3 rounded-full mb-3">
                  <DollarSign className="h-6 w-6 text-gray-800" />
                </div>
                <span className="font-semibold text-gray-900">
                  Yearly Return
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-orange-100 rounded-xl p-6 w-40 h-40 flex flex-col items-center justify-center text-center"
              >
                <div className="bg-white p-3 rounded-full mb-3">
                  <BarChart3 className="h-6 w-6 text-gray-800" />
                </div>
                <span className="font-semibold text-gray-900">High ROI</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - iPhone Mockup */}
          <motion.div>
            <div className="">
              {/* iPhone Frame */}
              <Image
                src="https://ik.imagekit.io/4pztqoubze/landing-page/Frame%201321316220(1).png?updatedAt=1742221554767"
                alt="iPhone frame"
                width={350}
                height={700}
                className="mx-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
