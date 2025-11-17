/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#E54256',
          secondary: '#F8D7DC',
        },
      },
    },
  },
  plugins: [],
}

