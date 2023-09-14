import { RouteObject } from "react-router-dom";
import { OrderList } from "../pages/order/order_list";
import { OrderDeatils } from "../pages/order/order_details";
import { OrderEdit } from "../pages/order/order_edit";

export const orderRouter: RouteObject = {
  path: "order",
  children: [
    {
      path: "",
      index: true,
      element: <OrderList />,
    },
    {
      path: "list",
     
      element: <OrderList />,
    },
    {
      path: "details/:id",
      element: <OrderDeatils />,
    },
    {
      path: "edit/:id",
      element: <OrderEdit />,
    },
  ],
};
