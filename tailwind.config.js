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
        "my-img": "url('../assets/baner.jpg')",
        "petanque": "url('../assets/petanque.jpg')"
      }
    },
  },
  plugins: [require("daisyui")],
}

