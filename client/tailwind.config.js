/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js, ts,tsx}"],
  darkMode:"class",
  theme: {
    extend: {
      colors: {
        kdark:{
          divider:"#414953",
          text:"#cccbca",
          TitleText:"#f0efee",
          // kdarkbg:"#1c2128",#23272f
          kdarkbg:"#23272f"
        },
     
        primary: {
          '50': '#fdf2f2',
          '100': '#f9d4d4',
          '200': '#f4a5a5',
          '300': '#ef7070',
          '400': '#ef3737',
          '500': '#EF3C56',  // Base Custom Color
          '600': '#d00e0e',
          '700': '#a81919',
          '800': '#8b1f1f',
          '900': '#731f1f',
        },
        secondary: {
          '50': '#edf9f2',
          '100': '#c8ebd1',
          '200': '#9bdcb0',
          '300': '#67c78d',
          '400': '#3aa76f',
          '500': '#29C16E',  // Base Custom Color
          '600': '#1f985a',
          '700': '#177d49',
          '800': '#116539',
          '900': '#0d5130',
        },
      },
    
 
    },
  },
  plugins: [],
}

