/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
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
     
        primary: colors.red,
        secondary: colors.green
      },
    
 
    }},
  plugins: [],
}

