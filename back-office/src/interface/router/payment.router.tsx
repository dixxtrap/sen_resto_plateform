import { RouteObject } from "react-router-dom";
import PaymentList from "../pages/payment/payment_list";
import { PaymentDetails } from "../pages/payment/payment_details";

export const paymentRouter: RouteObject = {
  path: "payment",
  children: [
    {
      path: "",
      index: true,
      element: <PaymentList />,
    },
    {
      path: "datails/:id",

      element: <PaymentDetails />,
    },
  ],
};
