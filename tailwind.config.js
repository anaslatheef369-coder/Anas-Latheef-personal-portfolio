/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#030308", // Dark space background
        surface: "rgba(10, 10, 15, 0.4)", // Dark glass
        border: "rgba(255, 255, 255, 0.1)", // Light border for dark glass
        primary: {
          DEFAULT: "#FFFFFF",
          gradient: "#FF007F",
        },
        status: {
          green: "#00F0FF", // vibrant cyan
          red: "#FF007F" // Vibrant pink/red
        },
        text: {
          main: "#FFFFFF", // White text
          muted: "#9CB4D8", // Grey/Blue text
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
