"use client";

import { motion } from "framer-motion";

export default function FeatureAnnouncement() {
  return (
    <section className="bg-white md:py-24 py-12 md:px-0 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 md:gap-24 gap-12 items-center justify-between w-full">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[1.125rem] md:text-start text-center md:text-[2.5rem] font-satoshibold font-bold text-[#1F1F1F] leading-relaxed md:mb-5 mb-3"
            >
              Participating in Promotional Events
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-[1.5rem] font-regular text-[#1F1F1F] leading-relaxed md:text-start text-center"
            >
              Take advantage of exclusive, time-limited offers. Boost your
              returns with special bonuses and higher potential payouts.
            </motion.p>
          </motion.div>

          {/* Icon Circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:h-[576px] md:w-[576px] h-[250px] w-[250px] mx-auto md:mx-0"
            style={{
              backgroundImage:
                "url('https://ik.imagekit.io/4pztqoubze/landing-page/Frame%201000005319.png?updatedAt=1741198091078')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></motion.div>
        </div>
      </div>
    </section>
  );
}
