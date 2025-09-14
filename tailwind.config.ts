// tailwind.config.js
module.exports = {
  // ...
  theme: {
    extend: {
      fontFamily: {
        // Create a utility class, e.g., 'font-playfair'
        inter: ['var(--font-inter)'],
        playfair: ['var(--font-playfair)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  // ...
};