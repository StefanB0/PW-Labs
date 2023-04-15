/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#1d3557",
        "secondary": "#24416b", //"#1f385c",
        "tertiary": "#24416b",
        "accent-green": "#7bd389"
      }
    },
  },
  plugins: [],
}

