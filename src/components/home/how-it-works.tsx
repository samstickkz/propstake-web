"use client";

import { motion } from "framer-motion";
import SectionHeader from "./section-header";

export default function HowItWorks() {
  return (
    <section className="bg-black py-24">
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
    </section>
  );
}
