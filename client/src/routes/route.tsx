import { createBrowserRouter } from "react-router-dom";
import { BasePage } from "../interfaces/pages/base";
import Home from "../interfaces/pages/home/home";
import { PlateList } from "../interfaces/pages/product/product";
import { Restaurant } from "../interfaces/pages/restaurant_list";
import { orderRoute } from "./order.route";

export const router = createBrowserRouter([
  {
    path: "",
    element: <BasePage />,
    children: [
      {
        path: "",
        index: true,
        element: <Home />,
      },
      {
        path: "product",
        element: <PlateList />,
      },
      {
        path: "restaurant",
        element: <Restaurant />,
      },
      orderRoute
    ],
  },
]);
