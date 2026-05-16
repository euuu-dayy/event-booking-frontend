/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "#0D0D0D",

        card: "#161616",

        border: "#262626",

        gold: "#D4AF37",

        softGold: "#C5A46D",

        champagne: "#E5C87B",
      },
    },
  },

  plugins: [],
};