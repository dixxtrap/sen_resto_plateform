import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./auth.slice";
import themeReducer from "../features/theme.slice";
import { restaurantApi } from "./restaurant.slice";
import { companyApi } from "./company.slice";
import { roleApi } from "./role.slice";
import { plateApi } from "./plate.slice";
import { companyAgentApi } from "./company_agent.slice";
import { tagApi } from "./tag.slice";
import { restaurantUserApi } from "./restaurant_user.slice";
const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [restaurantApi.reducerPath]: restaurantApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [plateApi.reducerPath]: plateApi.reducer,
    [companyAgentApi.reducerPath]: companyAgentApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
    [restaurantUserApi.reducerPath]: restaurantUserApi.reducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      restaurantApi.middleware,
      companyApi.middleware,
      roleApi.middleware,
      plateApi.middleware,
      companyAgentApi.middleware,
      tagApi.middleware,
      restaurantUserApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
