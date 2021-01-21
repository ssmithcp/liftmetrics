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
        "50px" : "50px",
        "100px" : "100px",
        "150px" : "150px",
        "200px" : "200px",
        "250px" : "250px",
        "300px" : "300px",
        "350px" : "350px",
        "400px" : "400px",
        "450px" : "450px",
        "500px" : "500px",
        "550px" : "550px",
        "600px" : "600px",
        "650px" : "650px",
        "700px" : "700px",
        "750px" : "750px",
        "800px" : "800px",
        "850px" : "850px",
        "900px" : "900px",
        "950px" : "950px",
        "1000px" : "1000px",
        "1050px" : "1050px",
        "1100px" : "1100px",
        "1150px" : "1150px",
        "1200px" : "1200px",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
