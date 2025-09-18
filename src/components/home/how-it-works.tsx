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
    <section className="bg-white md:py-24 py-18">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <SectionHeader
          subtitle="How it works"
          title="Grow Your Wealth Without Breaking Your Bank"
          theme="dark"
        />
      </motion.div>
      <div className="container md:px-0 mx-auto px-4 flex flex-col md:gap-y-24">
        <div className="bg-[#F6F6F6] md:mb-0 mb-14 md:py-24 py-10 overflow-hidden rounded-[24px] md:min-h-full min-h-[70vh]">
          <div className="container mx-auto md:px-14 p-6">
            <div className="grid lg:grid-cols-2 md:gap-12 items-center">
              {/* Left Column - Content */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="md:max-w-xl"
              >
                <motion.span
                  variants={itemVariants}
                  className="text-base md:text-2xl font-satoshibold text-[#1E7791] font-medium mb-4 md:text-start text-center md:pt-28 block"
                >
                  Discover
                </motion.span>

                <motion.h1
                  variants={itemVariants}
                  className="text-[1.25rem] md:text-[2rem] font-satoshibold lg:text-[2rem] font-bold md:text-start text-center text-gray-900 mb-6"
                >
                  Unlock Exclusive
                  <br />
                  Real Estate Opportunities
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-base md:text-[1.3rem] md:text-start text-center text-[#5F5F5F] leading-[150%] mb-12"
                >
                  Your journey starts with as little as ₦50,000. Our team
                  carefully selects each property for direct purchase or
                  crowdfunding, giving you the flexibility to build a robust
                  portfolio.
                  <br />
                  <br />
                  With two completed projects in Nigeria, our track record
                  speaks for itself.{" "}
                  <Link
                    href="https://www.google.com/search?q=npj+service+Apartment&oq=npj&gs_lcrp=EgZjaHJvbWUqBggEEEUYOzIGCAAQRRg9MgYIARBFGDkyBggCEEUYOzIGCAMQRRg7MgYIBBBFGDsyBggFEEUYPTIGCAYQRRg80gEIMzIzMWowajSoAgCwAgE&sourceid=chrome&ie=UTF-8&zx=1758153499130&no_sw_cr=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1E7791] underline hover:no-underline"
                  >
                    Explore Our Projects. (NPJ Service Apartments)
                  </Link>
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className=" flex-wrap gap-4 md:flex hidden "
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
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="relative"
              >
                {/* Background Phone */}
                <motion.div
                  variants={phoneVariants}
                  className="w-full h-[250px] absolute md:-top-60 top-10 md:w-full md:h-[650px]"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src="https://ik.imagekit.io/4pztqoubze/landing-page/Frame%201321316185.png?updatedAt=1741214878388"
                      alt="Sign in screen"
                      fill
                      className="md:object-contain object-fit pointer-events-none"
                      priority
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
        <section className="bg-[#F6F6F6] md:mb-0 mb-14 md:py-24 py-10 overflow-hidden rounded-[24px] ">
          <div className="container mx-auto px-4">
            <div className="md:grid md:grid-cols-2 flex flex-col-reverse gap-12 items-center">
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
                  className="w-full h-[250px] md:absolute md:-top-60 -top-10 md:w-full md:h-[650px]"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src="https://ik.imagekit.io/4pztqoubze/landing-page/Group%201000004687(1).png?updatedAt=1741216928847"
                      alt="Sign in screen"
                      fill
                      className="md:object-contain object-fit pointer-events-none"
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
                  className="text-base md:text-start text-center font-satoshibold md:text-2xl text-[#1E7791] font-medium mb-4 md:pt-28 block"
                >
                  Invest Now, Earn Forever
                </motion.span>

                <motion.h1
                  variants={itemVariants}
                  className="text-[1.25rem] md:text-[2rem] font-satoshibold lg:text-[2rem] font-bold md:text-start text-center text-gray-900 mb-6"
                >
                  Own a Share of
                  <br />
                  Premium Properties
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-base md:text-[1.3rem] md:text-start text-center text-[#5F5F5F] leading-[150%] mb-12"
                >
                  Choose from expertly vetted properties and invest with ease.
                  Your portfolio is fully managed, so you can focus on growing
                  your wealth.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-4 md:mx-0 mx-auto w-full"
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
                      width={156}
                      height={42}
                      className="md:w-[208px] w-[150px] md:h-[68px] h-[48px] pointer-events-none"
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
