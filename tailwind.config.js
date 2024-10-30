const { max } = require("d3");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan1: "#18CCFC",
        blue1: "#6344F5",
        color1: "#A9C9FF",
      },
      backgroundImage: {
        "profile-gradient":
          "linear-gradient(120deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));",
        gradient2: "linear-gradient(120deg, #FC466B 0%, #3F5EFB 100%);",
      },
      keyframes: {
        "rotate-x": {
          "0%": { transform: "rotateX(0deg)" },
          "100%": { transform: "rotateX(360deg)" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.75 },
        },
      },
      animation: {
        "rotate-x": "rotate-x 2s linear infinite",
        blink: "blink 1s ease-in-out infinite",
      },
      fontFamily: {
        serif: ["Crimson Text", "serif"],
      },
    },
    screens: {
      sm: { min: "300px", max: "767px" },
      md: { min: "768px", max: "1279px" },
      lg: {min: "1280px", max: "1680px"},
      xl: { min: "1681px", max: "2800px" },
      xxl: { min: "3000px" },
    },
  },
  plugins: [],
};
