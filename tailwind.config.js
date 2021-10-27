const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./*.html", "./src/**/*.ts"],
  darkMode: "media",
  theme: {
    colors: {
      white: colors.white,
      gray: colors.gray,
      teal: colors.teal,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
