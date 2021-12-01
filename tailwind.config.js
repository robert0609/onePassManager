module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '10px': '10px',
        'main': '85vh'
      },
      borderColor: {
        'primary': '#cccccc'
      },
      backgroundColor: {
        'main': '#e8e8e8',
        'content': 'white'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
