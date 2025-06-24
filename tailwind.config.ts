import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite", // Slower spin animation
        "scale-spin": "scaleSpin 2s ease-in-out infinite", // Spin + Scale animation
        "fade-in": "fadeIn 0.5s ease-out",
        "zoom-in": "zoomIn 300ms ease-out",
        "custom-spin": "spin 1.5s linear infinite",
        "scale-pulse": "scalePulse 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleSpin: {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.2)" }, // Scale up slightly
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
        zoomIn: {
          "0%": { transform: "scale(0.5)" },
          "100%": { transform: "scale(1)" },
        },
        scalePulse: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
