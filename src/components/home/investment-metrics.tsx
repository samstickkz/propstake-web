"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

interface Metric {
  value: string;
  label: string;
  prefix?: string;
  endValue: number;
  duration?: number;
}

const metrics: Metric[] = [
  {
    value: "850K+",
    label: "Registered Investors",
    endValue: 850,
    duration: 2,
  },
  {
    value: "$750M+",
    label: "Property Transactions",
    prefix: "$",
    endValue: 750,
    duration: 2.5,
  },
  {
    value: "190",
    label: "Investment Opportunities",
    endValue: 190,
    duration: 1.5,
  },
  {
    value: "$30M+",
    label: "Rental Income Paid",
    prefix: "$",
    endValue: 30,
    duration: 1.8,
  },
  {
    value: "12+",
    label: "Countries Covered",
    endValue: 12,
    duration: 1,
  },
];

const AnimatedCounter = ({
  value,
  prefix = "",
  duration = 2,
  suffix = "",
}: {
  value: number;
  prefix?: string;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = Number(value);
      const increment = end / (duration * 60); // 60 FPS
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export default function InvestmentMetrics() {
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
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="md:py-24 py-10 bg-white">
      <div className="container md:px-0 px-4 mx-auto">
        <div className="grid lg:grid-cols-2 md:gap-[73px] gap-10 items-center">
          {/* Left Column - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 w-[90%]"
          >
            <motion.p
              variants={itemVariants}
              className="text-base md:text-[2rem] text-[#1E7791] leading-7 md:leading-10 font-medium"
            >
              The leading platform for
              <br />
              digital real estate investments.
            </motion.p>

            <motion.h2
              variants={itemVariants}
              className="text-[1.25rem] md:text-[2.25rem] font-bold text-black md:leading-10 leading-7"
            >
              Invest in high-growth properties across multiple regions and asset
              types, all from one platform.
            </motion.h2>
          </motion.div>

          {/* Right Column - Metrics Grid */}
          <div className="md:grid md:grid-cols-2 md:gap-[73px] md:space-y-0 space-y-4">
            {metrics.slice(0, 2).map((metric, index) => (
              <MetricCard key={index} metric={metric} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom Row - Additional Metrics */}
        <div className="md:grid md:grid-cols-3 md:gap-[73px] md:space-y-0 space-y-6 md:mt-[73px] mt-6">
          {metrics.slice(2).map((metric, index) => (
            <MetricCard key={index + 2} metric={metric} index={index + 2} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface MetricCardProps {
  metric: Metric;
  index: number;
}

function MetricCard({ metric, index }: MetricCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.1 * index },
    },
  };

  const getSuffix = () => {
    if (metric.value.includes("K+")) return "K+";
    if (metric.value.includes("M+")) return "M+";
    if (metric.value.includes("+")) return "+";
    return "";
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-[#ECF0FF] rounded-[16px] md:p-20 p-10 text-center"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="text-[1.5rem] md:text-[2rem] font-bold text-gray-900 md:mb-4 mb-2">
        <AnimatedCounter
          value={metric.endValue}
          prefix={metric.prefix}
          duration={metric.duration}
          suffix={getSuffix()}
        />
      </div>
      <div className="text-[#5F5F5F] md:text-[1.5rem] text-base">{metric.label}</div>
    </motion.div>
  );
}
