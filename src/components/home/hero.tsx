"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const phoneVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className="relative min-h-[85vh] bg-white overflow-hidden"
      style={{
        backgroundImage:
          "url('https://ik.imagekit.io/4pztqoubze/landing-page/Frame%201000005332(1).png?updatedAt=1741190910279')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}>
      <div className="container mx-auto py-16 md:px-0 px-4">
        <div className="flex w-full md:flex-row flex-col items-center justify-between">
          {/* Left Column - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-1/2"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-[4rem] lg:text-[4rem] font-bold  text-black mb-10 leading-[130%]"
            >
              Invest in <span className="text-[#1E7791]">Real Estate</span>,
              <br />
              Build Wealth
              <br />
              Effortlessly
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-black font-medium mb-8 max-w-2xl"
            >
              Fractional ownership in prime properties.
              <br />
              Earn passive income with as little as $50.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <Image
                  src="https://ik.imagekit.io/4pztqoubze/landing-page/Frame%201000002218(1).png?updatedAt=1741189460160"
                  alt="Download on the App Store"
                  width={140}
                  height={42}
                  className=" w-[208px] h-[68px] pointer-events-none"
                />
              </Link>
              <Link
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <Image
                  src="https://ik.imagekit.io/4pztqoubze/landing-page/Frame%201000002217.png?updatedAt=1741189487369"
                  alt="Get it on Google Play"
                  width={156}
                  height={42}
                  className=" w-[208px] h-[68px] pointer-events-none"
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Phone Mockups */}
          <motion.div
            variants={phoneVariants}
            initial="hidden"
            animate="visible"
            className="w-1/2"
          >
            {/* Background Phone */}
            <div className=" w-full">
              <div className="relative w-full md:h-[640px] left-24 md:w-[70%] ">
                <Image
                  src="https://ik.imagekit.io/4pztqoubze/landing-page/Frame%201321316303.png?updatedAt=1741190302185"
                  alt="Mobile app splash screen"
                  fill
                  className="object-fit"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
