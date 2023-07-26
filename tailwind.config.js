/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#91C8E4",

          secondary: "#749BC2",

          accent: "#4682A9",

          neutral: "#F6F4EB",

          "base-100": "#ffffff",

          info: "#3abff8",

          success: "#36d399",

          warning: "#fbbd23",

          error: "#f87272",
        },
      },
      "light",
      "dark",
      "cupcake",
      "lofi",
    ],
  },
  plugins: [require("daisyui")],
};
