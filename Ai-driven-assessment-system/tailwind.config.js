/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "hero-login": "url('./src/assets/login-background.png')",
        "play-btn": "url('./src/assets/play-button.png')",
      },
      colors: {
        "not-white": "#F6F8FA",
        "darkest-blue": "#01B3EF",
        "soft-pink": "#E14177",
        "some-white": "#EEF2F5",
        "light-blue": "#176EB6",
        "soft-blue": "#6DCFFB",
        "dark-blue": "#01427A",
        "light-yellow": "#FDF509",
        "light-gray": "#A5A5A5",
      },
    },
  },
  plugins: [],
};
