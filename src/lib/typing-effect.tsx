"use client";

import React, { useState, useEffect } from "react";

interface TypingEffectProps {
  text: string;
  speed?: number; // Speed in milliseconds per character
  className?: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  speed = 100,
  className,
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, [text, speed]);

  return <div className={className}>{displayedText}</div>;
};

export default TypingEffect;
