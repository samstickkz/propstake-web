/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setEmail("");
    } catch (error: any) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
 };

  return (
    <section className="bg-[#1E7791] md:py-24 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container ms:px-0 px-4 mx-auto text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[1.125rem] md:text-[2.25rem] font-satoshibold font-bold text-white mb-6"
        >
          Are you a property investor?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm md:text-xl text-white/90 mb-12 max-w-2xl mx-auto"
        >
          Unlock exclusive insights to grow your portfolio, maximize returns,
          and secure verified ownership. No spam—just value.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <form onSubmit={handleSubmit} className="md:max-w-xl mx-auto">
            <div
              className={`flex flex-row bg-white md:p-3 p-2 rounded-md gap-3 ${
                error ? "border-[1.5px] border-red-500" : ""
              }`}
            >
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className={`w-full md:px-2 px-1 py-3 rounded-lg text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-0 `}
                  disabled={isSubmitting || isSuccess}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="md:px-8 px-4 py-3 rounded-lg bg-[#1E7791] text-white font-medium hover:bg-[#1E7791] focus:outline-none focus:ring-2 focus:ring-[#1E7791] focus:ring-offset-2 focus:ring-offset-[#1E7791] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isSuccess ? (
                  "Thanks for joining! ✨"
                ) : (
                  "Submit"
                )}
              </button>
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-200 text-sm mt-2 text-left"
              >
                {error}
              </motion.p>
            )}
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-white/80 font-medium text-sm mt-8"
          >
            Join 10,000+ investors leveraging fractional ownership
            <br />
            and digital real estate opportunities.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
