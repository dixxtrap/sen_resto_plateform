import { createTheme } from "@mantine/core";

export const APP_THEME = createTheme({
    primaryColor:'red',

   primaryShade:{light:6, dark:7},
    colors:
    {
      secondary: [
        '#e6fcf5',
         '#c3fae8',
         '#96f2d7',
         '#63e6be',
         '#38d9a9',
         '#20c997',  // Base Custom Color
         '#12b886',
         '#0ca678',
         '#099268',
         '#087f5b',
      ],
      primary:[   '#fdf2f2',
        '#f9d4d4',
         '#f4a5a5',
         '#ef7070',
         '#ef3737',
         '#EF3C56',  // Base Custom Color
         '#d00e0e',
         '#a81919',
         '#8b1f1f',
         '#731f1f',]
    }
  });