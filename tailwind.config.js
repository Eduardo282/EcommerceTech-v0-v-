/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
      },
      colors: {
        "gold-primario": "var(--gold-primario)",
        "negro-primario": "var(--negro-primario)",
        "beige-primario": "var(--beige-primario)",
        "negro-secundario": "var(--negro-secundario)",
        "gris-primario": "var(--gris-primario)",
        "cafe-primario": "var(--cafe-primario)",
        "gris-secundario": "var(--gris-secundario)",
        "beige-secundario": "var(--beige-secundario)",
        "azul-primario": "var(--azul-primario)",
        "azul-secundario": "var(--azul-secundario)",
        "morado-primario": "var(--morado-primario)",
        "verde-primario": "var(--verde-primario)",
        "gold-secundario": "var(--gold-secundario)",
        "morado-secundario": "var(--morado-secundario)",
        "azul-terciario": "var(--azul-terciario)",
        "gold-terciario": "var(--gold-terciario)",
        "rosa-primario": "var(--rosa-primario)",
        "verde-secundario": "var(--verde-secundario)",
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
