/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
    },
  },
  plugins: [],
};

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
