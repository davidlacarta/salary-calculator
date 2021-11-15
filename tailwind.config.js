const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: {
    content: ["./*.{html,js}", "./src/**/*.{html,js}"],
  },
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
        embed: "1fr auto",
      },
      gridTemplateColumns: {
        main: "auto 1fr",
      },
      padding: {
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
      screens: {
        "h-sm": { raw: "(min-height: 700px),(min-width:640px)" },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    logs: false,
  },
};
