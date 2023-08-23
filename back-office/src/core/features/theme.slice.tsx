import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  
  initialState: {
    currentTheme: localStorage.getItem('theme',)??"light",
  },
  reducers: {
    toggleTheme: (state) => {
        console.log("------------------togle theme------------------")
      state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem("theme", state.currentTheme);
    },
  },
});
export const { toggleTheme ,  } = themeSlice.actions;
export default themeSlice.reducer;
export const selectCurrentTheme = (state: { theme: { currentTheme: any; }; }) => state.theme.currentTheme;
