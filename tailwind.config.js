/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#00102A", // Deep Imperial Blue dark base
        surface: "#001B44", // Deep Imperial Blue surface
        border: "#003380", // Lighter imperial blue for borders
        primary: {
          DEFAULT: "#FFFFFF", // White
          gradient: "#FF003C", // Red
        },
        status: {
          green: "#00FF41", // Green
          red: "#FF003C" // Red
        },
        text: {
          main: "#FFFFFF",
          muted: "#9CB4D8",
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        display: ['"Orbitron"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
