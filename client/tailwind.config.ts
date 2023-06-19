/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary_white: "#E7E7E7",
        secondary_white: "#C8C8C8",
        tertiary_white: "#ACACAC",
        primary_dark: "#1E1E1E",
        secondary_dark: "#4E4E4E",
        tertiary_dark: "#4B5563",
        primary: "#0D6EFD",
        success: "#38A169",
      },
      keyframes: {
        popup: {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        popup: "popup 0.3s linear",
      },
    },
  },
  plugins: [],
};
