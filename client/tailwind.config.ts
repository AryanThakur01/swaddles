/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary_white: "#f5f7f8",
        secondary_white: "#C8C8C8",
        tertiary_white: "#ACACAC",
        primary_dark: "#1E1E1E",
        secondary_dark: "#4E4E4E",
        tertiary_dark: "#4B5563",
        primary: "#0D6EFD",
        success: "#38A169",
        danger: "#E53E3E",
      },
      keyframes: {
        popup: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        popup_close: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-800%)" },
        },
        movein_right: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        popup: "popup 0.2s ease-out",
        popup_close: "popup_close 0.5s ease-in",
        movein_right: "movein_right 0.3s ease-out",
      },
      borderRadius: {
        sm: "0.2rem",
      },
    },
  },
  plugins: [],
};
