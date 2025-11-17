/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Cinzel", "ui-serif", "Georgia", "serif"],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
      },
      dropShadow: {
        gold: "0 0 12px rgba(234, 179, 8, 0.45)",
      },
      boxShadow: {
        "gold-glow": "0 0 30px rgba(234,179,8,0.25)",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    // ... otros plugins
  ],
};
