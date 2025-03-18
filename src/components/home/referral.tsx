"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ReferralSection() {
  return (
    <section className="md:py-24  py-10 px-4 bg-white">
      <div className="container mx-auto">
        <div className="bg-[#F6F6F6] rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-2 items-center">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Image */}
              <div className="relative">
                <Image
                  src="https://ik.imagekit.io/4pztqoubze/landing-page/Group%201000004684(1).png?updatedAt=1741199431455"
                  alt="Friends using the referral app"
                  width={600}
                  height={400}
                  className="w-full h-auto pointer-events-none"
                  priority
                />
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 lg:p-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-[2.5rem] font-bold text-gray-900 mb-6 font-satoshibold">
                  Inviting Friends (Referrals)
                </h2>
                <p className="text-[1.5rem] text-gray-600 leading-relaxed mb-8">
                  Share your unique code and get rewarded every time a friend
                  joins. Multiply your earnings simply by spreading the word.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
