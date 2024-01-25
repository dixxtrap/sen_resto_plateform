import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { securityApi } from "./security.slice";
import themeReducer from "../theme/theme.slice"
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
   [securityApi.reducerPath]:securityApi.reducer,
   theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware,
      securityApi.middleware,
    
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default  store;
