const daisyui = require("daisyui");
const forms = require("@tailwindcss/forms");

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {}
  },

  daisyui: {
    themes: [
      {
        illumirace: {
          ...require("daisyui/src/theming/themes")["synthwave"],
          primary: "#ff5161",
          secondary: "#51ff52",
        },
      },
    ],
  },

  plugins: [forms, daisyui]
};

module.exports = config;