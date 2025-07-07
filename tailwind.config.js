const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', ...defaultTheme.fontFamily.sans],
        title: defaultTheme.fontFamily.sans
      },
      colors: {
        'brand-primary': 'var(--brand-primary)',
        'brand-secondary': 'var(--brand-secondary)'
      },
      container: {
        center: true,
        padding: '1rem'
      },
      // I'm not a huge fan of the backticks in inline-code
      // https://github.com/tailwindlabs/tailwindcss-typography/issues/18#issuecomment-733045571
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: 'none !important'
            },
            'code::after': {
              content: 'none !important'
            }
          }
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
