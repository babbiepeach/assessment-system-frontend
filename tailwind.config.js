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
        "back-image": "url('/src/assets/background.png')",
        "class-background": "url('/src/assets/class-background.png')",
      },
      colors: {
        "not-white": "#F6F8FA",
        "some-white": "#EEF2F5",
        "soft-pink": "#E14177",
        "darkest-blue": "#01B3EF",
        "light-blue": "#176EB6",
        "soft-blue": "#6DCFFB",
        "dark-blue": "#01427A",
        "light-yellow": "#FDF509",
        "light-gray": "#A5A5A5",
        "dark-gray": "#6C6C6C",
        "bright-yellow": "#FDF509",
        "logo-blue": "#468BC5",
      },
      scrollbar: ["rounded"],
    },
  },
  plugins: [],
};
