const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.400', 'currentColor'),
    }),
    extend: {
      fontFamily: {
        'sans': ['"Nunito"', 'sans-serif'],
      },
      colors: {
        primary: colors.blue['600'],
        'soft-black': colors.gray['500'],
      },
      spacing: {
        "550px" : "550px",
        "750px" : "750px",
      },
      gridTemplateColumns: {
        "profile": "180px auto",
        "add-movement": "150px auto",
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['focus'],
    },
  },
  plugins: [],
}
