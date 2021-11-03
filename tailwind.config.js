const colors = require("tailwindcss/colors");
const daisyui = require("daisyui");

module.exports = {
  mode: "jit",
  purge: ["./*.html", "./src/**/*.(ts|hbs)"],
  darkMode: "media",
  theme: {
    colors: {
      white: colors.white,
      gray: colors.gray,
      teal: colors.teal,
    },
    extend: {
      gridTemplateRows: {
        main: "auto 1fr auto",
      },
      margin: {
        "8-dynamic": "clamp(2rem, 5vw, 4rem)",
        "4-dynamic": "clamp(1rem, 4vw, 2rem)",
      },
      fontSize: {
        "4xl-dynamic": "clamp(1.5rem, 5vw, 2.75rem)",
        "5xl-dynamic": "clamp(2rem, 5vw, 3rem)",
      },
      lineHeight: {
        "12-dynamic": "clamp(2rem, 5vw, 3rem)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [daisyui],
};
