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
        'soft-black': colors.gray['500'],
      },
      spacing: {
        "550px" : "550px",
        "750px" : "750px",
      }
    },
  },
  variants: {
    extend: {
      borderWidth: ['focus'],
    },
  },
  plugins: [],
}
