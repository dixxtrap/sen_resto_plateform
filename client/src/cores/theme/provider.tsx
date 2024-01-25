// store.js (ou store.ts)

import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './theme.slice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export default store;
