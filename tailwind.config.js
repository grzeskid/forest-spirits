/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "my-img": "url('../assets/baner.webp')",
        "petanque": "url('../assets/petanque.webp')"
      }
    },
  },
  plugins: [require("daisyui")],
}

