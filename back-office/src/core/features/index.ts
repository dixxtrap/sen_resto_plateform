import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./auth.slice";
import themeReducer from "../features/theme.slice";
import { restaurantApi } from "./restaurant.slice";
import { companyApi } from "./company.slice";
import { roleApi } from "./role.slice";
import { productApi } from "./product.slice";
import { companyAgentApi } from "./company_agent.slice";
import { tagApi } from "./tag.slice";
import { restaurantUserApi } from "./restaurant_user.slice";
import { securityApi } from "./security.slice";
import { customerApi } from "./customer.slice";
import { paymentTypeApi } from "./payment_type.slice";
import { permissionApi } from "./permission.slice";
import { moduleApi } from "./module.slice";
import { categoryApi } from "./category.slice";
import { coorporateApi } from "./coorporate.slice";
import { cardApi } from "./card.slice";
import { cardAllocationApi } from "./card_allocation.slice";
import { bannerApi } from "./banner.slice";
const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [restaurantApi.reducerPath]: restaurantApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [securityApi.reducerPath]: securityApi.reducer,
    [companyAgentApi.reducerPath]: companyAgentApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [paymentTypeApi.reducerPath]: paymentTypeApi.reducer,
    [restaurantUserApi.reducerPath]: restaurantUserApi.reducer,
    [permissionApi.reducerPath ]: permissionApi.reducer,
    [moduleApi.reducerPath ]: moduleApi.reducer,
    [categoryApi.reducerPath ]: categoryApi.reducer,
    [coorporateApi.reducerPath ]: coorporateApi.reducer,
    [cardApi.reducerPath]:cardApi.reducer,
    [cardAllocationApi.reducerPath]:cardAllocationApi.reducer,
    [bannerApi.reducerPath]:bannerApi.reducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      restaurantApi.middleware,
      companyApi.middleware,
      coorporateApi.middleware,
      roleApi.middleware,
      securityApi.middleware,
      productApi.middleware,
      paymentTypeApi.middleware,
customerApi.middleware,
      companyAgentApi.middleware,
      tagApi.middleware,
      restaurantUserApi.middleware,
      permissionApi.middleware, 
      moduleApi.middleware, 
      categoryApi.middleware, 
      cardApi.middleware,
      cardAllocationApi.middleware,
      bannerApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
