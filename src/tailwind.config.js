/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html", "./scripts/*.{js}"],
  theme: {
    extend: {
      fontFamily: {
        'open-sans': ['"Open Sans"', '"sans serif"'],
        'roboto-slab': ['"Roboto Slab"', '"sans serif"'],
        'press-start': ['"Press Start 2P"', 'cursive'],
        'space-grotesk': ['"Space Grotesk"', '"sans serif"'],
        'silkscreen': ['Silkscreen']
      },
    },
  },
  plugins: [],
}