const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  purge: ["./src/**/*.js"],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      boxShadow: {},
    },
  },
  variants: {
    textColor: ["responsive", "hover", "focus", "group-hover"],
    scale: ["responsive", "hover", "focus", "group-hover"],
  },
}
