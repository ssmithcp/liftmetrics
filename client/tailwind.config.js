const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Nunito"', 'sans-serif'],
      },
      colors: {
        primary: colors.blue['500'],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
