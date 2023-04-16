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
        "secondary": "#24416b",
        "tertiary": "#8da7be",
        "accent-green": "#7bd389"
      },
      lineHeight: {
        12: "3rem",
      }
    },
  },
  plugins: [],
}

