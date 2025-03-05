"use client";

import { motion } from "framer-motion";

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Footer() {
  return (
    <motion.footer
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={footerVariants}
    >
    <div></div>
    </motion.footer>
  );
}
