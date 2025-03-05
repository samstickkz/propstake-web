import useMobileView from "@/hooks/useMobileView";
import React from "react";

interface ProgressCircleProps {
  percentage: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ percentage }) => {
	 const isMobile = useMobileView();
  const radius = isMobile ? 80 : 94;
  const stroke = 9;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const strokeColor = percentage === 0 ? "stroke-red" : percentage < 75 ? "stroke-warning" : "stroke-[#10B981]";

  return (
    <div className="flex justify-center items-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
      >
        <circle
          stroke={`${
            percentage === 0
              ? `#FB5454`
              : percentage < 75
              ? `#E2E8F0`
              : `#E2E8F0`
          }`}
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className={strokeColor}
          strokeLinecap="round"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <span
        className={`absolute lg:text-4xl text-3xl font-bold text-center  ${
          percentage === 0 ? `text-red` :  percentage < 75 ? `text-warning`: `text-meta-3`
        }`}
      >
        {percentage}%
      </span>
    </div>
  );
};

export default ProgressCircle;
