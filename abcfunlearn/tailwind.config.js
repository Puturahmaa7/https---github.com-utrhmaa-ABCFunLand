/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(0, 0%, 90%)", // contoh
        ring: "hsl(220, 80%, 56%)", // contoh
        background: "hsl(0,0%,100%)",
        foreground: "hsl(0,0%,0%)",
      },
      borderRadius: {
        lg: "0.5rem",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      addUtilities({
        ".border-border": { borderColor: theme("colors.border") },
        ".outline-ring": {
          outlineColor: theme("colors.ring"),
          outlineStyle: "solid",
          outlineWidth: "1px",
        },
      });
    }),
    require("tailwindcss-animate"), // jika pakai animate
  ],
};
