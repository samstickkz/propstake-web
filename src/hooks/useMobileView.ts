import { useState, useEffect } from "react";

const useMobileView = (breakpoint: number = 768) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth <= breakpoint);
      }
    };

    // Check if the window is defined and set the initial state
    if (typeof window !== "undefined") {
      handleResize(); // Set initial state on mount
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [breakpoint]);

  return isMobile;
};

export default useMobileView;
