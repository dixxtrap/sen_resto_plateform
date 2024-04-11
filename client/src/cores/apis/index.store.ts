import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api";
import { securityApi } from "./security.slice";
import themeReducer from "../theme/theme.slice"
import { productApi } from "./product.slice";
const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
   [securityApi.reducerPath]:securityApi.reducer,
   theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      securityApi.middleware,
      productApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default  store;
