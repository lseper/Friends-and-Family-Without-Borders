module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
                coolGreen: {
                  DEFAULT: '#BDE4A7'
                },
                coolBlue: {
                  DEFAULT: '#98D2EB'
                },
                coolGrey: {
                  DEFAULT: '#A4969B',
                  dark: '#454851'
                },
                brightPink: {
                  DEFAULT: '#CD8B76'
                }
              }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
