/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'xs': '175px',
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [require('daisyui'),],
  daisyui: {
    themes: ["light"]
  }
}