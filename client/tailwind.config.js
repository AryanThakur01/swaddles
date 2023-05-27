/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: "roboto"
      },
      colors: {
        primary_white: "#E7E7E7",
        secondary_white: "#C8C8C8",
        tertiary_white: "#ACACAC",
        primary_dark: "#1E1E1E",
        secondary_dark: "#4E4E4E",
        tertiary_dark: "#4B5563",
        primary: "#0D6EFD",
        success: "#38A169",
      }
    },
  },
  plugins: [],
}

