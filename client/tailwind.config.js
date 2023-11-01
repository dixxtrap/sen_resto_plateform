/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js, ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kprimary: {
          '50': '#fdf2f3',
          '100': '#fac8cb',
          '200': '#f8a3ad',
          '300': '#f5778b',
          '400': '#f14e6c',
          '500': '#e11d48', // Couleur de base personnalisée
          '600': '#c81a41',
          '700': '#a11539',
          '800': '#841030',
          '900': '#6a0d28',
        },
        ksecondaire:"#EA6D27"
      }
    },
  },
  plugins: [],
}

