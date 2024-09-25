import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login/login";
import Public from "../pages/public/public";
import { organisationRouter } from "./organisation.router";
import { userRouter } from "./user.router";
import { customerRouter } from "./costumer.router";
import { restaurantRouter } from "./restaurant.router";
import { plateRouter } from "./plateRouter";
import { securityRouter } from "./secutrity.router";
import { paymentTypeRouter } from "./payment_type.router";
import { orderRouter } from "./order.router";
import { GoogleMapComponent } from "../pages/dashboard/dashboard";
import { paymentRouter } from "./transaction.router";
import { permissionRouter } from "./permission.router";
import { deliverRouter } from "./deliver.router";
import { DefinePassword } from "../pages/login/define_password";
import { cardRouter } from "./card.router";
import { ForgetPassword } from "../pages/login/forget_password";
import { SuccessRequete } from "../pages/login/success";
import { coorporateRouter } from "./coorporate";
import { giftRouter } from "./gift.router";
import { cardAllocationRouter } from "./card_allocation.router";
import { bannerRouter } from "./banner.router";
import { storeRouter } from "./story.router";
import { cityRouter } from "./city.router";
import { establishmentTypeRouter } from "./establishment_type.router";

export const router = createBrowserRouter([
  {
    path: "",
    index: true,
    element: <Login />,
  },
  {
    path: "define-password",
    element: <DefinePassword />,
  },
  {
    path: "forget-password",
    element: <ForgetPassword />,
  },
  {path:'succeeded', element:<SuccessRequete/>},
  {
    path: "",
    element: <Public />,
    children: [
      {
        path: "dashboard",
        element: <div><GoogleMapComponent/></div>,
      },
      organisationRouter,
      userRouter,
      customerRouter,
      restaurantRouter,
      plateRouter,
      securityRouter,
      paymentTypeRouter,
      orderRouter,
      coorporateRouter,
      giftRouter,
      paymentRouter,
      permissionRouter,
      deliverRouter,
      cardRouter,
      cardAllocationRouter,
      bannerRouter,
      storeRouter,
      cityRouter,
      establishmentTypeRouter
    ],
  },
]);
