/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: ["./src/**/*.{html,js,tsx,ts}"],
darkMode:"class",
  theme: {
  
    extend: {
  
      colors: {
        kdark:{
          input:"rgb(23, 27, 34)",
          background:"rgb(13, 17, 23)",
          dropdown:"rgb(18, 22, 29)",
          divider:"#414953",
          text:"#cccbca",
          TitleText:"#f0efee",
          // kdarkbg:"#1c2128",#23272f
          // kdarkbg:"#23272f"
          kdarkbg:"#0d1117"
          
        },
     
        primary:colors.green,
        secondary: colors.red,
      },
    
    },
  },
  plugins: [
    // import('@tailwindcss/forms'),
  ],
}

