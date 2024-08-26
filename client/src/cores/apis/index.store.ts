import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api";
import { securityApi } from "./security.slice";
import themeReducer from "../theme/theme.slice"
import { productApi } from "./product.slice";
import { orderApi } from "./order.slice";
const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
   [securityApi.reducerPath]:securityApi.reducer,
   [orderApi.reducerPath]:orderApi.reducer,
   theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      securityApi.middleware,
      productApi.middleware,
      orderApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default  store;
