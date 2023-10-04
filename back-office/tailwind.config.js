/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        indigo: {
          '50': '#fff1f2',
          '100': '#ffe4e6',
          '200': '#fecdd3',
          '300': '#fda4af',
          '400': '#fb7185',
          '500': '#f43f5e',
          '600': '#e11d48',
          '700': '#be123c',
          '800': '#9f1239',
          '900': '#881337',
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

