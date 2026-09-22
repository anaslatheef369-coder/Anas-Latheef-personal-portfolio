/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FFFFFF", // White background
        surface: "rgba(255, 255, 255, 0.6)", // Glassy white surface
        border: "rgba(0, 0, 0, 0.1)", // Light border
        primary: {
          DEFAULT: "#000000",
          gradient: "#FF007F",
        },
        status: {
          green: "#00C0D0", // slightly darker cyan for white bg
          red: "#FF007F" // Vibrant pink/red
        },
        text: {
          main: "#111111", // Dark text
          muted: "#666666", // Grey text
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
