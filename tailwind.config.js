/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gas-oxford': '#0f172a',    // Le bleu profond de votre sidebar
        'gas-slate': '#1e293b',     // Le gris des cartes
        'gas-blue': '#2563eb',      // Le bleu d'accentuation
      },
      borderRadius: {
        'gas-sculpt': '2.5rem',     // L'arrondi de 40px pour l'effet "Luxe"
      },
    },
  },
  plugins: [],
}