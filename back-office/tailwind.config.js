/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        indigo: {
          '50': '#fff2f2',
          '100': '#ffd4d4',
          '200': '#fca5a5',
          '300': '#f47070',
          '400': '#fc3737',
          '500': '#FF0000',  // Couleur de base personnalisée
          '600': '#d00e0e',
          '700': '#a81919',
          '800': '#8b1f1f',
          '900': '#731f1f',
        },
        secondary: {
          '50': '#e6fffa',
          '100': '#b2f5ea',
          '200': '#81e6d9',
          '300': '#4fd1c5',
          '400': '#38b2ac',
          '500': '#319795',
          '600': '#2c7a7b',
          '700': '#285e61',
          '800': '#234e52',
          '900': '#1d4044',
        },
      },
    },
  },
  plugins: [
    // import('@tailwindcss/forms'),
  ],
}

