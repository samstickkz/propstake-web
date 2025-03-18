"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  centered?: boolean;
  theme?: "light" | "dark";
}

export default function SectionHeader({
  subtitle,
  title,
  centered = true,
  theme = "dark",
}: SectionHeaderProps) {
  const textColors = {
    light: {
      subtitle: "text-teal-600",
      title: "text-gray-900",
    },
    dark: {
      subtitle: "text-[#1E7791]",
      title: "text-black",
    },
  };

  return (
    <div
      className={`container flex flex-col items-center mx-auto px-4 md:px-0 ${
        centered ? "text-center" : ""
      }`}
    >
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`text-lg md:text-[2rem] font-satoshibold font-medium mb-5 ${textColors[theme]?.subtitle}`}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`text-[1.75rem] md:text-[2.5rem] mb-10 text-black font-satoshibold font-bold md:w-[50%] leading-[125%] ${textColors[theme].title}`}
      >
        {title}
      </motion.h2>
    </div>
  );
}
