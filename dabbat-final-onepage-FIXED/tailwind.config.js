/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#033864",
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        mono: ['"DM Mono"', "monospace"],
        serif: ['"Playfair Display"', "serif"],
      },
    },
  },
  plugins: [],
};
