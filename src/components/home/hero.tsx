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
      className="relative md:min-h-[85vh] bg-white overflow-hidden"
      style={{
        backgroundImage:
          "url('https://ik.imagekit.io/4pztqoubze/landing-page/Frame%201000005332(1).png?updatedAt=1741190910279')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto md:py-16 py-10 md:px-0 px-4">
        <div className="flex w-full md:flex-row flex-col items-center justify-between">
          {/* Left Column - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="md:w-1/2 w-full"
          >
            <motion.h1
              variants={itemVariants}
              className="text-[2rem] md:text-[4rem] font-satoshibold font-bold  text-black md:mb-10 mb-4 leading-[130%] md:w-[80%] w-full"
            >
              Invest in <span className="text-[#1E7791]">Real Estate</span>,
              Build Wealth Globally
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-[1.125rem] md:text-xl text-black font-medium mb-8 md:max-w-2xl w-full"
            >
              Invest onces, earn for a lifetime in Dollars.
              <br />
              Become a landlord with as little as N50,000
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 w-full"
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
                  className="md:w-[208px] w-[150px] md:h-[68px] h-[48px] pointer-events-none"
                />
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=com.prostake.app"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <Image
                  src="https://ik.imagekit.io/4pztqoubze/landing-page/Frame%201000002217.png?updatedAt=1741189487369"
                  alt="Get it on Google Play"
                  width={140}
                  height={42}
                  className="md:w-[208px] w-[150px] md:h-[68px] h-[48px] pointer-events-none"
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Phone Mockups */}
          <motion.div
            variants={phoneVariants}
            initial="hidden"
            animate="visible"
            className="md:w-1/2 w-full md:mt-0 relative mt-14"
          >
            {/* Background Phone */}
            <div className=" w-full">
              <div className="md:relative md:h-[640px] h-[450px] md:left-24 md:w-[70%] w-full">
                <Image
                  src="https://ik.imagekit.io/4pztqoubze/landing-page/Frame%201321316303.png?updatedAt=1741190302185"
                  alt="Mobile app splash screen"
                  fill
                  className="md:object-fit object-contain pointer-events-none"
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
