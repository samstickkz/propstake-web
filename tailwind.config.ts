import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      satoshibold: ["Satoshi Bold", "sans-serif"],
      
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "meta-1": "#DC3545",
        "meta-2": "#EFF2F7",
        "meta-3": "#10B981",
        "meta-4": "#313D4A",
        "meta-5": "#259AE6",
        "meta-6": "#FFBA00",
        "meta-7": "#FF6766",
        "meta-8": "#F0950C",
        "meta-9": "#E5E7EB",
        "meta-10": "#0FADCF",
        success: "#219653",
        danger: "#D34053",
        warning: "#FFA70B",
      },
      zIndex: {
        999999: "999999",
        99999: "99999",
        9999: "9999",
        999: "999",
        99: "99",
        9: "9",
        1: "1",
      },
    },
  },
  plugins: [],
} satisfies Config;
