/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // all JS/JSX/TS/TSX files inside src
  ],
    darkMode: "class", // enables class-based dark mode
  theme: {
    extend: {},
  },
  plugins: [],
}
