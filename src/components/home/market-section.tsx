"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
// FIX: Import the type directly from the core library
import { type EmblaCarouselType } from 'embla-carousel';
import Autoplay from "embla-carousel-autoplay";
import { DotButton, PrevButton, NextButton } from "./EmblaCarouselButtons";

const marketsData = [
  {
    country: "United Arab Emirates",
    flagSrc:
      "https://ik.imagekit.io/4pztqoubze/landing-page/united%20arab%20emirates.png?updatedAt=1741193541891",
    imageSrc:
      "https://ik.imagekit.io/4pztqoubze/landing-page/Rectangle%202826(1).png?updatedAt=1741192791511",
    title: "Tap into the World's Top Real Estate Markets",
    description:
      "Invest in high-growth properties across the United Arab Emirates and start earning passive income effortlessly.",
  },
  {
    country: "Saudi Arabia",
    flagSrc:
      "https://ik.imagekit.io/4pztqoubze/landing-page/saudi%20arabia.png?updatedAt=1741194736893",
    imageSrc:
      "https://ik.imagekit.io/4pztqoubze/landing-page/Rectangle%202826(2)(1).png?updatedAt=1741194985664",
    title: "Exclusive Access to a Booming Real Estate Market",
    description:
      "Invest in premium commercial and residential properties traditionally reserved for high-net-worth individuals—now accessible to you.",
  },
];

export default function MarketSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  // FIX: Use the correctly imported EmblaCarouselType
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative md:min-h-screen h-full overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:px-0">
        <div className="embla w-full" ref={emblaRef}>
          <div className="embla__container">
            {marketsData.map((market, index) => (
              <div className="embla__slide" key={index}>
                <div className="grid lg:grid-cols-2 md:gap-20 gap-10 items-center bg-[#F6F6F6] md:p-20 rounded-[24px] p-4">
                  {/* Left Column - Image */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={
                      selectedIndex === index
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -50 }
                    }
                    transition={{ duration: 0.8 }}
                    className="relative"
                  >
                    {/* Country Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={
                        selectedIndex === index
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: -20 }
                      }
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="absolute top-6 md:-left-16 -left-5 z-10"
                    >
                      <div className="bg-white border-[1.5px] border-[#E0DEF7] backdrop-blur-sm rounded-xl shadow-lg md:p-5 p-2 flex items-center md:space-x-4 space-x-2">
                        <div className="md:w-[64px] md:h-[64px] w-[30px] h-[30px] rounded-full overflow-hidden">
                          <Image
                            src={market.flagSrc}
                            alt={`${market.country} Flag`}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover pointer-events-none"
                          />
                        </div>
                        <span className="text-gray-800 md:text-base text-xs font-satoshibold font-medium">
                          {market.country}
                        </span>
                      </div>
                    </motion.div>

                    {/* Main Image */}
                    <motion.div
                      initial={{ borderRadius: "0px" }}
                      animate={
                        selectedIndex === index
                          ? { borderRadius: "24px" }
                          : { borderRadius: "0px" }
                      }
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="relative aspect-[4/3] overflow-hidden"
                    >
                      <Image
                        src={market.imageSrc}
                        alt={`${market.country} Skyline`}
                        fill
                        className="object-cover pointer-events-none"
                        priority={index === 0}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Right Column - Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      selectedIndex === index
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 30 }
                    }
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="relative z-10"
                  >
                    <motion.h2
                      className="text-[1.25rem] md:text-[2.5rem] md:w-[70%] w-full leading-[120%] font-bold text-gray-900 md:mb-6 mb-4 font-satoshibold md:text-start text-center"
                    >
                      {market.title}
                    </motion.h2>
                    <motion.p className="md:text-[1.5rem] text-base md:text-start text-center text-[#5F5F5F] mb-8 md:leading-10 leading-7">
                      {market.description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        selectedIndex === index
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 20 }
                      }
                      transition={{ delay: 1, duration: 0.5 }}
                      className="flex md:items-start items-center md:justify-start justify-center"
                    >
                      <Link
                        href="https://play.google.com/store/apps/details?id=com.prostake.app"
                        target="_blank"
                        className="inline-flex items-center md:px-6 px-4 md:py-3 py-2 rounded-lg text-white text-base font-medium bg-[#1E7791] hover:bg-[#1E7791]/90 transition-colors font-satoshibold duration-200"
                      >
                        Download the App
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="embla__controls flex items-center justify-center gap-x-10 mt-12">
            <div className="embla__buttons flex items-center gap-x-4">
                 <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
                 <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
            </div>
            <div className="embla__dots flex items-center gap-x-2">
                {scrollSnaps.map((_, index) => (
                    <DotButton
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`embla__dot ${index === selectedIndex ? "embla__dot--selected" : ""}`}
                    />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}