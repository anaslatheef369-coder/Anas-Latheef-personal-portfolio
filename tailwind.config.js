/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#000000",
        surface: "#0A0A0C", // Iridium dark base
        border: "#1F1F24", // Iridium reflection
        primary: {
          DEFAULT: "#8B5CF6", // Promethium Violet
          gradient: "#06B6D4",
        },
        status: {
          green: "#39FF14", // Radioactive Polonium Green
        },
        text: {
          main: "#FFFFFF",
          muted: "#A1A1AA",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'primary-gradient': 'linear-gradient(to right, #6366F1, #06B6D4)',
      }
    },
  },
  plugins: [],
}
