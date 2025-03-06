"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "./section-header";

export default function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const phoneVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };
  return (
    <section className="bg-white py-24">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <SectionHeader
          subtitle="How it works"
          title="Grow Your Wealth with Hassle-Free Real Estate Investments"
          theme="dark"
        />
      </motion.div>
      <div className="flex flex-col gap-y-24">
        <section className="bg-[#F6F6F6] py-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-xl"
              >
                <motion.span
                  variants={itemVariants}
                  className="text-xl md:text-2xl font-satoshibold text-[#1E7791] font-medium mb-4 pt-28 block"
                >
                  Discover
                </motion.span>

                <motion.h1
                  variants={itemVariants}
                  className="text-4xl md:text-[2rem] font-satoshibold lg:text-[2rem] font-bold text-gray-900 mb-6"
                >
                  Unlock Exclusive
                  <br />
                  Real Estate Opportunities
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-lg md:text-[1.3rem] text-[#5F5F5F] leading-[150%] mb-12"
                >
                  Sign up in just a few minutes and gain access to a carefully
                  curated selection of high-value properties across
                  top-performing markets.
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
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="relative"
              >
                {/* Background Phone */}
                <motion.div
                  variants={phoneVariants}
                  className="w-full h-[570px] absolute -top-60 md:w-full md:h-[650px]"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src="https://ik.imagekit.io/4pztqoubze/landing-page/Frame%201321316185.png?updatedAt=1741214878388"
                      alt="Sign in screen"
                      fill
                      className="object-contain pointer-events-none"
                      priority
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="bg-[#F6F6F6] py-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Phone Mockups */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="relative"
              >
                {/* Background Phone */}
                <motion.div
                  variants={phoneVariants}
                  className="w-full h-[570px] absolute -top-60 md:w-full md:h-[650px]"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src="https://ik.imagekit.io/4pztqoubze/landing-page/Group%201000004687(1).png?updatedAt=1741216928847"
                      alt="Sign in screen"
                      fill
                      className="object-contain pointer-events-none"
                      priority
                    />
                  </div>
                </motion.div>
              </motion.div>
              {/* Right Column - Content */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-xl"
              >
                <motion.span
                  variants={itemVariants}
                  className="text-xl font-satoshibold md:text-2xl text-[#1E7791] font-medium mb-4 pt-28 block"
                >
                  Invest
                </motion.span>

                <motion.h1
                  variants={itemVariants}
                  className="text-4xl md:text-[2rem] lg:text-[2rem] font-satoshibold font-bold  text-gray-900 mb-6"
                >
                  Own a Share of
                  <br />
                  Premium Properties
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-lg md:text-[1.3rem] text-[#5F5F5F] leading-[150%] mb-12"
                >
                  Choose from expertly vetted properties and invest with ease.
                  Your portfolio is fully managed, so you can focus on growing
                  your wealth.
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
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
