import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.tsx'],
  darkMode: 'class',
  theme: {
    screens: {
      mobile: '375px',
      tablet: '768px',
      desktop: '1440px',
      monitor: '1800px',
    },
    extend: {
      boxShadow: {
        navbar: '1px 5px 15px 0px rgba(0, 0, 0, 0.15)',
      },
      width: {
        input: '480px',
        select: '224px',
        flag: '555px',
        country: '90%',
      },
      height: {
        image: '170px',
        flag: '400px',
      },
      colors: {
        darkBlue: 'hsl(209, 23%, 22%)',
        veryDarkBlueBackground: 'hsl(207, 26%, 17%)',
        veryDarkBlueText: 'hsl(200, 15%, 8%)',
        darkGray: 'hsl(0, 0%, 52%)',
        veryLightGray: 'hsl(0, 0%, 98%)',
        white: 'hsl(0, 0%, 100%)',
      },
    },
  },
  plugins: [],
}
export default config
