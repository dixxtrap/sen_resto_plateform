import { createTheme, virtualColor } from "@mantine/core";

export const APP_THEME = createTheme({
  primaryColor:'yellow',
    colors:
    {
      // primary:   virtualColor({
      //   name: 'primary',
      //   dark: 'blue',
      //   light: 'blue',
        
      // }),
      secondary: [
        '#fef3c7',
         '#fde68a',
         '#fcd34d',
         '#fbbf24',
         '#f59e0b',
         '#d97706',  // Base Custom Color
         '#b45309',
         '#92400e',
         '#78350f',
         '#451a03',
      ],
       primary:[   
        '#fef9c3',
        '#fef08a',
         '#fde047',
         '#facc15',
         '#eab308',
         '#ca8a04',  // Base Custom Color
         '#a16207',
         '#854d0e',
         '#713f12',
         '#422006',]
      // teal
      // primary:[   
      //   '#d1fae5',
      //   '#99f6e4',
      //    '#5eead4',
      //    '#2dd4bf',
      //    '#14b8a6',
      //    '#0d9488',  // Base Custom Color
      //    '#0f766e',
      //    '#115e59',
      //    '#134e4a',
      //    '#042f2e',]
    }
  });