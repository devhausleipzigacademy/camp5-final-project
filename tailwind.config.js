const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    fontFamily: {
      Poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
    },
  },
    colors: {
      primary: "#464E64",
      "primary-variant": "#3A4053",
      secondary: "#9CFC97",
      "primary-text": "#F7F5F6",
      "secondary-text": "#3A4053",
      BG: "#F7F5F6",
      "BG-text": "#3A4053",
      error: "#EF3E36",
      "error-text": "#F7F5F6",
    },
    variants: {
    extend: {},
  },
  plugins: [],
}}
