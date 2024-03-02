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
import { paymentRouter } from "./payment.router";
import { permissionRouter } from "./permission.router";
import { deliverRouter } from "./deliver.router";
import { DefinePassword } from "../pages/login/define_password";
import { cardRouter } from "./card.router";

export const router = createBrowserRouter([
  {
    path: "",
    index: true,
    element: <Login />,
  },
  {
    path: "define_password",
    element: <DefinePassword />,
  },
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
      paymentRouter,
      permissionRouter,
      deliverRouter,
      cardRouter
    ],
  },
]);
