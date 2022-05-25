module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./utilities/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
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
    extend: {},
  },
  plugins: [],
};
