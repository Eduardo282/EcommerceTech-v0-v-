/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    // ... otros plugins
  ],
};
