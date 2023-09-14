import { RouteObject } from "react-router-dom";
import { PaymentTypeList } from "../pages/payment_type/payment_type_list";
import { PaymentTypeCreate } from "../pages/payment_type/payment_type_create";
import { PaymentTypeEdit } from "../pages/payment_type/payment_type_edit";
import { PaymentTypeDetails } from "../pages/payment_type/payment_type_details";

export const paymentTypeRouter: RouteObject = {
  path: "payment_type",
  children: [
    {
      path: "",
      index: true,
      element: <PaymentTypeList />,
    },
    {
      path: "create",
      element: <PaymentTypeCreate />,
    },
    {
      path: "edit/:id",
      element: <PaymentTypeEdit />,
    },
    {
      path: "details/:id",
      element: <PaymentTypeDetails />,
    },
  ],
};
