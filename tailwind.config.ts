import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 2s linear infinite', // Slower spin animation
        'scale-spin': 'scaleSpin 2s ease-in-out infinite', // Spin + Scale animation
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: "0"},
          '100%': { opacity: "1"}
        },
        scaleSpin: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.2)' }, // Scale up slightly
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
