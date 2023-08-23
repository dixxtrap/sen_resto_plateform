// store.js (ou store.ts)

import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme.slice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export default store;
