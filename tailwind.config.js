/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#030308",
        surface: "rgba(10, 10, 15, 0.4)",
        border: "rgba(255, 255, 255, 0.1)",
        primary: {
          DEFAULT: "#FFFFFF",
          gradient: "#FF007F",
        },
        status: {
          green: "#00F0FF", // Re-purposed to a vibrant cyan
          red: "#FF007F" // Vibrant pink/red
        },
        text: {
          main: "#FFFFFF",
          muted: "#9CB4D8",
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
