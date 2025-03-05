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
      subtitle: "text-teal-400",
      title: "text-white",
    },
  };

  return (
    <div className={`max-w-4xl mx-auto px-4 ${centered ? "text-center" : ""}`}>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`text-lg md:text-xl font-medium mb-4 ${textColors[theme].subtitle}`}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${textColors[theme].title}`}
      >
        {title}
      </motion.h2>
    </div>
  );
}
