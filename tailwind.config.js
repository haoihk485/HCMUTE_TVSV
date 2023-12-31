/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        my_red : '#CF2F2C',
        dark_blue : '#332370'
      },
      fontFamily: {
        roboto: 'Roboto'
      }
    },
  },
  plugins: [],
}

