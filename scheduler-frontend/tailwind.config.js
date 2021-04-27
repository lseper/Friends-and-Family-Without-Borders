module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
                coolGreen: {
                  DEFAULT: '#8FD468',
                  dark: '#6A9C4E'
                },
                coolBlue: {
                  DEFAULT: '#98D2EB',
                  dark: '#5DADE2'
                },
                coolGrey: {
                  DEFAULT: '#A4969B',
                  dark: '#454851'
                },
                brightPink: {
                  DEFAULT: '#CD8B76',
                  dark: '#CB4335'
                }
              }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
