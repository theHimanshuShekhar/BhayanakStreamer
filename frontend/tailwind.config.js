const { guessProductionMode } = require("@ngneat/tailwind");

module.exports = {
    prefix: '',
    purge: {
      enabled: guessProductionMode(),
      content: [
        './src/**/*.{html,ts}',
      ]
    },
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          bhayanak: {
            '100': '#e4e4e7',
            '200': '#c9cbd1',
            '300': '#afb2bb',
            '400': '#969aa7',
            '500': '#7d8294',
            '600': '#646b82',
            '700': '#4a5573',
            '800': '#303f66',
            '900': '#1f2c49',
            '1000': '#12192a',
          },

        }
      }
    },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/aspect-ratio'),require('@tailwindcss/forms'),require('@tailwindcss/line-clamp'),require('@tailwindcss/typography')],
};